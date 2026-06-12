import type { CreateProfileInput } from '../dto/user.dto.js'
import { prisma } from '../lib/prisma.js'
import { userRepository } from '../repositories/user.repository.js'
import { matchEngineService } from './MatchEngineService.js'

export class ProfileService {
  async createProfile(data: CreateProfileInput) {
    const user = await userRepository.create(data)

    await prisma.systemLog.create({
      data: {
        type: 'REGISTRATION',
        message: `New user registered: ${user.name}`,
        userId: user.id,
        metadata: { university: user.university },
      },
    })

    const matchResult = await matchEngineService.runForUser(user.id)

    return { user, matchResult }
  }

  async updateProfile(userId: string, data: Partial<CreateProfileInput>) {
    const { hobbies, availability, ...rest } = data

    const user = await prisma.$transaction(async (tx) => {
      if (hobbies) {
        await tx.interest.deleteMany({ where: { userId } })
        await tx.interest.createMany({
          data: hobbies.map((label) => ({ userId, label })),
        })
      }
      if (availability) {
        await tx.availability.deleteMany({ where: { userId } })
        await tx.availability.createMany({
          data: availability.map((a) => ({ userId, ...a })),
        })
      }

      return tx.user.update({
        where: { id: userId },
        data: {
          ...rest,
          status: 'WAITING_FOR_MATCH',
          waitingSince: new Date(),
        },
        include: { interests: true, availability: true },
      })
    })

    await prisma.systemLog.create({
      data: {
        type: 'PROFILE_UPDATE',
        message: `Profile updated: ${user.name}`,
        userId: user.id,
      },
    })

    const matchResult = await matchEngineService.runForUser(userId)
    return { user, matchResult }
  }
}

export const profileService = new ProfileService()
