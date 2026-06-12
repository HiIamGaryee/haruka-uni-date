import { matchRepository } from '../repositories/match.repository.js'
import { userRepository } from '../repositories/user.repository.js'
import { prisma } from '../lib/prisma.js'
import { aiReasonGenerator } from './AiReasonGenerator.js'
import { compatibilityScorer } from './CompatibilityScorer.js'
import { conversationStarterService } from './ConversationStarterService.js'
import { datePlanGenerator } from './DatePlanGenerator.js'
import { MIN_MATCH_SCORE, type MatchCandidate } from '../types/matching.js'

export type MatchResult = {
  matched: boolean
  match?: Awaited<ReturnType<typeof matchRepository.createMatch>>
  candidate?: MatchCandidate
  message: string
}

export class MatchEngineService {
  async findBestCandidate(userId: string): Promise<MatchCandidate | null> {
    const user = await userRepository.findById(userId)
    if (!user || user.status !== 'WAITING_FOR_MATCH' || !user.isActive || !user.profileComplete)
      return null

    const excluded = await userRepository.getExcludedUserIds(userId)
    const pool = await userRepository.findWaitingPool(userId, user.university)

    let best: MatchCandidate | null = null

    for (const candidate of pool) {
      if (excluded.has(candidate.id)) continue
      if (candidate.university !== user.university) continue

      const breakdown = compatibilityScorer.score(user, candidate)
      if (!breakdown || breakdown.total < MIN_MATCH_SCORE) continue

      if (!best || breakdown.total > best.compatibilityScore) {
        best = {
          userId: candidate.id,
          name: candidate.name,
          compatibilityScore: breakdown.total,
          breakdown,
        }
      }
    }

    await userRepository.updateLastScan(userId)
    return best
  }

  async runForUser(userId: string): Promise<MatchResult> {
    const user = await userRepository.findById(userId)
    if (!user) return { matched: false, message: 'User not found' }
    if (!user.profileComplete) {
      return { matched: false, message: 'Profile not complete' }
    }
    if (user.status === 'BANNED' || user.status === 'PAUSED') {
      return { matched: false, message: `User status is ${user.status}` }
    }

    const existing = await matchRepository.findByUserId(userId)
    if (existing) {
      return {
        matched: true,
        match: existing,
        message: 'Existing match found',
      }
    }

    if (user.status !== 'WAITING_FOR_MATCH' && user.status !== 'MATCHING') {
      return { matched: false, message: `User status is ${user.status}` }
    }

    await userRepository.updateStatus(userId, 'MATCHING')

    const best = await this.findBestCandidate(userId)
    if (!best) {
      await userRepository.updateStatus(userId, 'WAITING_FOR_MATCH')
      return {
        matched: false,
        message: 'No strong match yet. Your profile is safely stored in the waiting pool.',
      }
    }

    const partner = await userRepository.findById(best.userId)
    if (!partner) {
      await userRepository.updateStatus(userId, 'WAITING_FOR_MATCH')
      return { matched: false, message: 'Candidate no longer available' }
    }

    const breakdown = compatibilityScorer.score(user, partner)!
    const aiReason = aiReasonGenerator.generate(user, partner, breakdown)
    const datePlan = datePlanGenerator.generate(user, partner)
    const starters = conversationStarterService.generate(user, partner)

    const match = await matchRepository.createMatch({
      userAId: user.id,
      userBId: partner.id,
      compatibilityScore: best.compatibilityScore,
      aiReason,
      datePlan: {
        templateId: datePlan.templateId,
        title: datePlan.title,
        location: datePlan.location,
        time: datePlan.time,
        budget: datePlan.budget,
        vibe: datePlan.vibe,
        timeline: datePlan.timeline,
      },
      conversationStarters: starters,
    })

    await prisma.systemLog.create({
      data: {
        type: 'MATCH',
        message: `Match created: ${user.name} + ${partner.name} (${best.compatibilityScore}%)`,
        metadata: { matchId: match.id, score: best.compatibilityScore },
        userId: user.id,
      },
    })

    await Promise.all([
      prisma.notification.create({
        data: {
          userId: user.id,
          title: 'Soulmate Found!',
          message: `You matched with ${partner.name} at ${best.compatibilityScore}% compatibility.`,
        },
      }),
      prisma.notification.create({
        data: {
          userId: partner.id,
          title: 'Soulmate Found!',
          message: `You matched with ${user.name} at ${best.compatibilityScore}% compatibility.`,
        },
      }),
    ])

    return {
      matched: true,
      match,
      candidate: best,
      message: `Matched ${user.name} with ${partner.name} at ${best.compatibilityScore}%`,
    }
  }

  async runForAllWaiting(): Promise<MatchResult[]> {
    const waiting = await userRepository.findWaitingPool()
    const results: MatchResult[] = []

    for (const user of waiting) {
      const fresh = await userRepository.findById(user.id)
      if (!fresh || fresh.status !== 'WAITING_FOR_MATCH') continue
      const result = await this.runForUser(user.id)
      if (result.matched) results.push(result)
    }

    return results
  }
}

export const matchEngineService = new MatchEngineService()
