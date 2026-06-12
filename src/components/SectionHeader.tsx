import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { easeOut } from '../lib/motion'
import { cn } from '../lib/cn'

type SectionHeaderProps = {
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
  className?: string
  delay?: number
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  delay = 0,
}: SectionHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      className={cn(
        align === 'center'
          ? 'mx-auto mb-10 max-w-2xl text-center sm:mb-14'
          : 'mb-10 max-w-2xl sm:mb-14',
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:text-sm">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-[1.65rem] font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </motion.header>
  )
}
