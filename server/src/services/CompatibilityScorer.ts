import { sameUniversity } from '../data/malaysiaUniversities.js'
import type { UserWithRelations } from '../repositories/user.repository.js'
import { MATCH_WEIGHTS, type CompatibilityBreakdown } from '../types/matching.js'

function normalize(value: number): number {
  return Math.round(Math.max(0, Math.min(100, value)))
}

function stringSimilarity(a: string, b: string): number {
  const la = a.toLowerCase().trim()
  const lb = b.toLowerCase().trim()
  if (la === lb) return 100
  if (la.includes(lb) || lb.includes(la)) return 85
  const wordsA = new Set(la.split(/\s+/))
  const wordsB = new Set(lb.split(/\s+/))
  const intersection = [...wordsA].filter((w) => wordsB.has(w)).length
  const union = new Set([...wordsA, ...wordsB]).size
  return union === 0 ? 0 : normalize((intersection / union) * 100)
}

function arrayOverlapScore(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 40
  const setB = new Set(b.map((s) => s.toLowerCase()))
  const matches = a.filter((item) => setB.has(item.toLowerCase())).length
  const maxLen = Math.max(a.length, b.length)
  return normalize(40 + (matches / maxLen) * 60)
}

function availabilityOverlap(
  a: { day: string; timeSlot: string }[],
  b: { day: string; timeSlot: string }[],
): number {
  if (a.length === 0 || b.length === 0) return 50
  const slotsA = new Set(a.map((s) => `${s.day}:${s.timeSlot}`.toLowerCase()))
  let overlap = 0
  for (const slot of b) {
    if (slotsA.has(`${slot.day}:${slot.timeSlot}`.toLowerCase())) overlap++
  }
  const dayOverlap = new Set(a.map((s) => s.day.toLowerCase())).size > 0
    ? [...new Set(a.map((s) => s.day.toLowerCase()))].filter((d) =>
        b.some((s) => s.day.toLowerCase() === d),
      ).length
    : 0
  const slotScore = (overlap / Math.max(a.length, b.length)) * 70
  const dayScore = (dayOverlap / Math.max(new Set(a.map((s) => s.day)).size, 1)) * 30
  return normalize(slotScore + dayScore)
}

function budgetScore(a: string, b: string): number {
  const extract = (s: string) => {
    const nums = s.match(/\d+/g)?.map(Number) ?? []
    if (nums.length >= 2) return (nums[0] + nums[1]) / 2
    if (nums.length === 1) return nums[0]
    return 35
  }
  const avgA = extract(a)
  const avgB = extract(b)
  const diff = Math.abs(avgA - avgB)
  return normalize(100 - diff * 1.5)
}

function genderCompatible(
  a: UserWithRelations,
  b: UserWithRelations,
): boolean {
  return (
    a.interestedGender.includes(b.gender) && b.interestedGender.includes(a.gender)
  )
}

export class CompatibilityScorer {
  score(userA: UserWithRelations, userB: UserWithRelations): CompatibilityBreakdown | null {
    if (!genderCompatible(userA, userB)) return null
    if (!sameUniversity(userA.university, userB.university)) return null

    const hobbiesA = userA.interests.map((i) => i.label)
    const hobbiesB = userB.interests.map((i) => i.label)

    const breakdown: Omit<CompatibilityBreakdown, 'total'> = {
      university: stringSimilarity(userA.university, userB.university),
      faculty: stringSimilarity(userA.faculty, userB.faculty),
      course: stringSimilarity(userA.course, userB.course),
      sharedInterests: arrayOverlapScore(hobbiesA, hobbiesB),
      personality: stringSimilarity(userA.personalityType, userB.personalityType),
      lifestyle: normalize(
        (stringSimilarity(userA.socialBattery, userB.socialBattery) +
          stringSimilarity(userA.comfortLevel, userB.comfortLevel) +
          stringSimilarity(userA.preferredMeetingStyle, userB.preferredMeetingStyle)) /
          3,
      ),
      loveLanguage: stringSimilarity(userA.loveLanguage, userB.loveLanguage),
      availability: availabilityOverlap(userA.availability, userB.availability),
      datingGoals: stringSimilarity(userA.datingGoal, userB.datingGoal),
      budget: budgetScore(userA.budgetPreference, userB.budgetPreference),
    }

    const total = normalize(
      breakdown.university * MATCH_WEIGHTS.university +
        breakdown.faculty * MATCH_WEIGHTS.faculty +
        breakdown.course * MATCH_WEIGHTS.course +
        breakdown.sharedInterests * MATCH_WEIGHTS.sharedInterests +
        breakdown.personality * MATCH_WEIGHTS.personality +
        breakdown.lifestyle * MATCH_WEIGHTS.lifestyle +
        breakdown.loveLanguage * MATCH_WEIGHTS.loveLanguage +
        breakdown.availability * MATCH_WEIGHTS.availability +
        breakdown.datingGoals * MATCH_WEIGHTS.datingGoals +
        breakdown.budget * MATCH_WEIGHTS.budget,
    )

    return { ...breakdown, total }
  }
}

export const compatibilityScorer = new CompatibilityScorer()
