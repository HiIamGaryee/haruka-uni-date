import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Heart,
  LogOut,
  MapPin,
  Sparkles,
  Utensils,
} from 'lucide-react'
import { Button } from '../../components/Button'
import { CosmicBackdrop } from '../../components/matching/CosmicBackdrop'
import { getInitials } from '../../data/students'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../lib/cn'

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    MATCHED:
      'border-emerald-400/40 bg-emerald-500/15 text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.25)]',
    WAITING_FOR_MATCH:
      'border-accent/40 bg-accent/15 text-accent-bright shadow-[0_0_20px_rgba(234,179,8,0.2)]',
    MATCHING:
      'border-violet-400/40 bg-violet-500/15 text-violet-200 shadow-[0_0_20px_rgba(167,139,250,0.25)]',
    INCOMPLETE_PROFILE:
      'border-amber-400/40 bg-amber-500/15 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.2)]',
  }
  const label = status.replace(/_/g, ' ')
  return (
    <span
      className={cn(
        'rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest',
        styles[status] ?? 'border-white/15 bg-white/5 text-muted',
      )}
    >
      {label}
    </span>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/[0.05] py-3 last:border-0">
      <p className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-white/35">
        {label}
      </p>
      <p className="text-right text-sm font-medium text-white/80">{value}</p>
    </div>
  )
}

export function ProfilePage() {
  const { user, match, logout } = useAuth()

  if (!user) return <Navigate to="/login" replace />

  const matchPath =
    match?.id && ['PLAN_GENERATED', 'REVEALED'].includes(match.status)
      ? `/match-result/${match.id}`
      : null

  const isMatched = user.status === 'MATCHED'

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <CosmicBackdrop />
      </div>

      <header className="relative border-b border-white/[0.05] bg-bg/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-4 sm:px-6">
          <div className="text-center sm:text-left">
            <p className="flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/35 sm:justify-start">
              <Sparkles className="size-3 text-accent/80" />
              your space
            </p>
            <h1 className="font-display text-xl font-bold sm:text-2xl">
              Hey, <span className="text-gradient-gold">{user.name.split(' ')[0]}</span>
            </h1>
          </div>
          <Button variant="secondary" size="sm" onClick={logout}>
            <LogOut className="size-3.5" />
            Logout
          </Button>
        </div>
      </header>

      <main className="relative mx-auto flex max-w-lg flex-col items-center px-4 py-8 sm:px-6 sm:py-12">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center text-xs leading-relaxed text-white/40"
        >
          Your private vibe card — only you can see this. Haruka reveals one match when ready.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className={cn(
            'compat-profile-card relative w-full overflow-hidden rounded-[24px] border p-6 sm:p-8',
            isMatched
              ? 'border-emerald-500/20 shadow-[0_0_48px_rgba(52,211,153,0.1)]'
              : 'border-white/[0.08]',
          )}
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-[22px] bg-gradient-to-br from-amber-400/40 via-rose-400/30 to-violet-500/40 blur-md"
                aria-hidden
              />
              <div className="relative flex size-20 items-center justify-center rounded-[20px] bg-gradient-to-br from-violet-600 to-rose-500 text-xl font-bold text-white shadow-lg">
                {getInitials(user.name)}
              </div>
            </div>

            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
              {user.name}
            </h2>
            <p className="mt-1 text-sm text-white/40">{user.email}</p>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-white/50">
              <GraduationCap className="size-3.5 text-accent/70" />
              {user.university}
            </p>

            <div className="mt-4">
              <StatusBadge status={user.status} />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-1">
            <InfoRow label="Course" value={user.course} />
            {user.gender && (
              <InfoRow label="Gender" value={user.gender.replace(/_/g, ' ')} />
            )}
            {user.cgpa && <InfoRow label="CGPA" value={user.cgpa} />}
            <InfoRow label="Budget" value={user.budgetPreference} />
            {user.languages && user.languages.length > 0 && (
              <InfoRow label="Languages" value={user.languages.join(' · ')} />
            )}
            {user.outdoorPerson && <InfoRow label="Outdoor" value={user.outdoorPerson} />}
            {user.allergies && <InfoRow label="Allergies" value={user.allergies} />}
            <InfoRow label="Personality" value={user.personalityType} />
            <InfoRow label="Dating goal" value={user.datingGoal} />
            <InfoRow label="Food vibe" value={user.foodPreference} />
          </div>

          {user.interests.length > 0 && (
            <div className="mt-6 text-center">
              <p className="mb-3 flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/35">
                <Heart className="size-3 text-rose-400/70" />
                Interests
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {user.interests.map((i) => (
                  <span
                    key={i.label}
                    className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/60"
                  >
                    {i.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.06] pt-6">
            {!user.profileComplete && (
              <Button to="/create-profile" className="w-full">
                Complete profile
              </Button>
            )}
            {user.profileComplete && user.status === 'WAITING_FOR_MATCH' && (
              <Button to="/match" className="w-full glow-accent">
                Find my match
              </Button>
            )}
            {matchPath && (
              <Button to={matchPath} className="w-full glow-accent">
                View match result
              </Button>
            )}
            {user.profileComplete && (
              <Button to="/create-profile" variant="secondary" className="w-full">
                Edit profile
              </Button>
            )}
          </div>
        </motion.div>

        {user.status === 'WAITING_FOR_MATCH' && !matchPath && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-6 w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-center text-sm text-white/45"
          >
            <MapPin className="mb-1 inline size-3.5 text-violet-300/70" />
            Still in the waiting pool — Haruka scans for 90%+ same-uni matches.
          </motion.p>
        )}

        {isMatched && matchPath && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-emerald-300/80"
          >
            <Utensils className="size-4" />
            You&apos;ve got a match — date plan is waiting.
          </motion.p>
        )}
      </main>
    </div>
  )
}
