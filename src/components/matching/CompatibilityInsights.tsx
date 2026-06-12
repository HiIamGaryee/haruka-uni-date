import { motion } from 'framer-motion'
import { Sparkles, Heart, Users, TrendingUp } from 'lucide-react'
import { compatibilityInsights } from '../../data/matchingAnimation'

const insightIcons = [Sparkles, Heart, TrendingUp, Users] as const

type CompatibilityInsightsProps = {
  active: boolean
}

export function CompatibilityInsights({ active }: CompatibilityInsightsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="compat-insights-card rounded-[24px] border border-white/[0.07] p-5 sm:p-6"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
        Compatibility Insights
      </p>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {compatibilityInsights.map((insight, i) => {
          const Icon = insightIcons[i % insightIcons.length]
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
              transition={{ delay: 0.35 + i * 0.08, duration: 0.45 }}
              className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-3 backdrop-blur-sm"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-emerald-500/15 bg-emerald-500/[0.08] text-emerald-300/80">
                <Icon className="size-3.5" strokeWidth={1.75} />
              </span>
              <span className="text-sm text-white/65">{insight.text}</span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
