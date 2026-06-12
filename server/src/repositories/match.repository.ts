import type { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma.js'

export class MatchRepository {
  async createMatch(data: {
    userAId: string
    userBId: string
    compatibilityScore: number
    aiReason: string
    datePlan: {
      templateId?: string
      title: string
      location: string
      time: string
      budget: string
      vibe: string
      timeline: Prisma.InputJsonValue
    }
    conversationStarters: { text: string; category: string }[]
  }) {
    const [orderedA, orderedB] =
      data.userAId < data.userBId
        ? [data.userAId, data.userBId]
        : [data.userBId, data.userAId]

    return prisma.$transaction(async (tx) => {
      const match = await tx.match.create({
        data: {
          userAId: orderedA,
          userBId: orderedB,
          compatibilityScore: data.compatibilityScore,
          aiReason: data.aiReason,
          status: 'PENDING_PLAN',
          datePlan: {
            create: {
              templateId: data.datePlan.templateId,
              title: data.datePlan.title,
              location: data.datePlan.location,
              time: data.datePlan.time,
              budget: data.datePlan.budget,
              vibe: data.datePlan.vibe,
              timeline: data.datePlan.timeline,
            },
          },
          conversationStarters: {
            create: data.conversationStarters,
          },
          soulmateSession: {
            create: {
              userAId: orderedA,
              userBId: orderedB,
              compatibilityScore: data.compatibilityScore,
              aiReason: data.aiReason,
            },
          },
        },
        include: {
          userA: { include: { interests: true } },
          userB: { include: { interests: true } },
          datePlan: true,
          conversationStarters: true,
          soulmateSession: true,
        },
      })

      const finalized = await tx.match.update({
        where: { id: match.id },
        data: { status: 'PLAN_GENERATED' },
        include: {
          userA: { include: { interests: true, availability: true } },
          userB: { include: { interests: true, availability: true } },
          datePlan: true,
          conversationStarters: true,
          soulmateSession: true,
        },
      })

      await tx.user.updateMany({
        where: { id: { in: [data.userAId, data.userBId] } },
        data: { status: 'MATCHED' },
      })

      return finalized
    })
  }

  async findAll() {
    return prisma.match.findMany({
      include: {
        userA: true,
        userB: true,
        soulmateSession: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findById(id: string) {
    return prisma.match.findUnique({
      where: { id },
      include: {
        userA: { include: { interests: true, availability: true } },
        userB: { include: { interests: true, availability: true } },
        datePlan: true,
        conversationStarters: true,
        soulmateSession: true,
      },
    })
  }

  async findByUserId(userId: string) {
    return prisma.match.findFirst({
      where: {
        OR: [{ userAId: userId }, { userBId: userId }],
        status: { in: ['PENDING_PLAN', 'PLAN_GENERATED', 'REVEALED'] },
      },
      include: {
        userA: { include: { interests: true, availability: true } },
        userB: { include: { interests: true, availability: true } },
        datePlan: true,
        conversationStarters: true,
        soulmateSession: true,
      },
    })
  }
}

export const matchRepository = new MatchRepository()
