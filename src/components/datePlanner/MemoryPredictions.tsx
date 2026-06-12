import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { memoryPredictions } from '../../data/datePlanner'
import { easeOut } from '../../lib/motion'
import { PlannerCard } from './PlannerCard'
import { cn } from '../../lib/cn'

const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', '-rotate-1'] as const

export function MemoryPredictions() {
  return (
    <PlannerCard delay={0.18}>
      <div className="border-b border-white/8 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400">
            <Camera className="size-5" />
          </span>
          <h3 className="font-display text-xl font-bold">Moments you might remember</h3>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3 p-5 sm:gap-4 sm:p-8">
        {memoryPredictions.map((memory, i) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: easeOut }}
            whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
            className={cn(
              'w-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] px-4 py-3 shadow-lg sm:w-auto sm:max-w-[220px]',
              rotations[i % rotations.length],
              'card-hover',
            )}
          >
            <p className="text-sm font-medium leading-snug">{memory.text}</p>
          </motion.div>
        ))}
      </div>
    </PlannerCard>
  )
}
