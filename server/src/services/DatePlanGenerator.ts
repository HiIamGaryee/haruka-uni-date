import { DATE_PLAN_TEMPLATES, type DatePlanTemplate } from '../data/datePlanTemplates.js'
import { buildThreeHourTimeline } from '../lib/dateSchedule.js'
import type { UserWithRelations } from '../repositories/user.repository.js'

export type GeneratedDatePlan = {
  templateId: string
  title: string
  location: string
  time: string
  budget: string
  vibe: string
  timeline: { time: string; title: string; description?: string }[]
}

function parseBudget(pref: string): { min: number; max: number } {
  const nums = pref.match(/\d+/g)?.map(Number) ?? [25, 45]
  if (nums.length >= 2) return { min: Math.min(nums[0], nums[1]), max: Math.max(nums[0], nums[1]) }
  const mid = nums[0] ?? 35
  return { min: mid - 10, max: mid + 15 }
}

function socialLevel(battery: string): 'low' | 'medium' | 'high' {
  const s = battery.toLowerCase()
  if (s.includes('low') || s.includes('intro')) return 'low'
  if (s.includes('high') || s.includes('extro')) return 'high'
  return 'medium'
}

function scoreTemplate(
  template: DatePlanTemplate,
  userA: UserWithRelations,
  userB: UserWithRelations,
): number {
  let score = 0
  const hobbies = [
    ...userA.interests.map((i) => i.label.toLowerCase()),
    ...userB.interests.map((i) => i.label.toLowerCase()),
  ]
  const foodText = `${userA.foodPreference} ${userB.foodPreference}`.toLowerCase()
  const meetingText =
    `${userA.preferredMeetingStyle} ${userB.preferredMeetingStyle} ${userA.comfortLevel}`.toLowerCase()

  for (const tag of template.foodTags) {
    if (foodText.includes(tag)) score += 12
  }

  for (const tag of template.interestTags) {
    if (hobbies.some((h) => h.includes(tag) || tag.includes(h))) score += 8
  }

  for (const style of template.meetingStyles) {
    if (meetingText.includes(style)) score += 6
  }

  const budgetA = parseBudget(userA.budgetPreference)
  const budgetB = parseBudget(userB.budgetPreference)
  const userMin = Math.min(budgetA.min, budgetB.min)
  const userMax = Math.max(budgetA.max, budgetB.max)
  const overlap = Math.max(
    0,
    Math.min(template.budgetMax, userMax) - Math.max(template.budgetMin, userMin),
  )
  score += Math.min(20, overlap * 2)

  const levelA = socialLevel(userA.socialBattery)
  const levelB = socialLevel(userB.socialBattery)
  const levels = new Set([levelA, levelB])
  for (const lvl of template.socialBattery) {
    if (levels.has(lvl)) score += 10
  }

  if (userA.availability[0]) {
    const day = userA.availability[0].day.toLowerCase()
    if (template.time.toLowerCase().includes(day.slice(0, 3))) score += 8
  }

  return score
}

export class DatePlanGenerator {
  /** Picks best plan from 30 templates using preference logic — no AI. */
  selectTemplate(userA: UserWithRelations, userB: UserWithRelations): DatePlanTemplate {
    const ranked = DATE_PLAN_TEMPLATES.map((template) => ({
      template,
      score: scoreTemplate(template, userA, userB),
    })).sort((a, b) => b.score - a.score)

    return ranked[0]?.template ?? DATE_PLAN_TEMPLATES[0]
  }

  generate(userA: UserWithRelations, userB: UserWithRelations): GeneratedDatePlan {
    const template = this.selectTemplate(userA, userB)
    const partnerInterest = userB.interests[0]?.label ?? 'hobbies'

    const cafeStep =
      template.timeline.find((s) =>
        /café|cafe|meal|dessert|matcha|brunch|food|order/i.test(s.title),
      ) ?? template.timeline[1]
    const activityStep =
      template.timeline.find((s) => /walk|stroll|activity|game|browse/i.test(s.title)) ??
      template.timeline[template.timeline.length - 2]

    const timeline = buildThreeHourTimeline({
      timeStart: '14:00',
      timeEnd: '17:00',
      venueTitle: template.title,
      cafeTitle: cafeStep?.title ?? 'Café & meal together',
      activityTitle: activityStep?.title ?? 'Campus walk & conversation',
    }).map((step, i) =>
      i === 2 ? { ...step, description: `Ask about ${partnerInterest} · ${step.description}` } : step,
    )

    return {
      templateId: template.id,
      title: template.title,
      location: template.location.replace('Campus', userA.university.split(' ')[0] ?? 'Campus'),
      time: 'Pick your date after match (3+ hours · 2hr café)',
      budget: template.budget,
      vibe: `${userA.comfortLevel} · ${template.vibe}`,
      timeline,
    }
  }
}

export const datePlanGenerator = new DatePlanGenerator()
