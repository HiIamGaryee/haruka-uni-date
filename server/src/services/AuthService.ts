import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma.js'
import { env } from '../config/env.js'
import type { SignupInput, LoginInput } from '../dto/auth.dto.js'
import type { CreateProfileInput } from '../dto/user.dto.js'
const userInclude = { interests: true, availability: true } as const

export class AuthService {
  private signToken(userId: string, role: string) {
    return jwt.sign({ sub: userId, role }, env.JWT_SECRET, { expiresIn: '7d' })
  }

  async signup(input: SignupInput) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } })
    if (existing) throw new Error('Email already registered')

    const passwordHash = await bcrypt.hash(input.password, 10)
    const user = await prisma.user.create({
      data: {
        email: input.email,
        passwordHash,
        name: input.name,
        profileComplete: false,
        age: 20,
        gender: 'OTHER',
        interestedGender: ['OTHER'],
        university: 'Pending',
        faculty: 'Pending',
        course: 'Pending',
        year: 'Year 1',
        personalityType: 'Pending',
        datingGoal: 'Pending',
        comfortLevel: 'Public places only',
        relationshipPace: 'Slow burn',
        loveLanguage: 'Quality Time',
        musicTaste: [],
        foodPreference: 'Pending',
        budgetPreference: 'RM25–RM45',
        socialBattery: 'Medium',
        preferredMeetingStyle: 'Public café',
        dealBreakers: [],
        redFlags: [],
        greenFlags: [],
        location: 'Pending',
        status: 'INCOMPLETE_PROFILE',
        role: 'USER',
      },
      include: userInclude,
    })

    await prisma.systemLog.create({
      data: { type: 'REGISTRATION', message: `Account created: ${user.email}`, userId: user.id },
    })

    return { user, token: this.signToken(user.id, user.role) }
  }

  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
      include: userInclude,
    })
    if (!user?.passwordHash) throw new Error('Invalid email or password')

    const valid = await bcrypt.compare(input.password, user.passwordHash)
    if (!valid) throw new Error('Invalid email or password')
    if (user.status === 'BANNED') throw new Error('Account banned')
    if (user.role === 'ADMIN') throw new Error('Use admin dashboard to sign in as admin')

    return { user, token: this.signToken(user.id, user.role) }
  }

  async getMe(userId: string) {
    return prisma.user.findUnique({ where: { id: userId }, include: userInclude })
  }

  async completeProfile(userId: string, data: CreateProfileInput) {
    const { hobbies, availability, ...rest } = data

    const user = await prisma.$transaction(async (tx) => {
      await tx.interest.deleteMany({ where: { userId } })
      await tx.availability.deleteMany({ where: { userId } })

      return tx.user.update({
        where: { id: userId },
        data: {
          ...rest,
          profileComplete: true,
          status: 'WAITING_FOR_MATCH',
          waitingSince: new Date(),
          interests: { create: hobbies.map((label) => ({ label })) },
          availability: { create: availability },
        },
        include: userInclude,
      })
    })

    await prisma.systemLog.create({
      data: { type: 'PROFILE_UPDATE', message: `Profile completed: ${user.name}`, userId },
    })

    return { user }
  }

  async updateProfile(userId: string, data: CreateProfileInput) {
    const { hobbies, availability, ...rest } = data

    const user = await prisma.$transaction(async (tx) => {
      await tx.interest.deleteMany({ where: { userId } })
      await tx.availability.deleteMany({ where: { userId } })

      return tx.user.update({
        where: { id: userId },
        data: {
          ...rest,
          profileComplete: true,
          status: 'WAITING_FOR_MATCH',
          waitingSince: new Date(),
          interests: { create: hobbies.map((label) => ({ label })) },
          availability: { create: availability },
        },
        include: userInclude,
      })
    })

    await prisma.systemLog.create({
      data: { type: 'PROFILE_UPDATE', message: `Profile updated: ${user.name}`, userId },
    })

    return user
  }
}

export const authService = new AuthService()
