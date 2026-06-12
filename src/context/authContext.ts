import { createContext } from 'react'
import type { AuthUser, UserDashboard } from '../lib/api'

export type AuthContextValue = {
  user: AuthUser | null
  match: UserDashboard['match']
  loading: boolean
  login: (
    email: string,
    password: string,
  ) => Promise<{ user: AuthUser; match: UserDashboard['match'] }>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  refresh: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
