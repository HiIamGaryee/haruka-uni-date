import type {
  AuthUser,
  DatePlanRecord,
  MatchResultPayload,
  MatchRunResult,
  SafeMatch,
  UserDashboard,
} from './api'
import { sameUniversity } from '../data/malaysiaUniversities'
import {
  buildThreeHourTimeline,
  formatScheduledDateTime,
  validateScheduleInput,
} from './dateSchedule'

export const MOCK_TOKEN = 'mock-demo-session'
const MOCK_MATCH_ID = 'mock-match-haruka-mei'
const DEMO_PASSWORD = 'demo1234'

const accounts: Record<string, AuthUser> = {
  'haruka@sunway.edu': {
    id: 'mock-haruka',
    email: 'haruka@sunway.edu',
    name: 'Haruka Tan',
    university: 'Sunway University',
    course: 'Software Engineering',
    status: 'WAITING_FOR_MATCH',
    role: 'USER',
    profileComplete: true,
    personalityType: 'Playful Introvert',
    datingGoal: 'Slow dating, start as friends',
    foodPreference: 'Café & dessert',
    budgetPreference: 'RM30 – RM50',
    gender: 'FEMALE',
    cgpa: '3.50 – 3.74',
    languages: ['English', 'Mandarin', 'Malay'],
    outdoorPerson: 'Sometimes',
    allergies: 'None',
    interests: [
      { label: 'UI Design' },
      { label: 'Café hopping' },
      { label: 'Hackathons' },
    ],
  },
  'mei@monash.edu': {
    id: 'mock-mei',
    email: 'mei@monash.edu',
    name: 'Mei Wong',
    university: 'Monash University Malaysia',
    course: 'Business Analytics',
    status: 'WAITING_FOR_MATCH',
    role: 'USER',
    profileComplete: true,
    personalityType: 'Ambitious Social Butterfly',
    datingGoal: 'Serious but no rush',
    foodPreference: 'Matcha & brunch',
    budgetPreference: 'RM50 – RM70',
    gender: 'FEMALE',
    cgpa: '3.75 – 4.00',
    languages: ['English', 'Malay', 'Cantonese'],
    outdoorPerson: 'Yes — love outdoors',
    allergies: 'None',
    interests: [{ label: 'Sports & gym' }, { label: 'Startups' }],
  },
  'kai@sunway.edu': {
    id: 'mock-kai',
    email: 'kai@sunway.edu',
    name: 'Kai Lim',
    university: 'Sunway University',
    course: 'Computer Science',
    status: 'WAITING_FOR_MATCH',
    role: 'USER',
    profileComplete: true,
    personalityType: 'Calm Builder',
    datingGoal: 'Slow dating, start as friends',
    foodPreference: 'Café & brunch',
    budgetPreference: 'RM30 – RM50',
    gender: 'MALE',
    cgpa: '3.50 – 3.74',
    languages: ['English', 'Mandarin'],
    outdoorPerson: 'Sometimes',
    allergies: 'None',
    interests: [{ label: 'Gaming' }, { label: 'Café hopping' }, { label: 'UI Design' }],
  },
}

function findMockPartner(email: string): AuthUser | null {
  const user = accounts[email.toLowerCase()]
  if (!user?.profileComplete) return null
  return (
    Object.values(accounts).find(
      (a) =>
        a.email?.toLowerCase() !== email.toLowerCase() &&
        a.profileComplete &&
        sameUniversity(a.university, user.university),
    ) ?? null
  )
}

function getMockPartner(): AuthUser {
  const partnerEmail = sessionStorage.getItem('haruka_mock_partner')
  if (partnerEmail && accounts[partnerEmail]) return accounts[partnerEmail]
  const email = getMockEmail()
  return findMockPartner(email) ?? accounts['kai@sunway.edu']
}

export function isMockSession(): boolean {
  return localStorage.getItem('haruka_token') === MOCK_TOKEN
}

function getMockEmail(): string {
  return localStorage.getItem('haruka_mock_email') ?? 'haruka@sunway.edu'
}

function isMockMatched(): boolean {
  return sessionStorage.getItem('haruka_mock_matched') === 'true'
}

export function mockLogin(email: string, password: string): AuthUser {
  if (password !== DEMO_PASSWORD) {
    throw new Error('Invalid email or password (demo: demo1234)')
  }
  const user = accounts[email.toLowerCase()]
  if (!user) {
    throw new Error('Unknown demo account. Try haruka@sunway.edu or kai@sunway.edu / demo1234')
  }
  localStorage.setItem('haruka_token', MOCK_TOKEN)
  localStorage.setItem('haruka_mock_email', email.toLowerCase())
  localStorage.setItem('haruka_user_id', user.id)
  return { ...user }
}

export function mockSignup(email: string, password: string, name: string): AuthUser {
  if (password.length < 6) throw new Error('Password too short')
  const signupUni = localStorage.getItem('haruka_signup_uni') ?? ''
  const user: AuthUser = {
    id: `mock-${Date.now()}`,
    email,
    name,
    university: signupUni || 'Pending',
    course: 'Pending',
    status: 'INCOMPLETE_PROFILE',
    role: 'USER',
    profileComplete: false,
    personalityType: 'Pending',
    datingGoal: 'Pending',
    foodPreference: 'Pending',
    budgetPreference: 'RM25–RM45',
    interests: [],
  }
  localStorage.setItem('haruka_token', MOCK_TOKEN)
  localStorage.setItem('haruka_mock_email', email.toLowerCase())
  localStorage.setItem('haruka_user_id', user.id)
  accounts[email.toLowerCase()] = user
  return user
}

export function mockMe(): UserDashboard {
  const email = getMockEmail()
  const user = accounts[email] ?? accounts['haruka@sunway.edu']
  const matched = isMockMatched() || user.status === 'MATCHED'
  const match: SafeMatch = matched
    ? { id: MOCK_MATCH_ID, status: 'PLAN_GENERATED', compatibilityScore: 94 }
    : null
  return {
    user: matched ? { ...user, status: 'MATCHED' } : { ...user },
    match,
  }
}

export function mockSaveProfile(data: Record<string, unknown>): AuthUser {
  const email = getMockEmail()
  const existing = accounts[email] ?? accounts['haruka@sunway.edu']
  const hobbies = (data.hobbies as string[]) ?? []
  const updated: AuthUser = {
    ...existing,
    name: String(data.name ?? existing.name),
    university: String(data.university ?? existing.university),
    course: String(data.course ?? existing.course),
    personalityType: String(data.personalityType ?? existing.personalityType),
    datingGoal: String(data.datingGoal ?? existing.datingGoal),
    foodPreference: String(data.foodPreference ?? existing.foodPreference),
    budgetPreference: String(data.budgetPreference ?? existing.budgetPreference),
    gender: String(data.gender ?? existing.gender ?? 'OTHER'),
    cgpa: String(data.cgpa ?? existing.cgpa ?? 'Prefer not to say'),
    languages: (data.languages as string[]) ?? existing.languages ?? [],
    outdoorPerson: String(data.outdoorPerson ?? existing.outdoorPerson ?? 'Sometimes'),
    allergies: String(data.allergies ?? existing.allergies ?? 'None'),
    profileComplete: true,
    status: 'WAITING_FOR_MATCH',
    interests: hobbies.map((label) => ({ label })),
  }
  accounts[email] = updated
  sessionStorage.removeItem('haruka_mock_matched')
  return updated
}

export function mockMatchRun(): MatchRunResult {
  const email = getMockEmail()
  const user = accounts[email]
  if (!user?.profileComplete) {
    return { matched: false, message: 'Complete your profile first' }
  }
  const partner = findMockPartner(email)
  if (!partner) {
    return {
      matched: false,
      message:
        'No strong match yet at your university. Your profile is safely stored in the waiting pool.',
    }
  }

  sessionStorage.removeItem('haruka_mock_schedule')
  sessionStorage.setItem('haruka_mock_partner', partner.email!)
  sessionStorage.setItem('haruka_mock_matched', 'true')
  accounts[email] = { ...user, status: 'MATCHED' }
  accounts[partner.email!.toLowerCase()] = { ...partner, status: 'MATCHED' }
  return {
    matched: true,
    message: `Matched ${user.name} with ${partner.name} at 94% (same university)`,
    match: { id: MOCK_MATCH_ID, status: 'PLAN_GENERATED', compatibilityScore: 94 },
  }
}

function baseMockDatePlan(): DatePlanRecord {
  return {
    id: 'mock-plan-1',
    templateId: 'matcha-cafe-walk',
    title: 'Matcha café & campus stroll',
    location: 'Subang Jaya matcha café near campus',
    time: 'Pick your date after match (3+ hours · 2hr café)',
    budget: 'RM35–RM50',
    vibe: 'Calm, curious, low-pressure',
    scheduleConfirmed: false,
    timeline: [],
  }
}

function loadMockDatePlan(): DatePlanRecord {
  const raw = sessionStorage.getItem('haruka_mock_schedule')
  if (!raw) return baseMockDatePlan()
  try {
    return JSON.parse(raw) as DatePlanRecord
  } catch {
    return baseMockDatePlan()
  }
}

export function mockScheduleMatch(
  _matchId: string,
  data: { scheduledDate: string; timeStart: string; timeEnd: string },
): DatePlanRecord {
  const err = validateScheduleInput(data.scheduledDate, data.timeStart, data.timeEnd)
  if (err) throw new Error(err)

  const base = baseMockDatePlan()
  const timeline = buildThreeHourTimeline({
    timeStart: data.timeStart,
    timeEnd: data.timeEnd,
    venueTitle: base.title,
    cafeTitle: 'Café & meal together (~2 hours)',
    activityTitle: 'Campus walk & easy chat',
  })

  const plan: DatePlanRecord = {
    ...base,
    scheduledDate: data.scheduledDate,
    timeStart: data.timeStart,
    timeEnd: data.timeEnd,
    scheduleConfirmed: true,
    time: formatScheduledDateTime(data.scheduledDate, data.timeStart, data.timeEnd),
    timeline,
  }
  sessionStorage.setItem('haruka_mock_schedule', JSON.stringify(plan))
  return plan
}

export function mockMatchResult(_matchId: string): MatchResultPayload {
  const email = getMockEmail()
  const self = accounts[email] ?? accounts['haruka@sunway.edu']
  const partner = getMockPartner()

  return {
    match: {
      id: MOCK_MATCH_ID,
      compatibilityScore: 94,
      aiReason:
        'Strong match because both enjoy creative campus life, low-pressure dates, and playful conversation.',
      status: 'REVEALED',
      sharedInterests: ['Café Hopping', 'Startups'],
      comfortLevel: 'Public places only',
      safetyNote:
        'First meetup should stay in a public campus or mall area. Share your location with a friend. You can share your date plan and meetup location on WhatsApp before you go.',
    },
    self: {
      id: self.id,
      name: self.name,
      age: 21,
      university: self.university,
      faculty: 'School of Engineering and Technology',
      course: self.course,
      year: 'Year 2',
      personalityType: self.personalityType,
      datingGoal: self.datingGoal,
      comfortLevel: 'Public places only',
      foodPreference: self.foodPreference,
      budgetPreference: self.budgetPreference,
      socialBattery: 'Medium',
      interests: self.interests.map((i) => i.label),
    },
    partner: {
      id: partner.id,
      name: partner.name,
      age: 22,
      university: partner.university,
      faculty: 'School of Business',
      course: partner.course,
      year: 'Year 3',
      personalityType: partner.personalityType,
      datingGoal: partner.datingGoal,
      comfortLevel: 'Group hangout first',
      foodPreference: partner.foodPreference,
      budgetPreference: partner.budgetPreference,
      socialBattery: 'High',
      interests: partner.interests.map((i) => i.label),
    },
    datePlan: loadMockDatePlan(),
    conversationStarters: [
      { text: 'What course stereotype annoys you the most?', category: 'Campus' },
      { text: 'Which assignment nearly destroyed your sanity?', category: 'Relatable' },
      { text: "What's your biggest delulu dream?", category: 'Fun' },
    ],
  }
}

export function mockLogout(): void {
  sessionStorage.removeItem('haruka_mock_matched')
  sessionStorage.removeItem('haruka_mock_schedule')
  sessionStorage.removeItem('haruka_mock_partner')
}
