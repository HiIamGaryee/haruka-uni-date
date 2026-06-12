import { useEffect, useState } from 'react'
import { api, type WaitingUser } from '../../lib/api'

export function AdminWaitingPage() {
  const [users, setUsers] = useState<WaitingUser[]>([])

  useEffect(() => {
    api.admin.waiting().then(setUsers).catch(console.error)
  }, [])

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Waiting Pool</h1>
      <p className="text-sm text-muted">Users waiting for soulmate match</p>
      <div className="mt-6 space-y-4">
        {users.map((u) => (
          <div key={u.id} className="glass rounded-2xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{u.name}</h3>
                <p className="text-sm text-muted">
                  {u.university} · {u.course}
                </p>
              </div>
              <div className="text-right text-sm">
                <p className="text-dim">Waiting {u.waitingDurationHours}h</p>
                <p className="text-dim">
                  Last scan:{' '}
                  {u.lastScanAt ? new Date(u.lastScanAt).toLocaleString() : 'Never'}
                </p>
              </div>
            </div>
            {u.topCandidate ? (
              <p className="mt-3 text-sm text-emerald-400">
                Top candidate: {u.topCandidate.name} · {u.topCandidate.compatibilityScore}%
              </p>
            ) : (
              <p className="mt-3 text-sm text-dim">No candidate above 90% yet</p>
            )}
            <div className="mt-2 flex flex-wrap gap-1">
              {u.interests.slice(0, 5).map((i) => (
                <span
                  key={i.label}
                  className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-muted"
                >
                  {i.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
