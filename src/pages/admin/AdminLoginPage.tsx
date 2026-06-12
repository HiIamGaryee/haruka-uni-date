import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { api } from '../../lib/api'
import { Button } from '../../components/Button'

export function AdminLoginPage() {
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    localStorage.setItem('haruka_admin_key', key)
    try {
      await api.admin.verify()
      navigate('/admin-dash')
    } catch {
      localStorage.removeItem('haruka_admin_key')
      setError('Invalid admin key')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="glass-strong w-full max-w-md rounded-3xl p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent">
            <Lock className="size-5" />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted">Haruka Uni Date · Protected</p>
          </div>
        </div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-dim">
          Admin API Key
        </label>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent/40"
          placeholder="Enter ADMIN_API_KEY"
        />
        {error && <p className="mb-3 text-sm text-rose-400">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Verifying...' : 'Enter Dashboard'}
        </Button>
      </form>
    </div>
  )
}
