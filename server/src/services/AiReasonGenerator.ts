import type { UserWithRelations } from '../repositories/user.repository.js'
import type { CompatibilityBreakdown } from '../types/matching.js'

export class AiReasonGenerator {
  generate(
    userA: UserWithRelations,
    userB: UserWithRelations,
    breakdown: CompatibilityBreakdown,
  ): string {
    const sharedHobbies = userA.interests
      .map((i) => i.label)
      .filter((h) => userB.interests.some((b) => b.label.toLowerCase() === h.toLowerCase()))

    const parts: string[] = []

    if (breakdown.datingGoals >= 80) {
      parts.push('aligned dating goals')
    }
    if (breakdown.personality >= 75) {
      parts.push('complementary personality types')
    }
    if (breakdown.lifestyle >= 75) {
      parts.push('similar social energy')
    }
    if (breakdown.loveLanguage >= 75) {
      parts.push('compatible love languages')
    }
    if (sharedHobbies.length > 0) {
      parts.push(`shared interests like ${sharedHobbies.slice(0, 3).join(', ')}`)
    }
    if (breakdown.availability >= 70) {
      parts.push('strong availability overlap')
    }

    const traits =
      parts.length > 0
        ? parts.slice(0, 4).join(', ')
        : 'compatible campus routines and emotional pace'

    return `Both users share ${traits}. Their personality types and interests show strong long-term compatibility with a ${breakdown.total}% match score.`
  }
}

export const aiReasonGenerator = new AiReasonGenerator()
