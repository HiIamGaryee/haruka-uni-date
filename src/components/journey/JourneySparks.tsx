import { motion } from 'framer-motion'
import { seededRandom } from '../../lib/seededRandom'

type JourneySparksProps = {
  active: boolean
  seed: number
}

export function JourneySparks({ active, seed }: JourneySparksProps) {
  if (!active) return null

  const sparks = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: (seededRandom(seed + i) - 0.5) * 48,
    y: (seededRandom(seed + i + 10) - 0.5) * 48,
    delay: seededRandom(seed + i + 20) * 0.3,
  }))

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {sparks.map((spark) => (
        <motion.span
          key={spark.id}
          className="absolute left-1/2 top-1/2 size-1 rounded-full bg-accent-bright"
          style={{ boxShadow: '0 0 8px rgba(250, 204, 21, 0.9)' }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            x: spark.x,
            y: spark.y,
          }}
          transition={{
            duration: 0.9,
            delay: spark.delay,
            repeat: Infinity,
            repeatDelay: 0.6,
          }}
        />
      ))}
    </div>
  )
}
