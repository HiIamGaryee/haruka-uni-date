import { motion } from 'framer-motion'
import { CalendarClock } from 'lucide-react'
import { timeline } from '../../data/datePlanner'
import { easeOut } from '../../lib/motion'
import { PlannerCard } from './PlannerCard'
import { cn } from '../../lib/cn'

export function DateTimelinePanel() {
  return (
    <PlannerCard delay={0.15} className="h-full">
      <div className="border-b border-white/8 bg-white/[0.02] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
            <CalendarClock className="size-5" />
          </span>
          <div>
            <p className="font-mono text-[10px] text-dim">timeline.generated</p>
            <h3 className="font-display text-lg font-bold">AI Generated Timeline</h3>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="relative space-y-0">
          {timeline.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: easeOut }}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              {i < timeline.length - 1 && (
                <div
                  className="absolute left-[11px] top-6 h-[calc(100%-8px)] w-px bg-gradient-to-b from-blue-500/50 to-transparent"
                  aria-hidden
                />
              )}
              <div className="relative z-10 mt-1 flex size-6 shrink-0 items-center justify-center">
                <span
                  className={cn(
                    'size-3 rounded-full border-2',
                    i === 0
                      ? 'border-accent bg-accent shadow-[0_0_12px_rgba(234,179,8,0.5)]'
                      : 'border-blue-400/60 bg-blue-500/20',
                  )}
                />
              </div>
              <div className="min-w-0 flex-1 rounded-2xl border border-white/8 bg-white/[0.03] p-3.5 transition-colors hover:border-white/15 hover:bg-white/[0.05]">
                <p className="font-mono text-xs font-semibold text-accent">{event.time}</p>
                <p className="mt-1 text-sm font-semibold">{event.title}</p>
                {event.description && (
                  <p className="mt-1 text-xs leading-relaxed text-muted">{event.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PlannerCard>
  )
}
