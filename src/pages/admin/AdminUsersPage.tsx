import { useEffect, useState } from 'react'
import { api, type AdminUser } from '../../lib/api'
import { Button } from '../../components/Button'

export function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [search, setSearch] = useState('')

  async function load() {
    const data = await api.admin.users({ search: search || undefined })
    setUsers(data)
  }

  useEffect(() => {
    const t = setTimeout(() => {
      load().catch(console.error)
    }, 0)
    return () => clearTimeout(t)
  }, [])

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Users</h1>
          <p className="text-sm text-muted">Manage student profiles</p>
        </div>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or university"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
          />
          <Button variant="secondary" size="sm" onClick={load}>
            Search
          </Button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-white/8 bg-white/[0.03] text-xs uppercase tracking-widest text-dim">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">University</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Personality</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3">{u.age}</td>
                <td className="px-4 py-3">{u.gender}</td>
                <td className="px-4 py-3">{u.university}</td>
                <td className="px-4 py-3">{u.course}</td>
                <td className="px-4 py-3">{u.personalityType}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-dim">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => api.admin.ban(u.id, 'Admin ban').then(load)}
                    >
                      Ban
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => api.admin.delete(u.id).then(load)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
