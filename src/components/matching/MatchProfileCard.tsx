import { motion } from 'framer-motion'
import type { MatchCardProfile } from '../../data/matchingAnimation'
import { easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'

type MatchProfileCardProps = {
  profile: MatchCardProfile
  visible: boolean
  delay?: number
}

export function MatchProfileCard({ profile, visible, delay = 0 }: MatchProfileCardProps) {
  const fromX = profile.side === 'left' ? -120 : 120

  return (
    <motion.div
      initial={{ opacity: 0, x: fromX, scale: 0.88 }}
      animate={
        visible
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: fromX, scale: 0.88 }
      }
      transition={{ duration: 0.7, delay, ease: easeOut }}
      className={cn(
        'w-[min(100%,11rem)] rounded-2xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur-xl sm:w-44',
        profile.side === 'left' ? 'mr-auto' : 'ml-auto',
      )}
      style={{
        boxShadow: '0 0 40px rgba(167, 139, 250, 0.12), 0 16px 48px rgba(0,0,0,0.45)',
      }}
    >
      <div
        className={cn(
          'mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-bold text-white',
          profile.accent,
        )}
      >
        {profile.initials}
      </div>
      <p className="mt-3 text-center text-sm font-semibold">{profile.name}</p>
      <p className="mt-0.5 text-center text-[11px] text-muted">{profile.course}</p>
      <p className="mt-0.5 text-center text-[10px] text-dim">{profile.university}</p>
    </motion.div>
  )
}
