import { motion } from 'framer-motion'
import { connectionNodes } from '../../data/matchingAnimation'

type MatchEnergyBeamProps = {
  active: boolean
  phase: number
}

const PARTICLES = [
  { id: 1, delay: 0, duration: 3.2 },
  { id: 2, delay: 0.8, duration: 3.6 },
  { id: 3, delay: 1.6, duration: 3.4 },
  { id: 4, delay: 2.2, duration: 3.8 },
]

export function MatchEnergyBeam({ active, phase }: MatchEnergyBeamProps) {
  const nodesLit = phase >= 2

  return (
    <div className="relative h-[220px] w-full sm:h-[240px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 220"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(167,139,250,0.05)" />
            <stop offset="20%" stopColor="rgba(167,139,250,0.35)" />
            <stop offset="50%" stopColor="rgba(234,179,8,0.55)" />
            <stop offset="80%" stopColor="rgba(96,165,250,0.35)" />
            <stop offset="100%" stopColor="rgba(96,165,250,0.05)" />
          </linearGradient>
          <filter id="beamGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft beam halo */}
        <motion.line
          x1="24"
          y1="110"
          x2="376"
          y2="110"
          stroke="url(#beamGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          opacity={active ? 0.18 : 0.05}
          animate={{ opacity: active ? [0.12, 0.22, 0.12] : 0.05 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Core beam */}
        <motion.line
          x1="24"
          y1="110"
          x2="376"
          y2="110"
          stroke="url(#beamGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#beamGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: active ? 1 : 0,
            opacity: active ? 1 : 0.2,
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Connection nodes */}
        {connectionNodes.map((node, i) => {
          const x = 24 + (376 - 24) * node.position
          const y = 110 + node.offsetY
          return (
            <g key={node.id}>
              <motion.circle
                cx={x}
                cy={y}
                r="18"
                fill="rgba(234,179,8,0.04)"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: nodesLit ? [1, 1.08, 1] : 0,
                  opacity: nodesLit ? [0.6, 1, 0.6] : 0,
                }}
                transition={{
                  scale: { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
                  opacity: { duration: 0.5, delay: 0.2 + i * 0.15 },
                }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r="4"
                fill="#eab308"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: nodesLit ? [1, 1.2, 1] : 0,
                  opacity: nodesLit ? [0.7, 1, 0.7] : 0,
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
                style={{ filter: 'drop-shadow(0 0 6px rgba(234,179,8,0.6))' }}
              />
            </g>
          )
        })}

        {/* Traveling particles */}
        {active &&
          PARTICLES.map((p) => (
            <motion.circle
              key={p.id}
              r="2"
              fill="rgba(234,179,8,0.85)"
              initial={{ cx: 24, cy: 110, opacity: 0 }}
              animate={{
                cx: [24, 376],
                cy: [110, 110, 108, 112, 110],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ filter: 'drop-shadow(0 0 4px rgba(234,179,8,0.8))' }}
            />
          ))}
      </svg>

      {/* Node labels */}
      <div className="pointer-events-none absolute inset-0">
        {connectionNodes.map((node, i) => (
          <motion.span
            key={node.id}
            className="absolute max-w-[88px] -translate-x-1/2 text-center font-mono text-[8px] uppercase leading-tight tracking-[0.14em] text-white/35 sm:max-w-[100px] sm:text-[9px]"
            style={{
              left: `${node.position * 100}%`,
              top: node.offsetY < 0 ? '18%' : '72%',
            }}
            initial={{ opacity: 0, y: node.offsetY < 0 ? 6 : -6 }}
            animate={{
              opacity: nodesLit ? 1 : 0,
              y: 0,
            }}
            transition={{ delay: 0.35 + i * 0.12, duration: 0.5 }}
          >
            {node.label}
          </motion.span>
        ))}
      </div>

      {/* Score sits in absolute center via parent */}
    </div>
  )
}
