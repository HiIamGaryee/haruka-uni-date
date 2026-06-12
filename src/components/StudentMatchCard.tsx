import { motion } from 'framer-motion'
import { Ban, GraduationCap, Shield, Sparkles, User } from 'lucide-react'
import type { Student } from '../data/students'
import { compatibilityBreakdown, getInitials } from '../data/students'
import type { DemoMatchCandidate } from '../lib/demoCompatibility'
import { easeOut } from '../lib/motion'
import { Button } from './Button'
import { cn } from '../lib/cn'

type StudentMatchCardProps = {
  student: Student
  index: number
  demoMatch?: DemoMatchCandidate
  selected?: boolean
  onSelect?: () => void
}

export function StudentMatchCard({
  student,
  index,
  demoMatch,
  selected = false,
  onSelect,
}: StudentMatchCardProps) {
  const score = demoMatch?.breakdown.total ?? student.matchScore
  const isDemo = Boolean(demoMatch)
  const eligible = demoMatch?.eligible ?? true
  const breakdownSource = demoMatch?.breakdown

  const barValues = compatibilityBreakdown.map((item) => {
    if (!breakdownSource) return student[item.key]
    const map: Record<string, number> = {
      campusScore: breakdownSource.university,
      interestScore: breakdownSource.sharedInterests,
      lifestyleScore: breakdownSource.lifestyle,
      datePlanScore: breakdownSource.datingGoals,
    }
    return map[item.key] ?? student[item.key]
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: easeOut }}
      whileHover={eligible ? { y: -5, transition: { duration: 0.25 } } : undefined}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-b from-white/[0.06] to-white/[0.02]',
        selected
          ? 'border-accent/40 shadow-[0_0_32px_rgba(234,179,8,0.12)]'
          : 'border-white/10 card-hover',
        !eligible && isDemo && 'opacity-75',
      )}
    >
      <div className="border-b border-white/8 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-bold text-white shadow-lg',
                student.accent,
              )}
            >
              {getInitials(student.name)}
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-lg font-bold leading-tight">{student.name}</h3>
              <p className="text-xs text-muted">Age {student.age}</p>
            </div>
          </div>
          <span
            className={cn(
              'shrink-0 rounded-full border px-2.5 py-1 font-display text-sm font-bold',
              eligible
                ? 'border-accent/30 bg-accent/10 text-accent'
                : 'border-white/15 bg-white/5 text-dim',
            )}
          >
            {score}%
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-medium text-blue-300">
            <GraduationCap className="size-3" />
            {student.university}
          </span>
          {isDemo && demoMatch && (
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-medium',
                eligible
                  ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300'
                  : 'border-rose-500/25 bg-rose-500/10 text-rose-300',
              )}
            >
              {eligible ? (
                <>
                  <Sparkles className="size-3" />
                  Eligible
                </>
              ) : (
                <>
                  <Ban className="size-3" />
                  Below 90%
                </>
              )}
            </span>
          )}
        </div>

        {demoMatch?.reason && (
          <p className="mt-2 text-[11px] leading-relaxed text-dim">{demoMatch.reason}</p>
        )}

        <p className="mt-3 text-sm text-muted">
          {student.course} · {student.year}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-dim">
              Personality
            </p>
            <p className="mt-0.5 text-xs font-medium">{student.personalityType}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-dim">
              Dating Goal
            </p>
            <p className="mt-0.5 text-xs font-medium">{student.datingGoal}</p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-dim">
            Interests
          </p>
          <div className="flex flex-wrap gap-1.5">
            {student.interests.map((interest) => {
              const shared = demoMatch?.sharedInterests.some(
                (s) => s.toLowerCase() === interest.toLowerCase(),
              )
              return (
                <span
                  key={interest}
                  className={cn(
                    'rounded-full border px-2.5 py-0.5 text-[10px] font-medium',
                    shared
                      ? 'border-accent/30 bg-accent/10 text-accent-bright'
                      : 'border-white/10 bg-white/[0.04] text-muted',
                  )}
                >
                  {interest}
                </span>
              )
            })}
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-dim">
            Compatibility
          </p>
          <div className="space-y-2">
            {compatibilityBreakdown.map((item, i) => {
              const value = barValues[i]
              return (
                <div key={item.key}>
                  <div className="mb-1 flex justify-between text-[10px]">
                    <span className="text-dim">{item.label}</span>
                    <span className="font-mono font-medium text-muted">{value}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: easeOut }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl border border-accent/20 bg-accent/5 p-3.5">
          <div className="mb-1.5 flex items-center gap-1.5 text-accent">
            <Sparkles className="size-3.5" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">AI Reason</span>
          </div>
          <p className="text-xs leading-relaxed text-muted">{student.aiReason}</p>
        </div>

        <div className="space-y-1.5 text-xs text-muted">
          <p className="flex items-start gap-2">
            <Shield className="mt-0.5 size-3.5 shrink-0 text-emerald-400" />
            <span>{student.safetyPreference}</span>
          </p>
          <p>
            <span className="text-dim">Budget:</span> {student.budgetRange}
          </p>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2 border-t border-white/8 p-5 sm:flex-row sm:p-6">
        {isDemo && onSelect ? (
          <Button
            variant={selected ? 'primary' : 'secondary'}
            className="flex-1 text-xs sm:text-sm"
            onClick={onSelect}
            disabled={!eligible}
          >
            {selected ? 'Selected in dashboard' : eligible ? 'Preview in dashboard' : 'Not eligible'}
          </Button>
        ) : (
          <>
            <Button to="/demo" variant="primary" className="flex-1 text-xs sm:text-sm">
              Generate Date Plan
            </Button>
            <Button to="/demo" variant="secondary" className="flex-1 text-xs sm:text-sm">
              <User className="size-3.5" />
              View Profile
            </Button>
          </>
        )}
      </div>
    </motion.article>
  )
}
