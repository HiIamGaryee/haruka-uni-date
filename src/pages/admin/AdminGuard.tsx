import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { api } from '../../lib/api'

export function AdminGuard() {
  const [ok, setOk] = useState<boolean | null>(null)

  useEffect(() => {
    const key = localStorage.getItem('haruka_admin_key')
    if (!key) {
      const t = setTimeout(() => setOk(false), 0)
      return () => clearTimeout(t)
    }
    api.admin
      .verify()
      .then(() => setOk(true))
      .catch(() => setOk(false))
  }, [])

  if (ok === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-muted">
        Verifying admin access...
      </div>
    )
  }

  if (!ok) return <Navigate to="/admin-dash/login" replace />

  return <Outlet />
}
