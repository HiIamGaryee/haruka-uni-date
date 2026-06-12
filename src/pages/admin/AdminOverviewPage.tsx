import { useEffect, useState } from 'react'
import { api, type AdminOverview } from '../../lib/api'

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-dim">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-gradient-gold">{value}</p>
    </div>
  )
}

export function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminOverview | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.admin
      .overview()
      .then(setStats)
      .catch((e) => setError(e.message))
  }, [])

  if (error) return <p className="text-rose-400">{error}</p>
  if (!stats) return <p className="text-muted">Loading overview...</p>

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Dashboard Overview</h1>
      <p className="mt-1 text-sm text-muted">Real-time match engine metrics</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Male Users" value={stats.maleUsers} />
        <StatCard label="Female Users" value={stats.femaleUsers} />
        <StatCard label="Active Users" value={stats.activeUsers} />
        <StatCard label="Waiting Pool" value={stats.waitingPool} />
        <StatCard label="Matched Users" value={stats.matchedUsers} />
        <StatCard label="Avg Match Score" value={`${stats.averageMatchScore}%`} />
        <StatCard label="Banned Users" value={stats.bannedUsers} />
        <StatCard label="Reports Pending" value={stats.reportsPending} />
      </div>
    </div>
  )
}
