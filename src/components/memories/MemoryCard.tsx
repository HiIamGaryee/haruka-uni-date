import { motion } from 'framer-motion'
import type { FutureMemory } from '../../data/futureMemories'
import { easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'

type MemoryCardProps = {
  memory: FutureMemory
  index: number
  glowing: boolean
}

export function MemoryCard({ memory, index, glowing }: MemoryCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: easeOut }}
      whileHover={{ scale: 1.06, zIndex: 10 }}
      className={cn(
        'memory-card relative w-full max-w-[240px] cursor-default rounded-[24px] border border-white/12 bg-gradient-to-br from-white/[0.09] to-white/[0.02] px-5 py-4 backdrop-blur-xl',
        glowing && 'memory-card-glow',
      )}
      style={{ marginLeft: memory.offsetX }}
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          opacity: [0.85, 1, 0.85],
          rotate: [memory.rotation, memory.rotation + 1.5, memory.rotation],
        }}
        transition={{
          y: { duration: 4 + index * 0.3, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="while-hover-reset"
      >
        <span className="text-2xl" aria-hidden>
          {memory.emoji}
        </span>
        <p className="mt-2 text-sm font-medium leading-snug text-text/95">{memory.text}</p>
      </motion.div>
    </motion.article>
  )
}
