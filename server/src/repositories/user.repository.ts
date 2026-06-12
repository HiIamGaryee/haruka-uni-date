import type { Prisma, UserStatus } from '@prisma/client'
import { prisma } from '../lib/prisma.js'
import type { CreateProfileInput } from '../dto/user.dto.js'

const userWithRelations = {
  interests: true,
  availability: true,
} satisfies Prisma.UserInclude

export type UserWithRelations = Prisma.UserGetPayload<{ include: typeof userWithRelations }>

export class UserRepository {
  async create(data: CreateProfileInput): Promise<UserWithRelations> {
    return prisma.user.create({
      data: {
        name: data.name,
        age: data.age,
        gender: data.gender,
        interestedGender: data.interestedGender,
        university: data.university,
        faculty: data.faculty,
        course: data.course,
        year: data.year,
        personalityType: data.personalityType,
        datingGoal: data.datingGoal,
        comfortLevel: data.comfortLevel,
        relationshipPace: data.relationshipPace,
        loveLanguage: data.loveLanguage,
        musicTaste: data.musicTaste,
        foodPreference: data.foodPreference,
        budgetPreference: data.budgetPreference,
        cgpa: data.cgpa,
        languages: data.languages,
        outdoorPerson: data.outdoorPerson,
        allergies: data.allergies,
        socialBattery: data.socialBattery,
        preferredMeetingStyle: data.preferredMeetingStyle,
        dealBreakers: data.dealBreakers,
        redFlags: data.redFlags,
        greenFlags: data.greenFlags,
        location: data.location,
        profilePicture: data.profilePicture,
        status: 'WAITING_FOR_MATCH',
        waitingSince: new Date(),
        interests: { create: data.hobbies.map((label) => ({ label })) },
        availability: { create: data.availability },
      },
      include: userWithRelations,
    })
  }

  async findById(id: string): Promise<UserWithRelations | null> {
    return prisma.user.findUnique({ where: { id }, include: userWithRelations })
  }

  async findWaitingPool(
    excludeUserId?: string,
    university?: string,
  ): Promise<UserWithRelations[]> {
    return prisma.user.findMany({
      where: {
        status: 'WAITING_FOR_MATCH',
        profileComplete: true,
        isActive: true,
        bannedAt: null,
        ...(university ? { university } : {}),
        ...(excludeUserId ? { id: { not: excludeUserId } } : {}),
      },
      include: userWithRelations,
      orderBy: { waitingSince: 'asc' },
    })
  }

  async getExcludedUserIds(userId: string): Promise<Set<string>> {
    const [blocks, matches, bans] = await Promise.all([
      prisma.blockedUser.findMany({
        where: {
          OR: [{ blockerId: userId }, { blockedId: userId }],
        },
      }),
      prisma.match.findMany({
        where: {
          OR: [{ userAId: userId }, { userBId: userId }],
          status: { in: ['PENDING_PLAN', 'PLAN_GENERATED', 'REVEALED'] },
        },
      }),
      prisma.user.findMany({ where: { status: 'BANNED' }, select: { id: true } }),
    ])

    const excluded = new Set<string>([userId])
    for (const b of blocks) {
      excluded.add(b.blockerId)
      excluded.add(b.blockedId)
    }
    for (const m of matches) {
      excluded.add(m.userAId)
      excluded.add(m.userBId)
    }
    for (const u of bans) {
      excluded.add(u.id)
    }
    return excluded
  }

  async updateStatus(userId: string, status: UserStatus) {
    return prisma.user.update({ where: { id: userId }, data: { status } })
  }

  async updateLastScan(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { lastScanAt: new Date() },
    })
  }

  async findAll(filters?: { status?: UserStatus; search?: string }) {
    return prisma.user.findMany({
      where: {
        ...(filters?.status ? { status: filters.status } : {}),
        ...(filters?.search
          ? {
              OR: [
                { name: { contains: filters.search, mode: 'insensitive' } },
                { university: { contains: filters.search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      include: userWithRelations,
      orderBy: { createdAt: 'desc' },
    })
  }

  async ban(userId: string, reason: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { status: 'BANNED', bannedAt: new Date(), banReason: reason, isActive: false },
    })
  }

  async delete(userId: string) {
    return prisma.user.delete({ where: { id: userId } })
  }

  async getStats() {
    const [total, male, female, active, waiting, matched, banned, reportsPending, avgScore] =
      await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { gender: 'MALE' } }),
        prisma.user.count({ where: { gender: 'FEMALE' } }),
        prisma.user.count({ where: { isActive: true, status: { not: 'BANNED' } } }),
        prisma.user.count({ where: { status: 'WAITING_FOR_MATCH' } }),
        prisma.user.count({ where: { status: 'MATCHED' } }),
        prisma.user.count({ where: { status: 'BANNED' } }),
        prisma.report.count({ where: { status: 'PENDING' } }),
        prisma.match.aggregate({ _avg: { compatibilityScore: true } }),
      ])

    return {
      totalUsers: total,
      maleUsers: male,
      femaleUsers: female,
      activeUsers: active,
      waitingPool: waiting,
      matchedUsers: matched,
      averageMatchScore: Math.round(avgScore._avg.compatibilityScore ?? 0),
      bannedUsers: banned,
      reportsPending,
    }
  }
}

export const userRepository = new UserRepository()
