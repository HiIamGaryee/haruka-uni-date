import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { seededRandom } from '../../lib/seededRandom'

const STAR_COUNT = 48

export function CosmicBackdrop() {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        x: seededRandom(i + 3) * 100,
        y: seededRandom(i + 13) * 100,
        size: 0.5 + seededRandom(i + 23) * 1.5,
        opacity: 0.15 + seededRandom(i + 33) * 0.45,
        delay: seededRandom(i + 43) * 4,
        duration: 2 + seededRandom(i + 53) * 3,
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Aurora washes */}
      <div className="absolute -left-1/4 top-0 h-2/3 w-2/3 rounded-full bg-violet-950/30 blur-[100px]" />
      <div className="absolute -right-1/4 bottom-0 h-1/2 w-1/2 rounded-full bg-slate-900/40 blur-[90px]" />
      <div className="absolute left-1/2 top-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-950/15 blur-[80px]" />

      {/* Stars */}
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
          animate={{ opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.4] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Drifting dust */}
      {Array.from({ length: 10 }, (_, i) => (
        <motion.span
          key={`dust-${i}`}
          className="absolute size-[2px] rounded-full bg-white/20"
          style={{
            left: `${seededRandom(i + 100) * 100}%`,
            top: `${seededRandom(i + 110) * 100}%`,
          }}
          animate={{
            y: [0, -20 - seededRandom(i + 120) * 30, 0],
            x: [0, (seededRandom(i + 130) - 0.5) * 16, 0],
            opacity: [0.1, 0.35, 0.1],
          }}
          transition={{
            duration: 4 + seededRandom(i + 140) * 3,
            delay: seededRandom(i + 150) * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(9,9,11,0.55)_100%)]" />
    </div>
  )
}
