import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import { smartInsights } from '../../data/datePlanner'
import { easeOut } from '../../lib/motion'
import { PlannerCard } from './PlannerCard'

export function SmartInsights() {
  return (
    <PlannerCard delay={0.12}>
      <div className="border-b border-white/8 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400">
            <Lightbulb className="size-5" />
          </span>
          <h3 className="font-display text-xl font-bold">Smart AI Insights</h3>
        </div>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
        {smartInsights.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04, ease: easeOut }}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 card-hover"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-dim">
              {insight.label}
            </p>
            <p className="mt-1.5 font-display text-lg font-bold text-gradient-gold">
              {insight.value}
            </p>
          </motion.div>
        ))}
      </div>
    </PlannerCard>
  )
}
