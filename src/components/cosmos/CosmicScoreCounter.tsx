import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { COSMIC_MATCH_SCORE, scoreMilestones } from '../../data/cosmicMatch'

type CosmicScoreCounterProps = {
  active: boolean
  duration: number
}

export function CosmicScoreCounter({ active, duration }: CosmicScoreCounterProps) {
  const [displayIndex, setDisplayIndex] = useState(0)

  useEffect(() => {
    if (!active) {
      const reset = setTimeout(() => setDisplayIndex(0), 0)
      return () => clearTimeout(reset)
    }

    const step = duration / (scoreMilestones.length - 1)
    const timers = scoreMilestones.map((_, i) =>
      setTimeout(() => setDisplayIndex(i), i * step),
    )
    return () => timers.forEach(clearTimeout)
  }, [active, duration])

  const displayScore =
    displayIndex === scoreMilestones.length - 1
      ? COSMIC_MATCH_SCORE
      : scoreMilestones[displayIndex]

  return (
    <div className="relative text-center">
      <motion.p
        className="text-[10px] font-semibold uppercase tracking-[0.25em] text-violet-300/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
      >
        Cosmic Compatibility
      </motion.p>
      <motion.div
        key={displayScore}
        className="mt-2 font-display text-5xl font-bold text-gradient-gold sm:text-7xl"
        initial={{ opacity: 0, y: 36, scale: 0.65, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {displayScore}%
      </motion.div>
      {active && displayIndex === scoreMilestones.length - 1 && (
        <motion.p
          className="mt-2 font-mono text-xs text-accent-bright"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          {COSMIC_MATCH_SCORE}% Cosmic Compatibility
        </motion.p>
      )}
    </div>
  )
}
