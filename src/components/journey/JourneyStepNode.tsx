import { motion } from 'framer-motion'
import type { JourneyStep } from '../../data/journeyTimeline'
import { easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'
import { JourneyIcon } from './JourneyIcon'
import { JourneySparks } from './JourneySparks'

type JourneyStepNodeProps = {
  step: JourneyStep
  index: number
  active: boolean
  passed: boolean
  layout: 'horizontal' | 'vertical'
}

export function JourneyStepNode({
  step,
  index,
  active,
  passed,
  layout,
}: JourneyStepNodeProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center',
        layout === 'vertical' && 'flex-row gap-4',
      )}
    >
      <motion.div
        className="relative z-10"
        animate={{
          scale: active ? 1.18 : passed ? 1 : 0.92,
        }}
        transition={{ duration: 0.4, ease: easeOut }}
      >
        <JourneySparks active={active} seed={index * 7} />
        <motion.div
          className={cn(
            'relative flex size-12 items-center justify-center rounded-2xl border-2 sm:size-14',
            active
              ? 'border-accent bg-accent/20 text-accent-bright shadow-[0_0_32px_rgba(234,179,8,0.35)]'
              : passed
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                : 'border-white/12 bg-white/[0.04] text-dim',
          )}
          animate={active ? { y: [0, -4, 0] } : { y: 0 }}
          transition={{ duration: 0.5, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
        >
          <JourneyIcon icon={step.icon} className="size-5 sm:size-6" />
        </motion.div>
        <motion.span
          className={cn(
            'absolute -bottom-1 left-1/2 size-2.5 -translate-x-1/2 rounded-full border-2 border-[#0a0a0f]',
            active ? 'bg-accent' : passed ? 'bg-emerald-400' : 'bg-white/20',
          )}
          animate={active ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 1, repeat: active ? Infinity : 0 }}
        />
      </motion.div>
      <motion.p
        className={cn(
          'mt-3 text-center text-xs font-semibold sm:text-sm',
          layout === 'vertical' && 'mt-0 text-left',
          active ? 'text-accent-bright' : passed ? 'text-text' : 'text-dim',
        )}
        animate={{ scale: active ? 1.05 : 1 }}
      >
        {step.label}
      </motion.p>
    </div>
  )
}
