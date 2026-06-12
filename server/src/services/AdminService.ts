import { prisma } from '../lib/prisma.js'
import { matchEngineService } from './MatchEngineService.js'
import { compatibilityScorer } from './CompatibilityScorer.js'
import { userRepository } from '../repositories/user.repository.js'

export class AdminService {
  getOverview() {
    return userRepository.getStats()
  }

  getUsers(filters?: { status?: string; search?: string }) {
    return userRepository.findAll(
      filters?.status ? { status: filters.status as never, search: filters.search } : { search: filters?.search },
    )
  }

  async getWaitingPool() {
    const users = await userRepository.findWaitingPool()
    return Promise.all(
      users.map(async (user) => {
        const candidates = await matchEngineService.findBestCandidate(user.id)
        const waitingMs = Date.now() - new Date(user.waitingSince).getTime()
        return {
          ...user,
          waitingDurationHours: Math.round(waitingMs / (1000 * 60 * 60)),
          topCandidate: candidates,
          lastScanAt: user.lastScanAt,
          priorityScore: user.priorityScore,
        }
      }),
    )
  }

  async getMatchHistory() {
    return prisma.match.findMany({
      include: { userA: true, userB: true, soulmateSession: true },
      orderBy: { createdAt: 'desc' },
    })
  }

  getReports() {
    return prisma.report.findMany({
      include: { reporter: true, reported: true },
      orderBy: { createdAt: 'desc' },
    })
  }

  async resolveReport(id: string, action: 'WARN' | 'SUSPEND' | 'BAN' | 'DISMISS') {
    const report = await prisma.report.findUnique({ where: { id } })
    if (!report) throw new Error('Report not found')

    const statusMap = {
      WARN: 'WARNED',
      SUSPEND: 'SUSPENDED',
      BAN: 'BANNED',
      DISMISS: 'DISMISSED',
    } as const

    if (action === 'BAN') {
      await userRepository.ban(report.reportedId, report.reason)
    }

    return prisma.report.update({
      where: { id },
      data: { status: statusMap[action], resolvedAt: new Date() },
    })
  }

  getLogs(limit = 100) {
    return prisma.systemLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { user: { select: { name: true } } },
    })
  }

  async getAnalytics() {
    const [users, matches, interests] = await Promise.all([
      prisma.user.findMany({ select: { university: true, gender: true, createdAt: true, personalityType: true } }),
      prisma.match.findMany({ select: { compatibilityScore: true, createdAt: true, status: true } }),
      prisma.interest.groupBy({ by: ['label'], _count: { label: true }, orderBy: { _count: { label: 'desc' } }, take: 10 }),
    ])

    const universityMap = new Map<string, number>()
    for (const u of users) {
      universityMap.set(u.university, (universityMap.get(u.university) ?? 0) + 1)
    }

    const genderRatio = {
      male: users.filter((u) => u.gender === 'MALE').length,
      female: users.filter((u) => u.gender === 'FEMALE').length,
      other: users.filter((u) => !['MALE', 'FEMALE'].includes(u.gender)).length,
    }

    const dailyRegistrations = users.reduce<Record<string, number>>((acc, u) => {
      const day = u.createdAt.toISOString().slice(0, 10)
      acc[day] = (acc[day] ?? 0) + 1
      return acc
    }, {})

    return {
      usersPerUniversity: Object.fromEntries(universityMap),
      genderRatio,
      topInterests: interests.map((i) => ({ label: i.label, count: i._count.label })),
      averageCompatibilityScore: matches.length
        ? Math.round(matches.reduce((s, m) => s + m.compatibilityScore, 0) / matches.length)
        : 0,
      dailyRegistrations,
      matchSuccessRate: matches.length
        ? Math.round(
            (matches.filter((m) => ['PLAN_GENERATED', 'REVEALED'].includes(m.status)).length /
              matches.length) *
              100,
          )
        : 0,
      totalMatches: matches.length,
    }
  }

  async forceMatch(userAId: string, userBId: string) {
    const [a, b] = await Promise.all([
      userRepository.findById(userAId),
      userRepository.findById(userBId),
    ])
    if (!a || !b) throw new Error('User not found')

    await prisma.user.updateMany({
      where: { id: { in: [userAId, userBId] } },
      data: { status: 'WAITING_FOR_MATCH' },
    })

    return matchEngineService.runForUser(userAId)
  }

  async previewCandidates(userId: string) {
    const user = await userRepository.findById(userId)
    if (!user) return []

    const pool = await userRepository.findWaitingPool(userId)
    const excluded = await userRepository.getExcludedUserIds(userId)

    return pool
      .filter((c) => !excluded.has(c.id))
      .map((c) => {
        const breakdown = compatibilityScorer.score(user, c)
        return {
          userId: c.id,
          name: c.name,
          university: c.university,
          score: breakdown?.total ?? 0,
        }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  }
}

export const adminService = new AdminService()
