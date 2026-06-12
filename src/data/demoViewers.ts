import { getInitials } from './students'

export type DemoViewer = {
  id: string
  name: string
  email: string
  university: string
  faculty: string
  course: string
  gender: 'MALE' | 'FEMALE'
  personalityType: string
  datingGoal: string
  budgetRange: string
  comfortLevel: string
  availability: string
  interests: string[]
  accent: string
  tagline: string
}

export const demoViewers: DemoViewer[] = [
  {
    id: 'haruka-tan',
    name: 'Haruka Tan',
    email: 'haruka@sunway.edu',
    university: 'Sunway University',
    faculty: 'School of Engineering and Technology',
    course: 'Software Engineering',
    gender: 'FEMALE',
    personalityType: 'Playful Introvert',
    datingGoal: 'Slow dating, start as friends',
    budgetRange: 'RM30 – RM50',
    comfortLevel: 'Public places only',
    availability: 'Friday evening, Saturday afternoon',
    interests: ['UI Design', 'Café Hopping', 'Hackathons', 'Anime'],
    accent: 'from-violet-500 to-purple-600',
    tagline: 'Sunway · waiting for a same-uni match',
  },
  {
    id: 'kai-lim',
    name: 'Kai Lim',
    email: 'kai@sunway.edu',
    university: 'Sunway University',
    faculty: 'School of Engineering and Technology',
    course: 'Computer Science',
    gender: 'MALE',
    personalityType: 'Calm Builder',
    datingGoal: 'Slow dating, start as friends',
    budgetRange: 'RM30 – RM50',
    comfortLevel: 'Public places only',
    availability: 'Friday evening, Saturday afternoon',
    interests: ['Gaming', 'Café Hopping', 'UI Design'],
    accent: 'from-blue-500 to-cyan-600',
    tagline: 'Sunway · Haruka’s demo match partner',
  },
  {
    id: 'mei-wong',
    name: 'Mei Wong',
    email: 'mei@monash.edu',
    university: 'Monash University Malaysia',
    faculty: 'School of Business',
    course: 'Business Analytics',
    gender: 'FEMALE',
    personalityType: 'Ambitious Social Butterfly',
    datingGoal: 'Serious but no rush',
    budgetRange: 'RM50 – RM70',
    comfortLevel: 'Group hangout first',
    availability: 'Saturday brunch, Sunday evening',
    interests: ['Matcha', 'Startups', 'Volleyball', 'Café Reviews'],
    accent: 'from-emerald-500 to-teal-600',
    tagline: 'Monash · thin pool until more sign up',
  },
]

export const demoAccounts = [
  { email: 'haruka@sunway.edu', password: 'demo1234', note: 'Female · Sunway · matches Kai' },
  { email: 'kai@sunway.edu', password: 'demo1234', note: 'Male · Sunway · matches Haruka' },
  { email: 'mei@monash.edu', password: 'demo1234', note: 'Monash · waiting pool demo' },
] as const

export function viewerInitials(name: string): string {
  return getInitials(name)
}
