import { Navigate } from 'react-router-dom'

/** @deprecated Use /profile instead */
export function DashboardPage() {
  return <Navigate to="/profile" replace />
}
