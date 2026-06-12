import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api } from '../lib/api'
import type { AuthUser, UserDashboard } from '../lib/api'
import { mockLogin, mockLogout, mockSignup, MOCK_TOKEN } from '../lib/mockAuth'
import { AuthContext } from './authContext'

const USE_MOCK_AUTH = import.meta.env.VITE_MOCK_AUTH !== 'false'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [match, setMatch] = useState<UserDashboard['match']>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const token = localStorage.getItem('haruka_token')
    if (!token) {
      setUser(null)
      setMatch(null)
      setLoading(false)
      return
    }
    try {
      const data = await api.me()
      setUser(data.user)
      setMatch(data.match)
    } catch {
      if (token !== MOCK_TOKEN) {
        localStorage.removeItem('haruka_token')
        localStorage.removeItem('haruka_user_id')
      }
      setUser(null)
      setMatch(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      refresh()
    }, 0)
    return () => clearTimeout(t)
  }, [refresh])

  const login = useCallback(async (email: string, password: string) => {
    if (USE_MOCK_AUTH) {
      const u = mockLogin(email, password)
      setUser(u)
      const data = await api.me()
      setMatch(data.match)
      return { user: data.user, match: data.match }
    }
    const { token, user: u } = await api.auth.login(email, password)
    localStorage.setItem('haruka_token', token)
    localStorage.setItem('haruka_user_id', u.id)
    setUser(u)
    const data = await api.me()
    setMatch(data.match)
    return { user: data.user, match: data.match }
  }, [])

  const signup = useCallback(async (email: string, password: string, name: string) => {
    if (USE_MOCK_AUTH) {
      const u = mockSignup(email, password, name)
      setUser(u)
      setMatch(null)
      return
    }
    const { token, user: u } = await api.auth.signup(email, password, name)
    localStorage.setItem('haruka_token', token)
    localStorage.setItem('haruka_user_id', u.id)
    setUser(u)
    setMatch(null)
  }, [])

  const logout = useCallback(() => {
    mockLogout()
    localStorage.removeItem('haruka_token')
    localStorage.removeItem('haruka_user_id')
    localStorage.removeItem('haruka_mock_email')
    setUser(null)
    setMatch(null)
  }, [])

  const value = useMemo(
    () => ({ user, match, loading, login, signup, logout, refresh }),
    [user, match, loading, login, signup, logout, refresh],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
