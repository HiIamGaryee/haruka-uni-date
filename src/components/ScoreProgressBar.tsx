import { motion } from 'framer-motion'
import { easeOut } from '../lib/motion'
import { cn } from '../lib/cn'

type Accent = 'gold' | 'emerald' | 'blue' | 'violet' | 'cyan'

const accentFill: Record<Accent, string> = {
  gold: 'bg-gradient-to-r from-amber-400 via-accent to-amber-500',
  emerald: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
  blue: 'bg-gradient-to-r from-blue-500 to-cyan-400',
  violet: 'bg-gradient-to-r from-violet-500 to-purple-400',
  cyan: 'bg-gradient-to-r from-cyan-500 to-blue-400',
}

type ScoreProgressBarProps = {
  label: string
  value: number
  accent?: Accent
  delay?: number
  large?: boolean
}

export function ScoreProgressBar({
  label,
  value,
  accent = 'emerald',
  delay = 0,
  large = false,
}: ScoreProgressBarProps) {
  return (
    <div className={large ? 'space-y-2' : 'space-y-1.5'}>
      <div className="flex items-center justify-between gap-3">
        <span className={cn('font-medium text-muted', large ? 'text-sm' : 'text-xs')}>
          {label}
        </span>
        <span
          className={cn(
            'font-mono font-semibold tabular-nums text-text',
            large ? 'text-sm' : 'text-xs',
          )}
        >
          {value}%
        </span>
      </div>
      <div
        className={cn(
          'overflow-hidden rounded-full bg-white/8',
          large ? 'h-2' : 'h-1.5',
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay, ease: easeOut }}
          className={cn('h-full rounded-full', accentFill[accent])}
        />
      </div>
    </div>
  )
}
