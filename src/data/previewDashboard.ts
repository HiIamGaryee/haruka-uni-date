export type PreviewProfileData = {
  name: string
  initials: string
  university: string
  course: string
  interests: string[]
  status?: string
}

export type PreviewMatchData = {
  partnerName?: string
  compatibility: number
  sharedInterests?: string[]
  metrics: readonly {
    key: string
    label: string
    value: string
    icon: 'graduation' | 'sparkles' | 'zap'
  }[]
  signalBars: readonly {
    label: string
    value: number
    accent: 'emerald' | 'blue' | 'purple'
  }[]
}

export type PreviewDatePlanData = {
  title: string
  location: string
  duration: string
  budget: string
  icebreaker: string
  vibe?: string
}

export const previewProfile: PreviewProfileData = {
  name: 'Haruka',
  initials: 'HT',
  university: 'Sunway University',
  course: 'Software Engineering',
  interests: ['UI Design', 'Café Hopping', 'Hackathons'],
  status: 'Profile complete · Ready to match',
}

export const previewMatch: PreviewMatchData = {
  partnerName: 'Kai Lim',
  compatibility: 94,
  sharedInterests: ['Café Hopping', 'UI Design'],
  metrics: [
    { key: 'sameUni', label: 'Same Uni', value: 'Yes', icon: 'graduation' },
    { key: 'sharedInterests', label: 'Shared Interests', value: '2', icon: 'sparkles' },
    { key: 'dateEnergy', label: 'Date Energy', value: 'Calm + playful', icon: 'zap' },
  ],
  signalBars: [
    { label: 'University', value: 100, accent: 'emerald' },
    { label: 'Interests', value: 93, accent: 'purple' },
    { label: 'Personality', value: 86, accent: 'emerald' },
    { label: 'Dating Goals', value: 95, accent: 'blue' },
    { label: 'Date Plan Fit', value: 90, accent: 'blue' },
  ],
}

export const previewDatePlan: PreviewDatePlanData = {
  title: 'Matcha café & campus stroll',
  location: 'Subang Jaya matcha spot · public mall level',
  duration: '3+ hours · ~2hr café block',
  budget: 'RM35–RM50',
  icebreaker: 'Roast each other’s funniest Figma layer name.',
  vibe: 'Calm, curious, low-pressure',
}

export function previewDatePlanFields(plan: PreviewDatePlanData) {
  return [
    { key: 'location', label: 'Location', value: plan.location, icon: 'mapPin' as const },
    { key: 'duration', label: 'Duration', value: plan.duration, icon: 'clock' as const },
    { key: 'budget', label: 'Budget', value: plan.budget, icon: 'wallet' as const },
    { key: 'icebreaker', label: 'Icebreaker', value: plan.icebreaker, icon: 'message' as const },
  ] as const
}

export type PreviewDashboardData = {
  profile: PreviewProfileData
  match: PreviewMatchData
  datePlan: PreviewDatePlanData
}

export const defaultPreviewDashboard: PreviewDashboardData = {
  profile: previewProfile,
  match: previewMatch,
  datePlan: previewDatePlan,
}
