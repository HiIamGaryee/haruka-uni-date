import { sameUniversity } from '../data/malaysiaUniversities'
import type { Student } from '../data/students'
import type { DemoViewer } from '../data/demoViewers'

export const DEMO_MIN_MATCH_SCORE = 90

export type DemoScoreBreakdown = {
  university: number
  course: number
  sharedInterests: number
  personality: number
  datingGoals: number
  budget: number
  lifestyle: number
  total: number
}

export type DemoMatchCandidate = {
  student: Student
  breakdown: DemoScoreBreakdown
  sharedInterests: string[]
  eligible: boolean
  reason?: string
}

const WEIGHTS = {
  university: 0.2,
  course: 0.1,
  sharedInterests: 0.25,
  personality: 0.15,
  datingGoals: 0.1,
  budget: 0.1,
  lifestyle: 0.1,
} as const

function clamp(value: number): number {
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
  return union === 0 ? 0 : clamp((intersection / union) * 100)
}

function interestOverlap(a: string[], b: string[]): { score: number; shared: string[] } {
  if (a.length === 0 || b.length === 0) return { score: 40, shared: [] }
  const setB = new Set(b.map((s) => s.toLowerCase()))
  const shared = a.filter((item) => setB.has(item.toLowerCase()))
  const maxLen = Math.max(a.length, b.length)
  return { score: clamp(40 + (shared.length / maxLen) * 60), shared }
}

function budgetScore(a: string, b: string): number {
  const extract = (s: string) => {
    const nums = s.match(/\d+/g)?.map(Number) ?? []
    if (nums.length >= 2) return (nums[0] + nums[1]) / 2
    if (nums.length === 1) return nums[0]
    return 35
  }
  const diff = Math.abs(extract(a) - extract(b))
  return clamp(100 - diff * 1.5)
}

function genderCompatible(viewer: DemoViewer, student: Student): boolean {
  if (!viewer.gender || !student.gender) return true
  return viewer.gender !== student.gender
}

export function scoreDemoPair(viewer: DemoViewer, student: Student): DemoMatchCandidate | null {
  if (viewer.id === student.id) return null

  if (!sameUniversity(viewer.university, student.university)) {
    return {
      student,
      breakdown: {
        university: 0,
        course: 0,
        sharedInterests: 0,
        personality: 0,
        datingGoals: 0,
        budget: 0,
        lifestyle: 0,
        total: 0,
      },
      sharedInterests: [],
      eligible: false,
      reason: 'Different university — Haruka only matches same campus.',
    }
  }

  if (!genderCompatible(viewer, student)) {
    return {
      student,
      breakdown: {
        university: 100,
        course: 0,
        sharedInterests: 0,
        personality: 0,
        datingGoals: 0,
        budget: 0,
        lifestyle: 0,
        total: 0,
      },
      sharedInterests: [],
      eligible: false,
      reason: 'Preference mismatch for this demo persona.',
    }
  }

  const { score: sharedInterests, shared } = interestOverlap(viewer.interests, student.interests)
  const breakdown: DemoScoreBreakdown = {
    university: stringSimilarity(viewer.university, student.university),
    course: stringSimilarity(viewer.course, student.course),
    sharedInterests,
    personality: stringSimilarity(viewer.personalityType, student.personalityType),
    datingGoals: stringSimilarity(viewer.datingGoal, student.datingGoal),
    budget: budgetScore(viewer.budgetRange, student.budgetRange),
    lifestyle: clamp(
      (stringSimilarity(viewer.comfortLevel, student.comfortLevel) +
        stringSimilarity(viewer.availability, student.availability)) /
        2,
    ),
    total: 0,
  }

  breakdown.total = clamp(
    breakdown.university * WEIGHTS.university +
      breakdown.course * WEIGHTS.course +
      breakdown.sharedInterests * WEIGHTS.sharedInterests +
      breakdown.personality * WEIGHTS.personality +
      breakdown.datingGoals * WEIGHTS.datingGoals +
      breakdown.budget * WEIGHTS.budget +
      breakdown.lifestyle * WEIGHTS.lifestyle,
  )

  const eligible = breakdown.total >= DEMO_MIN_MATCH_SCORE

  return {
    student,
    breakdown,
    sharedInterests: shared,
    eligible,
    reason: eligible
      ? `Strong ${breakdown.total}% fit — same uni, aligned vibe.`
      : `Only ${breakdown.total}% — below the ${DEMO_MIN_MATCH_SCORE}% Haruka threshold.`,
  }
}

export function rankDemoCandidates(
  viewer: DemoViewer,
  pool: Student[],
): DemoMatchCandidate[] {
  return pool
    .map((student) => scoreDemoPair(viewer, student))
    .filter((row): row is DemoMatchCandidate => row !== null)
    .sort((a, b) => b.breakdown.total - a.breakdown.total)
}

export type DemoDatePlanPreview = {
  title: string
  location: string
  duration: string
  budget: string
  icebreaker: string
  vibe: string
}

export function pickDemoDatePlan(
  _viewer: DemoViewer,
  partner: Student,
  shared: string[],
): DemoDatePlanPreview {
  const cafeVibe = shared.some((s) => /café|cafe|coffee|matcha/i.test(s))
  const techVibe = shared.some((s) => /design|hack|game|tech|ctf/i.test(s))

  if (cafeVibe && techVibe) {
    return {
      title: 'Matcha café & campus stroll',
      location: 'Subang Jaya matcha spot · public mall level',
      duration: '3+ hours · ~2hr café block',
      budget: 'RM35–RM50',
      icebreaker: 'Roast each other’s funniest Figma layer name.',
      vibe: 'Calm, curious, low-pressure',
    }
  }

  if (cafeVibe) {
    return {
      title: 'Dessert café first meet',
      location: 'Campus-adjacent café · walking distance',
      duration: '3+ hours · ~2hr café block',
      budget: partner.budgetRange,
      icebreaker: 'Rate the café aesthetic like a product designer.',
      vibe: 'Cozy · dessert first',
    }
  }

  return {
    title: partner.idealFirstDate,
    location: `${partner.location} · public area`,
    duration: '3+ hours · flexible blocks',
    budget: partner.budgetRange,
    icebreaker: `Ask about their take on "${shared[0] ?? partner.interests[0]}".`,
    vibe: 'Low pressure · campus-safe',
  }
}
