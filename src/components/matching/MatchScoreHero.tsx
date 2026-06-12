import { motion } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'
import { MATCH_SCORE_TARGET, compatibilityDnaContent } from '../../data/matchingAnimation'

type MatchScoreHeroProps = {
  active: boolean
  complete?: boolean
}

export function MatchScoreHero({ active, complete = false }: MatchScoreHeroProps) {
  const score = useCountUp(MATCH_SCORE_TARGET, active, 1400, 200)
  const circumference = 2 * Math.PI * 54
  const progress = active ? score / MATCH_SCORE_TARGET : 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: active ? 1 : 0.35, scale: active ? 1 : 0.94 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="compat-score-hero relative z-20 flex flex-col items-center"
    >
      <div className="relative flex size-[148px] items-center justify-center sm:size-[168px]">
        <div
          className="pointer-events-none absolute inset-0 rounded-full bg-amber-500/[0.07] blur-2xl"
          aria-hidden
        />

        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 120 120"
          aria-hidden
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="3"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="url(#scoreRingGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - circumference * progress }}
            transition={{ duration: 0.15, ease: 'linear' }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(234,179,8,0.35))' }}
          />
          <defs>
            <linearGradient id="scoreRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative text-center">
          <motion.p
            className="font-display text-[2.75rem] font-bold leading-none tracking-tight text-gradient-gold sm:text-5xl"
            animate={{ scale: complete ? [1, 1.04, 1] : 1 }}
            transition={{ duration: 2.4, repeat: complete ? Infinity : 0, ease: 'easeInOut' }}
          >
            {score}%
          </motion.p>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: complete ? 1 : 0.5, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200/70"
      >
        {compatibilityDnaContent.scoreLabel}
      </motion.p>
    </motion.div>
  )
}
