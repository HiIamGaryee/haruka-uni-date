import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { getMemberHomePath } from '../../lib/memberRoutes'
import { useAuth } from '../../hooks/useAuth'
import { AuthLayout } from './AuthLayout'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('haruka@sunway.edu')
  const [password, setPassword] = useState('demo1234')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { user, match } = await login(email, password)
      navigate(getMemberHomePath(user, match))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Demo login — no backend needed. Just click Log in."
      footer={
        <>
          No account?{' '}
          <Link to="/register" className="text-accent-bright hover:underline">
            Register
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-dim">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent/40"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-dim">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent/40"
          />
        </div>
        <p className="text-xs text-dim">
          Demo: haruka@sunway.edu or kai@sunway.edu / demo1234 (same-uni match)
        </p>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
    </AuthLayout>
  )
}
