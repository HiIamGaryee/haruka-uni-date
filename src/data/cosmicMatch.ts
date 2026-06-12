export const COSMIC_MATCH_SCORE = 94
export const COSMIC_MATCH_THRESHOLD = 90

export type CosmicStar = {
  id: string
  name: string
  initials: string
  accent: string
  startX: number
  startY: number
}

export type ConstellationNode = {
  id: string
  x: number
  y: number
  label: string
}

export type InterestPlanet = {
  id: string
  label: string
  orbitRadius: number
  angle: number
  size: number
  color: string
}

export type PersonalityTrait = {
  id: string
  label: string
  orbitRadius: number
  speed: number
  angle: number
}

export type CelebrationPhase = {
  id: number
  key: string
  duration: number
}

export const cosmicStars: CosmicStar[] = [
  {
    id: 'haruka',
    name: 'Haruka Tan',
    initials: 'HT',
    accent: 'from-violet-400 to-fuchsia-500',
    startX: 18,
    startY: 62,
  },
  {
    id: 'aiden',
    name: 'Aiden Lee',
    initials: 'AL',
    accent: 'from-cyan-400 to-blue-500',
    startX: 82,
    startY: 38,
  },
]

export const constellationNodes: ConstellationNode[] = [
  { id: 'n1', x: 28, y: 28, label: 'Creative' },
  { id: 'n2', x: 42, y: 18, label: 'Curious' },
  { id: 'n3', x: 58, y: 22, label: 'Playful' },
  { id: 'n4', x: 72, y: 32, label: 'Loyal' },
  { id: 'n5', x: 50, y: 42, label: 'Aligned' },
]

export const constellationEdges: [string, string][] = [
  ['n1', 'n2'],
  ['n2', 'n3'],
  ['n3', 'n4'],
  ['n4', 'n5'],
  ['n5', 'n1'],
  ['n2', 'n5'],
]

export const interestPlanets: InterestPlanet[] = [
  { id: 'anime', label: 'Anime', orbitRadius: 72, angle: 30, size: 28, color: '#a78bfa' },
  { id: 'coffee', label: 'Coffee', orbitRadius: 88, angle: 110, size: 32, color: '#f59e0b' },
  { id: 'hackathons', label: 'Hackathons', orbitRadius: 64, angle: 200, size: 30, color: '#34d399' },
  { id: 'games', label: 'Indie Games', orbitRadius: 96, angle: 280, size: 26, color: '#60a5fa' },
]

export const personalityTraits: PersonalityTrait[] = [
  { id: 'introvert', label: 'Playful Introvert', orbitRadius: 118, speed: 1, angle: 0 },
  { id: 'listener', label: 'Calm Listener', orbitRadius: 132, speed: -0.8, angle: 90 },
  { id: 'nerdy', label: 'Nerdy Humor', orbitRadius: 125, speed: 1.2, angle: 180 },
  { id: 'mature', label: 'Emotionally Mature', orbitRadius: 140, speed: -1, angle: 270 },
]

export const scoreMilestones = [0, 25, 53, 78, 94] as const

export const celebrationPhases: CelebrationPhase[] = [
  { id: 1, key: 'pause', duration: 300 },
  { id: 2, key: 'darken', duration: 400 },
  { id: 3, key: 'heart', duration: 600 },
  { id: 4, key: 'avatars', duration: 800 },
  { id: 5, key: 'explode', duration: 700 },
  { id: 6, key: 'score', duration: 1500 },
  { id: 7, key: 'tagline', duration: 800 },
  { id: 8, key: 'confetti', duration: 600 },
  { id: 9, key: 'dateCard', duration: 1000 },
]

export const cosmicCelebrationContent = {
  scoreLabel: 'Cosmic Compatibility',
  tagline: "It's giving main character energy.",
  firstDate: {
    title: 'Butter & Beans Café Date',
    time: 'Saturday · 4:00 PM',
    location: 'Campus-adjacent · Walking distance',
    budget: 'RM38 estimated',
    vibe: 'Dessert café · Low pressure · Public',
  },
} as const

export const universeAlignmentContent = {
  eyebrow: 'Universe Alignment',
  title: 'When two stars were always meant to orbit together.',
  description:
    'Watch shared interests become planets, personality traits find their orbit, and two student stars merge into one glowing system.',
  triggerLabel: 'Witness Cosmic Match',
  replayLabel: 'Replay Alignment',
} as const
