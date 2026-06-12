import { motion } from 'framer-motion'
import {
  constellationEdges,
  constellationNodes,
  cosmicStars,
  interestPlanets,
  personalityTraits,
} from '../../data/cosmicMatch'
import type { AlignmentStage } from '../../hooks/useUniverseAlignment'
import { cn } from '../../lib/cn'

type UniverseAlignmentCanvasProps = {
  stage: AlignmentStage
}

const nodeMap = Object.fromEntries(constellationNodes.map((n) => [n.id, n]))

export function UniverseAlignmentCanvas({ stage }: UniverseAlignmentCanvasProps) {
  const showStars = stage !== 'idle'
  const showConstellation = ['constellation', 'planets', 'traits', 'vortex', 'merge'].includes(stage)
  const showPlanets = ['planets', 'traits', 'vortex', 'merge'].includes(stage)
  const showTraits = ['traits', 'vortex', 'merge'].includes(stage)
  const showVortex = ['vortex', 'merge'].includes(stage)
  const merged = stage === 'merge'

  return (
    <div className="relative mx-auto aspect-square w-full max-w-xl">
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full bg-violet-500/5 blur-3xl"
        animate={{ opacity: showVortex ? 0.9 : 0.3, scale: showVortex ? 1.15 : 0.9 }}
        transition={{ duration: 1.2 }}
      />

      {showVortex && (
        <motion.div
          className="cosmic-vortex pointer-events-none absolute inset-[-10%]"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: merged ? 0.6 : 1, rotate: 360 }}
          transition={{
            opacity: { duration: 0.8 },
            rotate: { duration: 18, repeat: Infinity, ease: 'linear' },
          }}
        />
      )}

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {showConstellation &&
          constellationEdges.map(([from, to], i) => {
            const a = nodeMap[from]
            const b = nodeMap[to]
            if (!a || !b) return null
            return (
              <motion.line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="url(#constellation-gradient)"
                strokeWidth="0.35"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              />
            )
          })}
        <defs>
          <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#eab308" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {showPlanets &&
        interestPlanets.map((planet, i) => {
          const rad = (planet.angle * Math.PI) / 180
          const x = 50 + Math.cos(rad) * (planet.orbitRadius / 10)
          const y = 50 + Math.sin(rad) * (planet.orbitRadius / 10)
          return (
            <motion.div
              key={planet.id}
              className="absolute z-10 flex flex-col items-center"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: i * 0.1 }}
            >
              <span
                className="flex items-center justify-center rounded-full border border-white/20 text-[9px] font-semibold text-white shadow-lg sm:text-[10px]"
                style={{
                  width: planet.size,
                  height: planet.size,
                  background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88)`,
                  boxShadow: `0 0 20px ${planet.color}55`,
                }}
              >
                {planet.label.split(' ')[0]}
              </span>
            </motion.div>
          )
        })}

      {showTraits &&
        personalityTraits.map((trait, i) => {
          const baseAngle = trait.angle + i * 22
          const rad = (baseAngle * Math.PI) / 180
          const px = 50 + (Math.cos(rad) * trait.orbitRadius) / 3.2
          const py = 50 + (Math.sin(rad) * trait.orbitRadius) / 3.2
          return (
            <motion.span
              key={trait.id}
              className="absolute z-[5] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[9px] text-muted backdrop-blur-sm sm:text-[10px]"
              style={{ left: `${px}%`, top: `${py}%` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                left: [
                  `${px}%`,
                  `${50 + (Math.cos(rad + Math.PI / 8) * trait.orbitRadius) / 3.2}%`,
                  `${px}%`,
                ],
                top: [
                  `${py}%`,
                  `${50 + (Math.sin(rad + Math.PI / 8) * trait.orbitRadius) / 3.2}%`,
                  `${py}%`,
                ],
              }}
              transition={{
                duration: 8 / Math.abs(trait.speed),
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {trait.label}
            </motion.span>
          )
        })}

      {cosmicStars.map((star, i) => (
        <motion.div
          key={star.id}
          className="absolute z-20"
          initial={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            opacity: 0,
            scale: 0.5,
          }}
          animate={
            showStars
              ? merged
                ? {
                    left: '50%',
                    top: '50%',
                    opacity: 0,
                    scale: 0,
                  }
                : {
                    left: `${50 + (i === 0 ? -14 : 14)}%`,
                    top: '50%',
                    opacity: 1,
                    scale: 1,
                  }
              : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: merged ? 1 : 2.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <motion.div
            className={cn(
              'relative flex size-12 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white sm:size-14 sm:text-sm',
              star.accent,
            )}
            animate={{
              boxShadow: [
                '0 0 24px rgba(167,139,250,0.4)',
                '0 0 40px rgba(234,179,8,0.5)',
                '0 0 24px rgba(167,139,250,0.4)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {star.initials}
          </motion.div>
        </motion.div>
      ))}

      {merged && (
        <motion.div
          className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.3 }}
        >
          <motion.div
            className="cosmic-system-glow size-28 rounded-full sm:size-36"
            animate={{ scale: [1, 1.08, 1], rotate: 360 }}
            transition={{
              scale: { duration: 2.5, repeat: Infinity },
              rotate: { duration: 14, repeat: Infinity, ease: 'linear' },
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-lg font-bold text-gradient-gold sm:text-xl">
              ✦
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
