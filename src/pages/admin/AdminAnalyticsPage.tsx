import { useEffect, useState } from 'react'
import { api, type AdminAnalytics } from '../../lib/api'

export function AdminAnalyticsPage() {
  const [data, setData] = useState<AdminAnalytics | null>(null)

  useEffect(() => {
    api.admin.analytics().then(setData).catch(console.error)
  }, [])

  if (!data) return <p className="text-muted">Loading analytics...</p>

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Analytics</h1>
      <p className="text-sm text-muted">Platform insights</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="glass rounded-2xl p-5">
          <p className="text-xs text-dim">Avg Compatibility</p>
          <p className="font-display text-3xl font-bold">{data.averageCompatibilityScore}%</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-xs text-dim">Match Success Rate</p>
          <p className="font-display text-3xl font-bold">{data.matchSuccessRate}%</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-xs text-dim">Total Matches</p>
          <p className="font-display text-3xl font-bold">{data.totalMatches}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <h2 className="font-semibold">Gender Ratio</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Male: {data.genderRatio.male}</li>
            <li>Female: {data.genderRatio.female}</li>
            <li>Other: {data.genderRatio.other}</li>
          </ul>
        </div>
        <div className="glass rounded-2xl p-5">
          <h2 className="font-semibold">Top Interests</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {data.topInterests.map((i) => (
              <li key={i.label}>
                {i.label} <span className="text-dim">({i.count})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <h2 className="font-semibold">Users per University</h2>
          <ul className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
            {Object.entries(data.usersPerUniversity).map(([uni, count]) => (
              <li key={uni}>
                {uni}: <span className="text-accent">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
