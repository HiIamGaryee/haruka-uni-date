import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Shield, Sparkles } from 'lucide-react'
import { Button } from '../../components/Button'
import { matchAnimationSteps } from '../../data/matchFlow'
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../lib/api'
export function MatchPage() {
  const { user, match, refresh } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState<'running' | 'waiting' | 'redirect'>('running')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user?.profileComplete) return

    let cancelled = false
    const stepTimer = setInterval(() => {
      setStep((s) => Math.min(s + 1, matchAnimationSteps.length - 1))
    }, 1400)

    async function run() {
      try {
        const [result] = await Promise.all([
          api.match.run(),
          new Promise((r) => setTimeout(r, matchAnimationSteps.length * 1400)),
        ])
        if (cancelled) return
        await refresh()
        if (result.matched && result.match?.id) {
          setPhase('redirect')
          navigate(`/match-result/${result.match.id}`, { replace: true })
          return
        }
        setPhase('waiting')
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Matching failed')
          setPhase('waiting')
        }
      }
    }

    run()
    return () => {
      cancelled = true
      clearInterval(stepTimer)
    }
  }, [user?.profileComplete, refresh, navigate])

  if (!user) return <Navigate to="/login" replace />
  if (!user.profileComplete) return <Navigate to="/create-profile" replace />
  if (match?.id && ['PLAN_GENERATED', 'REVEALED'].includes(match.status)) {
    return <Navigate to={`/match-result/${match.id}`} replace />
  }
  if (user.status === 'MATCHED' && match?.id) {
    return <Navigate to={`/match-result/${match.id}`} replace />
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.18),_transparent_55%)]" />
      <div className="section-container relative flex min-h-screen flex-col items-center justify-center py-16">
        <div className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-muted">
          <Lock className="size-3.5 text-accent" />
          Privacy-first matching · No profile browsing
        </div>

        {phase === 'running' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg text-center"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
              haruka.match.engine
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Finding your{' '}
              <span className="text-gradient-spectrum">campus soulmate</span>
            </h1>
            <p className="mt-3 text-sm text-muted">
              The AI is scanning the waiting pool. You will only see your match if compatibility
              reaches 90%+.
            </p>

            <div className="mt-10 space-y-3 text-left">
              <AnimatePresence mode="popLayout">
                {matchAnimationSteps.map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{
                      opacity: i <= step ? 1 : 0.25,
                      x: 0,
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                  >
                    <span
                      className={`flex size-8 items-center justify-center rounded-xl text-xs font-bold ${
                        i <= step
                          ? 'bg-accent/20 text-accent-bright'
                          : 'bg-white/5 text-dim'
                      }`}
                    >
                      {i < step ? '✓' : i + 1}
                    </span>
                    <span className={i <= step ? 'text-sm' : 'text-sm text-dim'}>{label}</span>
                    {i === step && (
                      <motion.span
                        className="ml-auto size-2 rounded-full bg-accent"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-8 rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-dim">
                Your profile (only you can see this)
              </p>
              <p className="mt-2 font-semibold">{user.name}</p>
              <p className="text-sm text-muted">
                {user.university} · {user.course}
              </p>
            </div>
          </motion.div>
        )}

        {phase === 'waiting' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md text-center"
          >
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
              <Shield className="size-7" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold">No strong match yet</h2>
            <p className="mt-3 text-sm text-muted">
              Your profile is safely stored in the waiting pool. Haruka scans every 30 minutes for
              90%+ compatibility. No one can browse your profile.
            </p>
            {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button to="/profile">Update profile</Button>
              <Button to="/profile" variant="secondary">
                Return later
              </Button>
            </div>
            <p className="mt-6 text-xs text-dim">
              <Link to="/" className="text-accent hover:underline">
                Back to home
              </Link>
            </p>
          </motion.div>
        )}

        {phase === 'redirect' && (
          <div className="flex flex-col items-center gap-3 text-center">
            <Sparkles className="size-8 text-accent animate-pulse" />
            <p className="text-muted">Match found. Preparing your reveal...</p>
          </div>
        )}
      </div>
    </div>
  )
}
