import { useEffect, useState } from 'react'
import { api, type AdminLog } from '../../lib/api'

export function AdminLogsPage() {
  const [logs, setLogs] = useState<AdminLog[]>([])

  useEffect(() => {
    api.admin.logs().then(setLogs).catch(console.error)
  }, [])

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">System Logs</h1>
      <p className="text-sm text-muted">Registrations, matches, bans, cron, errors</p>
      <div className="mt-6 space-y-2">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex flex-wrap items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm"
          >
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-dim">
              {log.type}
            </span>
            <span className="flex-1 text-muted">{log.message}</span>
            <span className="text-xs text-dim">{new Date(log.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
