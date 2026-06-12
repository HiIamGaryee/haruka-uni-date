import { motion } from 'framer-motion'
import type { JourneyStep } from '../../data/journeyTimeline'
import { easeOut } from '../../lib/motion'

const metrics = [
  { key: 'moodLevel' as const, label: 'Mood', color: 'from-rose-400 to-pink-500' },
  { key: 'energyLevel' as const, label: 'Energy', color: 'from-amber-400 to-orange-500' },
  {
    key: 'conversationConfidence' as const,
    label: 'Conversation',
    color: 'from-emerald-400 to-teal-500',
  },
]

type JourneyMetricBarsProps = {
  step: JourneyStep
  active: boolean
}

export function JourneyMetricBars({ step, active }: JourneyMetricBarsProps) {
  return (
    <div className="space-y-3">
      {metrics.map((metric, i) => (
        <div key={metric.key}>
          <div className="mb-1 flex justify-between text-[11px]">
            <span className="text-dim">{metric.label}</span>
            <span className="font-mono text-muted">{step[metric.key]}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
              initial={{ width: 0 }}
              animate={{ width: active ? `${step[metric.key]}%` : '0%' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: easeOut }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
