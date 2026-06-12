import { motion } from 'framer-motion'
import { GraduationCap, Sparkles, Target, Zap } from 'lucide-react'
import { previewMatch, type PreviewMatchData } from '../../data/previewDashboard'
import { DashboardProgressBar } from './DashboardProgressBar'
import { cn } from '../../lib/cn'

const metricIcons = {
  graduation: GraduationCap,
  sparkles: Sparkles,
  zap: Zap,
} as const

const metricBadgeStyles = [
  'border-emerald-500/25 bg-emerald-500/10 text-emerald-400',
  'border-violet-500/25 bg-violet-500/10 text-violet-400',
  'border-blue-500/25 bg-blue-500/10 text-blue-400',
] as const

type DashboardMatchCardProps = {
  match?: PreviewMatchData
}

export function DashboardMatchCard({ match = previewMatch }: DashboardMatchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.08 }}
      className="dash-card dash-card-hover relative flex h-full flex-col overflow-hidden p-5 sm:p-6"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 size-32 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mb-5 flex items-center justify-between">
        <span className="dash-label">
          {match.partnerName ? `vs ${match.partnerName.split(' ')[0]}` : 'Match Score'}
        </span>
        <span className="flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
          <Target className="size-3.5" />
        </span>
      </div>

      <div className="relative mb-6 text-center">
        <div className="relative mx-auto mb-3 flex size-28 items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#matchGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={264}
              initial={{ strokeDashoffset: 264 }}
              whileInView={{
                strokeDashoffset: 264 - (264 * match.compatibility) / 100,
              }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="50%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>
          <div>
            <p className="font-display text-3xl font-bold text-gradient-spectrum">
              {match.compatibility}%
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-dim">
              Compatibility
            </p>
          </div>
        </div>
      </div>

      <div className="relative mb-5 grid gap-2">
        {match.metrics.map((metric, i) => {
          const Icon = metricIcons[metric.icon]
          return (
            <div
              key={metric.key}
              className={cn(
                'flex items-center justify-between rounded-xl border px-3 py-2.5',
                metricBadgeStyles[i],
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className="size-3.5 shrink-0" />
                <span className="text-[11px] font-medium opacity-80">{metric.label}</span>
              </div>
              <span className="text-xs font-semibold">{metric.value}</span>
            </div>
          )
        })}
      </div>

      <div className="relative mt-auto space-y-3 border-t border-white/8 pt-5">
        <p className="dash-label">Signal breakdown</p>
        {match.signalBars.map((bar, i) => (
          <DashboardProgressBar
            key={bar.label}
            label={bar.label}
            value={bar.value}
            accent={bar.accent}
            delay={0.15 + i * 0.06}
          />
        ))}
      </div>
    </motion.div>
  )
}
