import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { MALAYSIA_UNIVERSITIES } from '../../data/malaysiaUniversities'
import { useAuth } from '../../hooks/useAuth'
import { AuthLayout } from './AuthLayout'

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent/40'

export function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [university, setUniversity] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!university) {
      setError('Please select your university')
      return
    }
    setLoading(true)
    setError('')
    try {
      localStorage.setItem('haruka_signup_uni', university)
      await signup(email, password, name)
      navigate('/create-profile')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Pick your university first — Haruka only matches students from the same campus."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-accent-bright hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-dim">
            University
          </label>
          <select
            required
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className={inputClass}
          >
            <option value="">Select your university</option>
            {MALAYSIA_UNIVERSITIES.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-dim">
            Name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-dim">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-dim">
            Password
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign up'}
        </Button>
      </form>
    </AuthLayout>
  )
}
