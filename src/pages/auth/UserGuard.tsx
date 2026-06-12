import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function UserGuard() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-muted">
        Loading your account...
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return <Outlet />
}
