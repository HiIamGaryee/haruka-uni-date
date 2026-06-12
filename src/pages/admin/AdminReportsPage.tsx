import { useEffect, useState } from 'react'
import { api, type AdminReport } from '../../lib/api'
import { Button } from '../../components/Button'

export function AdminReportsPage() {
  const [reports, setReports] = useState<AdminReport[]>([])

  async function load() {
    setReports(await api.admin.reports())
  }

  useEffect(() => {
    const t = setTimeout(() => {
      load().catch(console.error)
    }, 0)
    return () => clearTimeout(t)
  }, [])

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Reports</h1>
      <p className="text-sm text-muted">User safety reports</p>
      <div className="mt-6 space-y-4">
        {reports.map((r) => (
          <div key={r.id} className="glass rounded-2xl p-5">
            <div className="flex flex-wrap justify-between gap-2">
              <p className="font-semibold">
                {r.reported.name}{' '}
                <span className="text-dim font-normal">reported by {r.reporter.name}</span>
              </p>
              <span className="rounded-full border border-rose-500/30 px-2 py-0.5 text-xs text-rose-300">
                {r.severity}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">{r.reason}</p>
            <p className="mt-1 text-xs text-dim">{new Date(r.createdAt).toLocaleString()}</p>
            {r.status === 'PENDING' && (
              <div className="mt-3 flex flex-wrap gap-2">
                {(['WARN', 'SUSPEND', 'BAN', 'DISMISS'] as const).map((action) => (
                  <Button
                    key={action}
                    size="sm"
                    variant="secondary"
                    onClick={() => api.admin.resolveReport(r.id, action).then(load)}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
