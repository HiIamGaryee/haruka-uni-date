import { motion } from 'framer-motion'
import { SlidersHorizontal, Sparkles, Target, UserPlus } from 'lucide-react'
import type { DemoStep } from '../data/demoFlow'
import { easeOut } from '../lib/motion'
import { DemoFlowMockUI } from './DemoFlowMockUI'
import { cn } from '../lib/cn'

const iconMap = {
  userPlus: UserPlus,
  sliders: SlidersHorizontal,
  target: Target,
  sparkles: Sparkles,
} as const

const accentStyles = [
  {
    icon: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400',
    glow: 'from-emerald-500/30',
  },
  {
    icon: 'from-violet-500/20 to-violet-500/5 text-violet-400',
    glow: 'from-violet-500/30',
  },
  {
    icon: 'from-blue-500/20 to-blue-500/5 text-blue-400',
    glow: 'from-blue-500/30',
  },
  {
    icon: 'from-amber-500/20 to-amber-500/5 text-amber-400',
    glow: 'from-amber-500/30',
  },
] as const

type DemoFlowStepCardProps = {
  step: DemoStep
  index: number
  isLast?: boolean
}

export function DemoFlowStepCard({ step, index, isLast = false }: DemoFlowStepCardProps) {
  const Icon = iconMap[step.icon]
  const accent = accentStyles[index % accentStyles.length]

  return (
    <div className="relative flex flex-col">
      {!isLast && (
        <div
          className="pointer-events-none absolute left-1/2 top-full z-0 hidden h-6 w-px -translate-x-1/2 bg-gradient-to-b from-white/20 to-transparent lg:hidden"
          aria-hidden
        />
      )}

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: easeOut }}
        whileHover={{ y: -5, transition: { duration: 0.25 } }}
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10',
          'bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 backdrop-blur-sm sm:p-6',
          'card-hover',
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br to-transparent opacity-60 blur-2xl transition-opacity group-hover:opacity-100',
            accent.glow,
          )}
        />

        <div className="relative flex items-start justify-between gap-3">
          <span className="font-mono text-xs font-bold text-accent">{step.step}</span>
          <span
            className={cn(
              'flex size-10 items-center justify-center rounded-xl bg-gradient-to-br',
              accent.icon,
            )}
          >
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
        </div>

        <h3 className="relative mt-4 font-display text-lg font-bold leading-snug sm:text-xl">
          {step.title}
        </h3>
        <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted">
          {step.description}
        </p>

        <DemoFlowMockUI mock={step.mock} />
      </motion.article>
    </div>
  )
}
