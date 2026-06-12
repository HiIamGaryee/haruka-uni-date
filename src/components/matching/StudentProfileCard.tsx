import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import type { DnaStudent } from '../../data/matchingAnimation'
import { cn } from '../../lib/cn'

type StudentProfileCardProps = {
  student: DnaStudent
  align?: 'left' | 'right'
  active?: boolean
  delay?: number
}

export function StudentProfileCard({
  student,
  align = 'left',
  active = true,
  delay = 0,
}: StudentProfileCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: active ? 1 : 0.4, y: active ? 0 : 8 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'compat-profile-card group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/[0.08] p-5 sm:p-6',
        align === 'right' && 'text-right',
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute -inset-px rounded-[24px] opacity-60 transition-opacity group-hover:opacity-100',
          align === 'left'
            ? 'bg-gradient-to-br from-violet-500/10 via-transparent to-transparent'
            : 'bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent',
        )}
        aria-hidden
      />

      <div
        className={cn(
          'relative flex items-start gap-4',
          align === 'right' && 'flex-row-reverse',
        )}
      >
        <div className="relative shrink-0">
          <div
            className={cn(
              'absolute -inset-1 rounded-[18px] bg-gradient-to-br opacity-50 blur-md',
              student.accent,
            )}
            aria-hidden
          />
          <div
            className={cn(
              'relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-base font-bold text-white shadow-lg',
              student.accent,
            )}
          >
            {student.initials}
          </div>
        </div>

        <div className={cn('min-w-0 flex-1', align === 'right' && 'items-end')}>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
            {student.label}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-white/95">
            {student.name}
          </h3>
          <p
            className={cn(
              'mt-1.5 flex items-center gap-1.5 text-xs text-white/45',
              align === 'right' && 'justify-end',
            )}
          >
            <GraduationCap className="size-3.5 shrink-0" />
            <span className="truncate">{student.university}</span>
          </p>
          <p className="mt-0.5 text-xs font-medium text-white/55">{student.course}</p>
        </div>
      </div>

      <p
        className={cn(
          'relative mt-4 text-sm leading-relaxed text-white/45',
          align === 'right' && 'text-right',
        )}
      >
        {student.bio}
      </p>

      <div className={cn('relative mt-5', align === 'right' && 'flex justify-end')}>
        <p className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
          Interests
        </p>
        <div
          className={cn(
            'flex flex-wrap gap-1.5',
            align === 'right' && 'justify-end',
          )}
        >
          {student.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/60 backdrop-blur-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
