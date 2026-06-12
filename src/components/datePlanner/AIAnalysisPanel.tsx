import { motion } from 'framer-motion'
import { Brain, Sparkles } from 'lucide-react'
import { analysisMetrics, datePlannerContent } from '../../data/datePlanner'
import type { AnalysisMetric } from '../../data/datePlanner'
import { easeOut } from '../../lib/motion'
import { useTypewriter } from '../../hooks/useTypewriter'
import { PlannerCard } from './PlannerCard'
import { cn } from '../../lib/cn'

const badgeTone: Record<NonNullable<AnalysisMetric['badgeTone']>, string> = {
  high: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  low: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  neutral: 'border-violet-500/30 bg-violet-500/10 text-violet-300',
  excellent: 'border-accent/30 bg-accent/10 text-accent-bright',
}

function RadialScore({ percent }: { percent: number }) {
  return (
    <div className="relative mx-auto flex size-32 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="url(#plannerRadial)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={264}
          initial={{ strokeDashoffset: 264 }}
          whileInView={{ strokeDashoffset: 264 - (264 * percent) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: easeOut }}
        />
        <defs>
          <linearGradient id="plannerRadial" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-display text-3xl font-bold text-gradient-spectrum">{percent}%</span>
    </div>
  )
}

function MetricRow({ metric, index }: { metric: AnalysisMetric; index: number }) {
  if (metric.type === 'radial' && metric.percent) {
    return (
      <div className="mb-4 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dim">
          {metric.label}
        </p>
        <RadialScore percent={metric.percent} />
      </div>
    )
  }

  if (metric.type === 'bar' && metric.percent) {
    return (
      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
        <div className="mb-2 flex justify-between text-xs">
          <span className="text-muted">{metric.label}</span>
          <span className="font-mono font-semibold">{metric.value}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${metric.percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.05, ease: easeOut }}
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
      <span className="text-xs text-muted">{metric.label}</span>
      <span
        className={cn(
          'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
          metric.badgeTone ? badgeTone[metric.badgeTone] : badgeTone.neutral,
        )}
      >
        {metric.value}
      </span>
    </div>
  )
}

export function AIAnalysisPanel() {
  const { displayed, done } = useTypewriter(datePlannerContent.aiGenerating, 18, 300)

  const radial = analysisMetrics.find((m) => m.type === 'radial')
  const bars = analysisMetrics.filter((m) => m.type === 'bar')
  const badges = analysisMetrics.filter((m) => m.type === 'badge')

  return (
    <PlannerCard delay={0.1} glow className="h-full">
      <div className="border-b border-white/8 bg-gradient-to-r from-violet-500/10 via-transparent to-blue-500/10 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">
            <Brain className="size-5" />
          </span>
          <div>
            <p className="font-mono text-[10px] text-dim">ai.analysis</p>
            <h3 className="font-display text-lg font-bold">AI Match Intelligence</h3>
          </div>
        </div>
        <p className="mt-3 min-h-[2.5rem] font-mono text-xs leading-relaxed text-muted">
          {displayed}
          {!done && <span className="animate-pulse text-accent">|</span>}
        </p>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        {radial && <MetricRow metric={radial} index={0} />}

        <div className="grid gap-2 sm:grid-cols-2">
          {badges.map((metric, i) => (
            <MetricRow key={metric.id} metric={metric} index={i + 1} />
          ))}
        </div>

        {bars.map((metric, i) => (
          <MetricRow key={metric.id} metric={metric} index={i + badges.length} />
        ))}

        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-accent">
            <Sparkles className="size-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              {datePlannerContent.whyMatchTitle}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted">{datePlannerContent.whyMatchBody}</p>
        </div>
      </div>
    </PlannerCard>
  )
}
