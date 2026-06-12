import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { seededRandom } from '../../lib/seededRandom'

type HeartParticleBurstProps = {
  active: boolean
}

export function HeartParticleBurst({ active }: HeartParticleBurstProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        x: (seededRandom(i + 50) - 0.5) * 320,
        y: (seededRandom(i + 60) - 0.5) * 280,
        size: 3 + seededRandom(i + 70) * 5,
        color: ['#f43f5e', '#eab308', '#a78bfa', '#60a5fa', '#f472b6'][i % 5],
        delay: seededRandom(i + 80) * 0.15,
      })),
    [],
  )

  if (!active) return null

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 12px ${p.color}`,
          }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.4, 0.2],
            x: p.x,
            y: p.y,
          }}
          transition={{
            duration: 0.9,
            delay: p.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  )
}
