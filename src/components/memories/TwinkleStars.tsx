import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { seededRandom } from '../../lib/seededRandom'

type Star = {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export function TwinkleStars({ count = 40 }: { count?: number }) {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: seededRandom(i + 100) * 100,
        y: seededRandom(i + 200) * 100,
        size: 1 + seededRandom(i + 300) * 2.5,
        delay: seededRandom(i + 400) * 3,
        duration: 2 + seededRandom(i + 500) * 2,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="memory-star absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.15, 0.85, 0.15], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
