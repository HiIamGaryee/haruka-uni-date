import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { easeOut } from '../lib/motion'
import { cn } from '../lib/cn'

type GlassCardProps = {
  children: ReactNode
  className?: string
  strong?: boolean
  hover?: boolean
  delay?: number
}

export function GlassCard({
  children,
  className,
  strong = false,
  hover = true,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      whileHover={hover ? { y: -4, transition: { duration: 0.25 } } : undefined}
      className={cn(
        strong ? 'glass-strong' : 'glass',
        hover && 'card-hover',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
