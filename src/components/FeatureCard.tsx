import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { easeOut } from '../lib/motion'
import { cn } from '../lib/cn'

const accentStyles = [
  'hover:border-emerald-500/25 hover:shadow-[0_16px_48px_rgba(16,185,129,0.08)]',
  'hover:border-violet-500/25 hover:shadow-[0_16px_48px_rgba(139,92,246,0.08)]',
  'hover:border-blue-500/25 hover:shadow-[0_16px_48px_rgba(59,130,246,0.08)]',
  'hover:border-amber-500/25 hover:shadow-[0_16px_48px_rgba(245,158,11,0.08)]',
  'hover:border-cyan-500/25 hover:shadow-[0_16px_48px_rgba(6,182,212,0.08)]',
  'hover:border-rose-500/25 hover:shadow-[0_16px_48px_rgba(244,63,94,0.08)]',
  'hover:border-pink-500/25 hover:shadow-[0_16px_48px_rgba(236,72,153,0.08)]',
  'hover:border-accent/25 hover:shadow-[0_16px_48px_rgba(234,179,8,0.1)]',
] as const

const iconAccentStyles = [
  'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20',
  'bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20',
  'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20',
  'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20',
  'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20',
  'bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20',
  'bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20',
  'bg-accent/10 text-accent group-hover:bg-accent/20',
] as const

type FeatureCardProps = {
  icon: LucideIcon
  title: string
  description: string
  index?: number
  delay?: number
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  index = 0,
  delay = 0,
}: FeatureCardProps) {
  const accentIndex = index % accentStyles.length

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay, ease: easeOut }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className={cn(
        'group glass card-hover flex flex-col p-6 sm:p-7',
        accentStyles[accentIndex],
      )}
    >
      <div
        className={cn(
          'mb-5 flex size-11 items-center justify-center rounded-2xl transition-colors duration-300 sm:size-12',
          iconAccentStyles[accentIndex],
        )}
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </div>
      <h3 className="font-display text-base font-bold leading-snug sm:text-lg">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {description}
      </p>
    </motion.article>
  )
}
