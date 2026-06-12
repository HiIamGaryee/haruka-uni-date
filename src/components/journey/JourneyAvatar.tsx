import { motion } from 'framer-motion'

type JourneyAvatarProps = {
  progress: number
  isWalking: boolean
}

export function JourneyAvatar({ progress, isWalking }: JourneyAvatarProps) {
  const percent = Math.min(100, Math.max(0, progress * 100))

  return (
    <motion.div
      className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${percent}%`,
        top: '50%',
      }}
      animate={{
        y: isWalking ? [0, -4, 0] : 0,
      }}
      transition={{
        duration: 0.45,
        repeat: isWalking ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        className="relative"
        animate={{ rotate: isWalking ? [0, 3, 0, -3, 0] : 0 }}
        transition={{ duration: 0.6, repeat: isWalking ? Infinity : 0 }}
      >
        <div className="journey-avatar-shadow absolute -inset-2 rounded-full bg-accent/20 blur-md" />
        <div className="relative flex size-12 items-center justify-center rounded-full border-2 border-accent/40 bg-gradient-to-br from-amber-200 to-amber-400 shadow-[0_0_24px_rgba(234,179,8,0.35)] sm:size-14">
          <svg viewBox="0 0 48 48" className="size-8 sm:size-9" aria-hidden>
            <circle cx="24" cy="18" r="9" fill="#78350f" />
            <ellipse cx="24" cy="38" rx="12" ry="9" fill="#92400e" />
            <circle cx="20" cy="17" r="1.5" fill="#fef3c7" />
            <circle cx="28" cy="17" r="1.5" fill="#fef3c7" />
            <path
              d="M 19 21 Q 24 25 29 21"
              fill="none"
              stroke="#fef3c7"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <motion.g
              animate={{ rotate: isWalking ? [10, -10, 10] : 0 }}
              style={{ transformOrigin: '24px 32px' }}
              transition={{ duration: 0.35, repeat: isWalking ? Infinity : 0 }}
            >
              <ellipse cx="14" cy="34" rx="3" ry="5" fill="#b45309" />
              <ellipse cx="34" cy="34" rx="3" ry="5" fill="#b45309" />
            </motion.g>
          </svg>
        </div>
        <motion.span
          className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-rose-500 text-[10px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          ♥
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
