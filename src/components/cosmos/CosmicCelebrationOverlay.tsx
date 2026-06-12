import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Heart, MapPin, Sparkles, X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cosmicCelebrationContent } from '../../data/cosmicMatch'
import { matchProfiles as profileData } from '../../data/matchingAnimation'
import { useMatching } from '../../hooks/useMatching'
import { useCosmicCelebration } from '../../hooks/useCosmicCelebration'
import { easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'
import { Button } from '../Button'
import { ConfettiBurst } from '../matching/ConfettiBurst'
import { CosmicScoreCounter } from './CosmicScoreCounter'
import { HeartParticleBurst } from './HeartParticleBurst'

export function CosmicCelebrationOverlay() {
  const { isCelebrationOpen, closeCelebration } = useMatching()
  const { phaseKey, isAtLeast, complete } = useCosmicCelebration(isCelebrationOpen)
  const mounted = typeof document !== 'undefined'

  useEffect(() => {
    if (!isCelebrationOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isCelebrationOpen])

  if (!mounted) return null

  const profiles = profileData
  const showHeart = isAtLeast('heart')
  const showExplode = isAtLeast('explode')
  const showScore = isAtLeast('score')
  const showTagline = isAtLeast('tagline')
  const showConfetti = isAtLeast('confetti')
  const showDateCard = isAtLeast('dateCard')

  return createPortal(
    <AnimatePresence>
      {isCelebrationOpen && (
        <motion.div
          key="cosmic-celebration"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[220] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Cosmic match celebration"
        >
          <motion.div
            className="absolute inset-0 bg-bg/90 backdrop-blur-2xl"
            animate={{ backgroundColor: isAtLeast('darken') ? 'rgba(5,5,8,0.95)' : 'rgba(9,9,11,0.88)' }}
            transition={{ duration: 0.4 }}
            onClick={closeCelebration}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 200, damping: 26 }}
            className="cosmic-celebration relative z-10 w-full max-w-md overflow-hidden rounded-[36px] border border-white/10 p-6 sm:max-w-lg sm:p-8"
          >
            <motion.div
              className="cosmic-wave pointer-events-none absolute inset-0 opacity-40"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="pointer-events-none absolute -inset-8 rounded-full border border-violet-500/20"
              animate={{ rotate: -360, scale: [1, 1.04, 1] }}
              transition={{ rotate: { duration: 12, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity } }}
            />

            <button
              type="button"
              onClick={closeCelebration}
              className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted hover:text-text"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            <div className="relative z-10 flex min-h-[420px] flex-col items-center justify-center">
              <AnimatePresence>
                {showHeart && (
                  <motion.div
                    key="heart"
                    className="relative flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: showExplode ? 0 : 1 }}
                    exit={{ scale: 1.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <motion.div
                      className="absolute size-32 rounded-full bg-rose-500/20 blur-2xl sm:size-40"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <motion.div
                      className="cosmic-glow-ring absolute size-28 rounded-full sm:size-36"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />
                    <Heart
                      className="relative size-20 fill-rose-500 text-rose-400 sm:size-24"
                      strokeWidth={1}
                    />
                    <HeartParticleBurst active={showExplode} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative mt-4 flex w-full items-center justify-between px-2 sm:px-6">
                {profiles.map((profile, i) => (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, x: profile.side === 'left' ? -80 : 80 }}
                    animate={
                      isAtLeast('avatars')
                        ? { opacity: 1, x: showExplode ? (profile.side === 'left' ? 40 : -40) : 0 }
                        : { opacity: 0, x: profile.side === 'left' ? -80 : 80 }
                    }
                    transition={{ type: 'spring', stiffness: 220, damping: 22, delay: i * 0.08 }}
                    className={cn(
                      'flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-bold text-white sm:size-16',
                      profile.accent,
                    )}
                  >
                    {profile.initials}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 w-full">
                <CosmicScoreCounter active={showScore} duration={1500} />
              </div>

              <AnimatePresence>
                {showTagline && (
                  <motion.p
                    key="tagline"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="cosmic-shimmer mt-4 text-center font-display text-lg font-semibold text-gradient-rose sm:text-xl"
                  >
                    {cosmicCelebrationContent.tagline}
                  </motion.p>
                )}
              </AnimatePresence>

              <ConfettiBurst active={showConfetti} />

              <AnimatePresence>
                {showDateCard && (
                  <motion.div
                    key="date-card"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: easeOut }}
                    className="mt-6 w-full rounded-2xl border border-white/12 bg-white/[0.05] p-4 backdrop-blur-xl sm:p-5"
                  >
                    <div className="flex items-center gap-2 text-accent">
                      <Sparkles className="size-4" />
                      <p className="text-xs font-semibold uppercase tracking-widest">
                        Suggested First Date
                      </p>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold">
                      {cosmicCelebrationContent.firstDate.title}
                    </h3>
                    <div className="mt-3 space-y-1.5 text-sm text-muted">
                      <p className="flex items-center gap-2">
                        <Calendar className="size-3.5 shrink-0 text-dim" />
                        {cosmicCelebrationContent.firstDate.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="size-3.5 shrink-0 text-dim" />
                        {cosmicCelebrationContent.firstDate.location}
                      </p>
                    </div>
                    <p className="mt-3 text-xs text-dim">
                      {cosmicCelebrationContent.firstDate.budget} ·{' '}
                      {cosmicCelebrationContent.firstDate.vibe}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {complete && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex w-full gap-3"
                  >
                    <Button href="/register" variant="primary" className="flex-1" onClick={closeCelebration}>
                      View Date Plan
                    </Button>
                    <Button variant="secondary" className="flex-1" onClick={closeCelebration}>
                      Close
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {phaseKey === 'pause' && (
              <motion.div
                className="pointer-events-none absolute inset-0 bg-white/[0.02]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.04, 0] }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
