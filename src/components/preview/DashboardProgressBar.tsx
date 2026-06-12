import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

type Accent = 'emerald' | 'blue' | 'purple'

const accentFill: Record<Accent, string> = {
  emerald: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
  blue: 'bg-gradient-to-r from-blue-500 to-cyan-400',
  purple: 'bg-gradient-to-r from-violet-500 to-purple-400',
}

type DashboardProgressBarProps = {
  label: string
  value: number
  accent?: Accent
  delay?: number
}

export function DashboardProgressBar({
  label,
  value,
  accent = 'emerald',
  delay = 0,
}: DashboardProgressBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-muted">{label}</span>
        <span className="font-mono text-[11px] font-semibold text-text">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay, ease: 'easeOut' }}
          className={cn('h-full rounded-full', accentFill[accent])}
        />
      </div>
    </div>
  )
}
