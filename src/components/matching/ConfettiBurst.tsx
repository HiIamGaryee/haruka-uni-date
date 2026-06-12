import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { seededRandom } from '../../lib/seededRandom'

type ConfettiPiece = {
  id: number
  x: number
  yMid: number
  yEnd: number
  color: string
  rotation: number
  size: number
}

const COLORS = ['#eab308', '#f43f5e', '#a78bfa', '#60a5fa', '#34d399', '#facc15']

export function ConfettiBurst({ active }: { active: boolean }) {
  const pieces = useMemo<ConfettiPiece[]>(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        x: (seededRandom(i + 3) - 0.5) * 420,
        yMid: -80 - seededRandom(i + 7) * 120,
        yEnd: 160 + seededRandom(i + 13) * 80,
        color: COLORS[i % COLORS.length],
        rotation: seededRandom(i + 17) * 720,
        size: 4 + seededRandom(i + 23) * 6,
      })),
    [],
  )

  if (!active) return null

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden>
      {pieces.map((piece, i) => (
        <motion.span
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            width: piece.size,
            height: piece.size * 0.6,
            background: piece.color,
          }}
          initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: piece.x,
            y: [0, piece.yMid, piece.yEnd],
            rotate: piece.rotation,
            scale: [0, 1, 1, 0.5],
          }}
          transition={{
            duration: 1.8,
            delay: i * 0.02,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  )
}
