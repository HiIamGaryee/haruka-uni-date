export const demoFlowContent = {
  eyebrow: 'Product flow',
  title: 'What happens after you sign up.',
  description:
    'Privacy-first matching for Malaysian campuses — one partner, one plan, no browse feed.',
} as const

export const demoSteps = [
  {
    step: '01',
    icon: 'userPlus' as const,
    title: 'Build your vibe card',
    description:
      'University dropdown, budget, CGPA band, languages, allergies — Haruka stores it privately. Nobody browses you.',
    mock: {
      type: 'profile' as const,
      fields: [
        { label: 'Name', value: 'Haruka Tan' },
        { label: 'University', value: 'Sunway University' },
        { label: 'Course', value: 'Software Engineering' },
      ],
      tags: ['UI Design', 'Café hopping', 'Hackathons'],
    },
  },
  {
    step: '02',
    icon: 'sliders' as const,
    title: 'Enter the same-uni pool',
    description:
      'Haruka only compares students at your campus. Cross-uni crushes stay in the waiting pool.',
    mock: {
      type: 'comfort' as const,
      selected: 'Sunway only',
      options: ['Sunway only', 'Other campus', 'Cross-uni', 'Paused'],
    },
  },
  {
    step: '03',
    icon: 'target' as const,
    title: '90%+ or nothing',
    description:
      'Seven weighted signals — interests, goals, budget, lifestyle. Below 90% means wait, not swipe.',
    mock: {
      type: 'score' as const,
      overall: 94,
      signals: [
        { label: 'Same university', value: 100 },
        { label: 'Shared interests', value: 93 },
        { label: 'Date plan fit', value: 90 },
      ],
    },
  },
  {
    step: '04',
    icon: 'sparkles' as const,
    title: 'Get your date plan',
    description:
      'Template picked from 30+ campus-safe ideas — café block, public meetup, icebreaker included.',
    mock: {
      type: 'datePlan' as const,
      title: 'Matcha café & campus stroll',
      location: 'Subang Jaya · public mall',
      budget: 'RM35–RM50',
      icebreaker: 'Roast each other’s funniest file name?',
    },
  },
] as const

export type DemoStep = (typeof demoSteps)[number]
export type DemoStepMock = DemoStep['mock']
