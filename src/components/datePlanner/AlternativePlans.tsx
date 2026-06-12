import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { dateTabs } from '../../data/datePlanner'
import { easeOut } from '../../lib/motion'
import { PlannerCard } from './PlannerCard'
import { cn } from '../../lib/cn'

export function AlternativePlans() {
  const [active, setActive] = useState(dateTabs[0].id)
  const current = dateTabs.find((t) => t.id === active) ?? dateTabs[0]

  return (
    <PlannerCard delay={0.2}>
      <div className="border-b border-white/8 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
            <Layers className="size-5" />
          </span>
          <h3 className="font-display text-xl font-bold">Alternative Plans</h3>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {dateTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
                active === tab.id
                  ? 'border-accent/40 bg-accent/15 text-accent-bright shadow-[0_0_24px_rgba(234,179,8,0.12)]'
                  : 'border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-text',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative min-h-[100px] p-5 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-transparent to-violet-500/5 p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              {current.label}
            </p>
            <p className="mt-2 font-display text-2xl font-bold">{current.plan}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </PlannerCard>
  )
}
