import type { UserWithRelations } from '../repositories/user.repository.js'
import { matchRepository } from '../repositories/match.repository.js'
import { prisma } from '../lib/prisma.js'

export type ProfileSummary = {
  id: string
  name: string
  age: number
  university: string
  faculty: string
  course: string
  year: string
  personalityType: string
  datingGoal: string
  comfortLevel: string
  foodPreference: string
  budgetPreference: string
  socialBattery: string
  interests: string[]
}

function toSummary(user: UserWithRelations): ProfileSummary {
  return {
    id: user.id,
    name: user.name,
    age: user.age,
    university: user.university,
    faculty: user.faculty,
    course: user.course,
    year: user.year,
    personalityType: user.personalityType,
    datingGoal: user.datingGoal,
    comfortLevel: user.comfortLevel,
    foodPreference: user.foodPreference,
    budgetPreference: user.budgetPreference,
    socialBattery: user.socialBattery,
    interests: user.interests.map((i) => i.label),
  }
}

function sharedInterests(a: UserWithRelations, b: UserWithRelations): string[] {
  const setB = new Set(b.interests.map((i) => i.label.toLowerCase()))
  return a.interests.map((i) => i.label).filter((l) => setB.has(l.toLowerCase()))
}

const DEFAULT_SAFETY_NOTE =
  'First meetup should stay in a public campus or mall area. Share your location with a friend. You can share your date plan and meetup location on WhatsApp before you go.'

function safetyNote(self: UserWithRelations, partner: UserWithRelations): string {
  const levels = [self.comfortLevel, partner.comfortLevel]
  if (levels.some((l) => l.toLowerCase().includes('public'))) {
    return DEFAULT_SAFETY_NOTE
  }
  if (levels.some((l) => l.toLowerCase().includes('group'))) {
    return `${DEFAULT_SAFETY_NOTE} Consider a low-pressure group hangout nearby before a one-on-one date.`
  }
  return `${DEFAULT_SAFETY_NOTE} Choose a public venue with easy transport access.`
}

export class MatchResultService {
  async getResultForUser(userId: string, matchId: string) {
    const match = await matchRepository.findById(matchId)
    if (!match) throw Object.assign(new Error('Match not found'), { statusCode: 404 })

    const isParticipant = match.userAId === userId || match.userBId === userId
    if (!isParticipant) throw Object.assign(new Error('Forbidden'), { statusCode: 403 })

    if (!['PLAN_GENERATED', 'REVEALED'].includes(match.status)) {
      throw Object.assign(new Error('Match not ready for reveal'), { statusCode: 403 })
    }

    if (match.status === 'PLAN_GENERATED') {
      await prisma.match.update({
        where: { id: matchId },
        data: { status: 'REVEALED' },
      })
      match.status = 'REVEALED'
    }

    const self = match.userAId === userId ? match.userA : match.userB
    const partner = match.userAId === userId ? match.userB : match.userA
    const common = sharedInterests(self, partner)

    return {
      match: {
        id: match.id,
        compatibilityScore: match.compatibilityScore,
        aiReason: match.aiReason,
        status: match.status,
        sharedInterests: common,
        comfortLevel: partner.comfortLevel,
        safetyNote: safetyNote(self, partner),
      },
      self: toSummary(self),
      partner: toSummary(partner),
      datePlan: match.datePlan,
      conversationStarters: match.conversationStarters,
    }
  }
}

export const matchResultService = new MatchResultService()
