export type JourneyIcon =
  | 'meet'
  | 'coffee'
  | 'icebreaker'
  | 'walk'
  | 'goodbye'

export type JourneyStep = {
  id: string
  label: string
  icon: JourneyIcon
  description: string
  moodLevel: number
  energyLevel: number
  conversationConfidence: number
}

export const journeyContent = {
  eyebrow: 'Date Journey',
  title: 'Follow the path from hello to goodbye.',
  description:
    'Scroll through a first-date journey — mood, energy, and conversation confidence evolve at every step, Duolingo-style.',
} as const

export const journeySteps: JourneyStep[] = [
  {
    id: 'meet',
    label: 'Meet',
    icon: 'meet',
    description: 'Nervous waves, shy smiles, and that first “omg you’re real” moment outside the café.',
    moodLevel: 62,
    energyLevel: 48,
    conversationConfidence: 35,
  },
  {
    id: 'coffee',
    label: 'Coffee',
    icon: 'coffee',
    description: 'Warm drinks, dessert menus, and the comfort of a public table between you.',
    moodLevel: 74,
    energyLevel: 58,
    conversationConfidence: 52,
  },
  {
    id: 'icebreaker',
    label: 'Icebreaker',
    icon: 'icebreaker',
    description: 'Assignment horror stories land. Laughter breaks the tension — you’re actually vibing.',
    moodLevel: 86,
    energyLevel: 72,
    conversationConfidence: 78,
  },
  {
    id: 'walk',
    label: 'Walk',
    icon: 'walk',
    description: 'A slow campus stroll, random photos, and easy silence that doesn’t feel awkward.',
    moodLevel: 91,
    energyLevel: 65,
    conversationConfidence: 88,
  },
  {
    id: 'goodbye',
    label: 'Goodbye',
    icon: 'goodbye',
    description: 'A safe ending, a genuine smile, and the quiet hope of a second meetup.',
    moodLevel: 95,
    energyLevel: 55,
    conversationConfidence: 92,
  },
]
