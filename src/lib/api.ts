import {
  isMockSession,
  mockMatchResult,
  mockMatchRun,
  mockMe,
  mockSaveProfile,
  mockScheduleMatch,
} from './mockAuth'

const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

function getAdminKey(): string | null {
  return localStorage.getItem('haruka_admin_key')
}

function getAuthToken(): string | null {
  return localStorage.getItem('haruka_token')
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const adminKey = getAdminKey()
  const token = getAuthToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (adminKey && path.startsWith('/admin')) {
    headers['X-Admin-Key'] = adminKey
  }
  if (token && path !== '/auth/login' && path !== '/auth/signup') {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error ?? 'Request failed')
  }
  return res.json()
}

export const api = {
  health: () => request<{ status: string }>('/health'),

  me: () => {
    if (isMockSession()) return Promise.resolve(mockMe())
    return request<UserDashboard>('/me')
  },

  saveProfile: (data: unknown) => {
    if (isMockSession()) return Promise.resolve({ user: mockSaveProfile(data as Record<string, unknown>) })
    return request<{ user: AuthUser }>('/profile', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  completeProfile: (data: unknown) =>
    request<{ user: AuthUser }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getDatePlanTemplates: () =>
    request<{ count: number; templates: DatePlanTemplateSummary[] }>('/date-plans/templates'),

  match: {
    run: () => {
      if (isMockSession()) return Promise.resolve(mockMatchRun())
      return request<MatchRunResult>('/match/run', { method: 'POST' })
    },
    result: (matchId: string) => {
      if (isMockSession()) return Promise.resolve(mockMatchResult(matchId))
      return request<MatchResultPayload>(`/match/result/${matchId}`)
    },
    schedule: (matchId: string, data: { scheduledDate: string; timeStart: string; timeEnd: string }) => {
      if (isMockSession()) return Promise.resolve({ datePlan: mockScheduleMatch(matchId, data) })
      return request<{ datePlan: DatePlanRecord }>(`/match/schedule/${matchId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },
  },

  auth: {
    signup: (email: string, password: string, name: string) =>
      request<AuthResponse>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      }),
    login: (email: string, password: string) =>
      request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    me: () => request<UserDashboard>('/me'),
  },

  admin: {
    verify: () => request<{ ok: boolean }>('/admin/verify'),
    overview: () => request<AdminOverview>('/admin/overview'),
    users: (params?: { status?: string; search?: string }) => {
      const q = new URLSearchParams(params as Record<string, string>).toString()
      return request<AdminUser[]>(`/admin/users${q ? `?${q}` : ''}`)
    },
    waiting: () => request<WaitingUser[]>('/admin/waiting'),
    matches: () => request<AdminMatch[]>('/admin/matches'),
    reports: () => request<AdminReport[]>('/admin/reports'),
    analytics: () => request<AdminAnalytics>('/admin/analytics'),
    logs: () => request<AdminLog[]>('/admin/logs'),
    ban: (id: string, reason: string) =>
      request(`/admin/users/${id}/ban`, { method: 'POST', body: JSON.stringify({ reason }) }),
    delete: (id: string) => request(`/admin/users/${id}`, { method: 'DELETE' }),
    forceMatch: (userAId: string, userBId: string) =>
      request('/admin/force-match', {
        method: 'POST',
        body: JSON.stringify({ userAId, userBId }),
      }),
    resolveReport: (id: string, action: string) =>
      request(`/admin/reports/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ action }),
      }),
  },
}

export type AuthUser = {
  id: string
  email: string | null
  name: string
  university: string
  course: string
  status: string
  role?: string
  profileComplete: boolean
  gender?: string
  personalityType: string
  datingGoal: string
  foodPreference: string
  budgetPreference: string
  cgpa?: string
  languages?: string[]
  outdoorPerson?: string
  allergies?: string
  interests: { label: string }[]
}

export type SafeMatch = {
  id: string
  status: string
  compatibilityScore?: number
  aiReason?: string
} | null

export type DatePlanRecord = {
  id: string
  templateId: string | null
  title: string
  location: string
  time: string
  budget: string
  vibe: string
  timeline: { time: string; title: string; description?: string }[]
  scheduledDate?: string | null
  timeStart?: string | null
  timeEnd?: string | null
  scheduleConfirmed?: boolean
}

export type ProfileSummary = {
  id: string
  name: string
  age: number
  university: string
  faculty: string
  course: string
  year: string
  personalityType: string
  datingGoal: string
  comfortLevel: string
  foodPreference: string
  budgetPreference: string
  socialBattery: string
  interests: string[]
}

export type MatchResultPayload = {
  match: {
    id: string
    compatibilityScore: number
    aiReason: string
    status: string
    sharedInterests: string[]
    comfortLevel: string
    safetyNote: string
  }
  self: ProfileSummary
  partner: ProfileSummary
  datePlan: DatePlanRecord | null
  conversationStarters: { text: string; category: string }[]
}

export type MatchRunResult = {
  matched: boolean
  message: string
  match?: { id: string; status: string; compatibilityScore: number }
}

export type UserDashboard = {
  user: AuthUser
  match: SafeMatch
}

export type AuthResponse = {
  token: string
  user: AuthUser
}

export type DatePlanTemplateSummary = {
  id: string
  title: string
  budget: string
  vibe: string
  foodTags: string[]
  interestTags: string[]
}

export type AdminOverview = {
  totalUsers: number
  maleUsers: number
  femaleUsers: number
  activeUsers: number
  waitingPool: number
  matchedUsers: number
  averageMatchScore: number
  bannedUsers: number
  reportsPending: number
}

export type AdminUser = {
  id: string
  name: string
  age: number
  gender: string
  university: string
  course: string
  personalityType: string
  status: string
  profilePicture: string | null
  createdAt: string
  interests: { label: string }[]
}

export type WaitingUser = AdminUser & {
  waitingDurationHours: number
  topCandidate: { name: string; compatibilityScore: number } | null
  lastScanAt: string | null
  priorityScore: number
}

export type AdminMatch = {
  id: string
  compatibilityScore: number
  aiReason: string
  status: string
  successRate: number | null
  createdAt: string
  userA: { name: string }
  userB: { name: string }
}

export type AdminReport = {
  id: string
  reason: string
  severity: string
  status: string
  createdAt: string
  reporter: { name: string }
  reported: { name: string }
}

export type AdminAnalytics = {
  usersPerUniversity: Record<string, number>
  genderRatio: { male: number; female: number; other: number }
  topInterests: { label: string; count: number }[]
  averageCompatibilityScore: number
  dailyRegistrations: Record<string, number>
  matchSuccessRate: number
  totalMatches: number
}

export type AdminLog = {
  id: string
  type: string
  message: string
  createdAt: string
  user?: { name: string } | null
}
