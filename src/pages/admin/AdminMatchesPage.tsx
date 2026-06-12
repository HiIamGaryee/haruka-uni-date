import { useEffect, useState } from 'react'
import { api, type AdminMatch } from '../../lib/api'

export function AdminMatchesPage() {
  const [matches, setMatches] = useState<AdminMatch[]>([])

  useEffect(() => {
    api.admin.matches().then(setMatches).catch(console.error)
  }, [])

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Match History</h1>
      <p className="text-sm text-muted">All soulmate matches created by the engine</p>
      <div className="mt-6 space-y-4">
        {matches.map((m) => (
          <div key={m.id} className="glass rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-display text-lg font-bold">
                {m.userA.name}{' '}
                <span className="text-dim font-normal">+</span> {m.userB.name}
              </p>
              <span className="font-display text-2xl font-bold text-gradient-gold">
                {Math.round(m.compatibilityScore)}%
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">{m.aiReason}</p>
            <div className="mt-3 flex gap-4 text-xs text-dim">
              <span>Status: {m.status}</span>
              <span>{new Date(m.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
        {matches.length === 0 && (
          <p className="text-muted">No matches yet. Run seed + matching engine.</p>
        )}
      </div>
    </div>
  )
}
