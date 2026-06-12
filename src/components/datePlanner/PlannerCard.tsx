import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'

type PlannerCardProps = {
  children: ReactNode
  className?: string
  delay?: number
  glow?: boolean
}

export function PlannerCard({ children, className, delay = 0, glow = false }: PlannerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: easeOut }}
      className={cn(
        'planner-card overflow-hidden',
        glow && 'planner-glow',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
