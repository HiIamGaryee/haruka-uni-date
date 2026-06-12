export const MATCH_WEIGHTS = {
  university: 0.1,
  faculty: 0.05,
  course: 0.05,
  sharedInterests: 0.2,
  personality: 0.15,
  lifestyle: 0.1,
  loveLanguage: 0.1,
  availability: 0.1,
  datingGoals: 0.1,
  budget: 0.05,
} as const

export const MIN_MATCH_SCORE = 90

export type CompatibilityBreakdown = {
  university: number
  faculty: number
  course: number
  sharedInterests: number
  personality: number
  lifestyle: number
  loveLanguage: number
  availability: number
  datingGoals: number
  budget: number
  total: number
}

export type MatchCandidate = {
  userId: string
  name: string
  compatibilityScore: number
  breakdown: CompatibilityBreakdown
}
