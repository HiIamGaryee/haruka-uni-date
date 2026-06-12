export type MatchingPhase = {
  id: number
  label: string
  duration: number
}

export const matchingPhases: MatchingPhase[] = [
  { id: 1, label: 'Analyzing Interests...', duration: 800 },
  { id: 2, label: 'Comparing Lifestyle...', duration: 800 },
  { id: 3, label: 'Calculating Emotional Compatibility...', duration: 800 },
  { id: 4, label: 'Generating First Date Experience...', duration: 800 },
  { id: 5, label: 'Perfect Match Found!', duration: 1000 },
]

export const MATCH_SCORE_TARGET = 94

export type MatchCardProfile = {
  id: string
  name: string
  university: string
  course: string
  initials: string
  accent: string
  side: 'left' | 'right'
}

export const matchProfiles: MatchCardProfile[] = [
  {
    id: 'haruka',
    name: 'Haruka Tan',
    university: 'Sunway University',
    course: 'Software Engineering',
    initials: 'HT',
    accent: 'from-violet-500 to-purple-600',
    side: 'left',
  },
  {
    id: 'kai',
    name: 'Kai Lim',
    university: 'Sunway University',
    course: 'Computer Science',
    initials: 'KL',
    accent: 'from-blue-500 to-cyan-600',
    side: 'right',
  },
]

export type DnaStudent = {
  id: string
  label: string
  name: string
  university: string
  course: string
  bio: string
  accent: string
  initials: string
  interests: string[]
}

export type SharedInterestPair = {
  id: string
  studentA: string
  studentB: string
}

export type ConnectionNode = {
  id: string
  label: string
  position: number
  offsetY: number
}

export type CompatibilityInsight = {
  id: string
  text: string
}

export const dnaStudents: [DnaStudent, DnaStudent] = [
  {
    id: 'student-a',
    label: 'Student A',
    name: 'Haruka Tan',
    university: 'Sunway University',
    course: 'Software Engineering',
    bio: 'Playful introvert who loves café dates, design roasts, and low-pressure campus hangs.',
    accent: 'from-violet-500/80 to-purple-600/80',
    initials: 'HT',
    interests: ['UI Design', 'Café Hopping', 'Hackathons', 'Anime'],
  },
  {
    id: 'student-b',
    label: 'Student B',
    name: 'Kai Lim',
    university: 'Sunway University',
    course: 'Computer Science',
    bio: 'Calm builder — gaming nights, matcha runs, and slow-burn conversations.',
    accent: 'from-sky-500/80 to-cyan-600/80',
    initials: 'KL',
    interests: ['Gaming', 'Café Hopping', 'UI Design', 'Indie Games'],
  },
]

export const sharedInterestPairs: SharedInterestPair[] = [
  { id: 'design', studentA: 'UI Design', studentB: 'UI Design' },
  { id: 'cafe', studentA: 'Café Hopping', studentB: 'Café Hopping' },
  { id: 'games', studentA: 'Hackathons', studentB: 'Gaming' },
]

export const connectionNodes: ConnectionNode[] = [
  { id: 'interests', label: 'Shared Interests', position: 0.18, offsetY: -36 },
  { id: 'lifestyle', label: 'Lifestyle Match', position: 0.36, offsetY: 32 },
  { id: 'growth', label: 'Growth Potential', position: 0.72, offsetY: -32 },
]

export const compatibilityInsights: CompatibilityInsight[] = [
  { id: 'creativity', text: 'Shared creativity' },
  { id: 'social', text: 'Similar social preferences' },
  { id: 'growth', text: 'Growth mindset alignment' },
  { id: 'friendship', text: 'Strong friendship potential' },
]

export const compatibilityDnaContent = {
  eyebrow: 'Compatibility Analysis',
  title: 'Two profiles. One clear signal.',
  description:
    'Haruka reads lifestyle, interests, and emotional pace — then surfaces a single, confident compatibility score.',
  replayLabel: 'Replay Analysis',
  scoreLabel: 'Highly Compatible',
} as const
