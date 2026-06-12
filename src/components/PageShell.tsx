import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { GradientBlobs } from './GradientBlobs'
import { pageEntrance } from '../lib/motion'

type PageShellProps = {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <motion.div
      initial={pageEntrance.initial}
      animate={pageEntrance.animate}
      transition={pageEntrance.transition}
      className="relative min-h-screen"
    >
      <GradientBlobs />
      {children}
    </motion.div>
  )
}
