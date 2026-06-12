import { AnimatePresence, motion } from 'framer-motion'
import type { JourneyStep } from '../../data/journeyTimeline'
import { easeOut } from '../../lib/motion'
import { JourneyMetricBars } from './JourneyMetricBars'
import { JourneyIcon } from './JourneyIcon'

type JourneyStepCardProps = {
  step: JourneyStep
  stepIndex: number
  active: boolean
}

export function JourneyStepCard({ step, stepIndex, active }: JourneyStepCardProps) {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="journey-card mx-auto mt-8 max-w-lg rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:mt-10 sm:p-6"
        >
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent">
              <JourneyIcon icon={step.icon} className="size-5" />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-dim">
                Stage {stepIndex + 1} of 5
              </p>
              <h3 className="mt-1 font-display text-xl font-bold">{step.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          </div>
          <div className="mt-5 border-t border-white/8 pt-5">
            <JourneyMetricBars step={step} active={active} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
