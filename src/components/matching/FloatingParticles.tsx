import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { seededRandom } from '../../lib/seededRandom'

type Particle = {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  driftY: number
  driftX: number
  color: string
}

const COLORS = [
  'rgba(234, 179, 8, 0.55)',
  'rgba(167, 139, 250, 0.5)',
  'rgba(244, 63, 94, 0.45)',
  'rgba(96, 165, 250, 0.45)',
  'rgba(52, 211, 153, 0.4)',
]

export function FloatingParticles({ count = 28, className = '' }: { count?: number; className?: string }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r1 = seededRandom(i + 1)
        const r2 = seededRandom(i + 11)
        const r3 = seededRandom(i + 21)
        const r4 = seededRandom(i + 31)
        const r5 = seededRandom(i + 41)
        const r6 = seededRandom(i + 51)
        const r7 = seededRandom(i + 61)
        return {
          id: i,
          x: r1 * 100,
          y: r2 * 100,
          size: 2 + r3 * 4,
          delay: r4 * 2,
          duration: 3 + r5 * 4,
          driftY: -18 - r6 * 24,
          driftX: (r7 - 0.5) * 20,
          color: COLORS[i % COLORS.length],
        }
      }),
    [count],
  )

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, p.driftY, 0],
            x: [0, p.driftX, 0],
            opacity: [0.2, 0.85, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
