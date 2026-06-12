import { ShieldCheck } from 'lucide-react'
import { datePlannerContent, safetyMetrics } from '../../data/datePlanner'
import { PlannerCard } from './PlannerCard'
import { cn } from '../../lib/cn'

const toneStyles = {
  safe: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  good: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
  excellent: 'border-emerald-400/35 bg-emerald-400/12 text-emerald-300',
  low: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  neutral: 'border-white/15 bg-white/5 text-muted',
} as const

export function SafetyLayer() {
  return (
    <PlannerCard delay={0.15} glow>
      <div className="border-b border-white/8 bg-gradient-to-r from-emerald-500/10 to-transparent px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold">Safety Confidence</h3>
            <p className="text-xs text-muted">AI-verified meetup environment</p>
          </div>
        </div>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
        {safetyMetrics.map((metric) => (
          <div
            key={metric.id}
            className="flex flex-col gap-2 rounded-2xl border border-white/8 bg-white/[0.03] p-3.5"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-dim">
              {metric.label}
            </p>
            <span
              className={cn(
                'w-fit rounded-full border px-2.5 py-0.5 text-xs font-semibold',
                toneStyles[metric.tone],
              )}
            >
              {metric.value}
            </span>
          </div>
        ))}
      </div>
      <p className="border-t border-white/8 px-5 py-4 text-sm text-muted sm:px-6">
        {datePlannerContent.safetyNote}
      </p>
    </PlannerCard>
  )
}
