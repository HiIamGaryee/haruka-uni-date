import { AnimatePresence, motion } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useMatching } from '../../hooks/useMatching'
import { COSMIC_MATCH_THRESHOLD } from '../../data/cosmicMatch'
import {
  MATCH_SCORE_TARGET,
  matchProfiles,
  matchingPhases,
} from '../../data/matchingAnimation'
import { useCountUp } from '../../hooks/useCountUp'
import { useMatchingPhases } from '../../hooks/useMatchingPhases'
import { useTypewriter } from '../../hooks/useTypewriter'
import { easeOut } from '../../lib/motion'
import { Button } from '../Button'
import { ConfettiBurst } from './ConfettiBurst'
import { FloatingParticles } from './FloatingParticles'
import { MatchProfileCard } from './MatchProfileCard'

export function FindMatchOverlay() {
  const { isOpen, closeMatching, openCelebration } = useMatching()
  const { phase, phaseIndex, progress, complete } = useMatchingPhases(isOpen)
  const score = useCountUp(MATCH_SCORE_TARGET, isOpen && phaseIndex >= 2, 1600, 400)
  const { displayed, done } = useTypewriter(phase?.label ?? '', 28, 80)
  const mounted = typeof document !== 'undefined'

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  useEffect(() => {
    if (!complete || MATCH_SCORE_TARGET < COSMIC_MATCH_THRESHOLD) return
    const timer = setTimeout(() => {
      closeMatching()
      openCelebration()
    }, 1200)
    return () => clearTimeout(timer)
  }, [complete, closeMatching, openCelebration])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="find-match-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="AI matching animation"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-bg/85 backdrop-blur-xl"
            onClick={closeMatching}
            aria-label="Close matching animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="match-cinematic relative z-10 w-full max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-[#0c0c10]/95 p-6 shadow-2xl sm:p-8"
          >
            <motion.div
              className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-accent/15 blur-3xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="pointer-events-none absolute -bottom-24 -right-16 size-72 rounded-full bg-violet-500/12 blur-3xl"
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            />

            <FloatingParticles count={22} />

            <button
              type="button"
              onClick={closeMatching}
              className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition hover:text-text"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            <div className="relative z-10">
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                haruka.ai.match
              </p>

              <div className="relative mx-auto mt-8 flex h-52 items-center justify-center sm:h-56">
                <motion.div
                  className="absolute size-40 rounded-full bg-gradient-to-br from-accent/20 via-rose-500/10 to-violet-500/20 blur-2xl sm:size-48"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute size-28 rounded-full border border-accent/20 sm:size-32"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-1 sm:px-2">
                  {matchProfiles.map((profile, i) => (
                    <MatchProfileCard
                      key={profile.id}
                      profile={profile}
                      visible={phaseIndex >= 3}
                      delay={i * 0.12}
                    />
                  ))}
                </div>

                <motion.div
                  className="relative z-10 flex size-20 items-center justify-center rounded-full border border-rose-500/30 bg-gradient-to-br from-rose-500/20 to-violet-500/20 shadow-[0_0_48px_rgba(244,63,94,0.25)] sm:size-24"
                  animate={{
                    scale: complete ? [1, 1.12, 1.05] : [1, 1.06, 1],
                  }}
                  transition={{
                    duration: complete ? 0.9 : 2.2,
                    repeat: complete ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Heart
                    className="size-9 fill-rose-400 text-rose-400 sm:size-10"
                    strokeWidth={1.5}
                  />
                </motion.div>

                <ConfettiBurst active={complete} />
              </div>

              <motion.div
                className="mt-2 text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <p className="min-h-[1.75rem] font-display text-lg font-semibold sm:text-xl">
                  {displayed}
                  {!done && <span className="animate-pulse text-accent">|</span>}
                </p>
                <p className="mt-1 text-xs text-dim">
                  Phase {phaseIndex + 1} of {matchingPhases.length}
                </p>
              </motion.div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-[11px] text-muted">
                  <span>AI Analysis</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    className="match-progress-line h-full rounded-full bg-gradient-to-r from-accent via-rose-400 to-violet-400"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
              </div>

              <motion.div
                className="mt-6 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: phaseIndex >= 2 ? 1 : 0.4, scale: phaseIndex >= 2 ? 1 : 0.95 }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-dim">
                  Compatibility Score
                </p>
                <p className="font-display text-5xl font-bold text-gradient-gold sm:text-6xl">
                  {score}%
                </p>
              </motion.div>

              <motion.div
                className="mt-6 grid grid-cols-4 gap-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
                }}
              >
                {matchingPhases.map((p, i) => (
                  <motion.div
                    key={p.id}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className={`rounded-xl border px-1 py-2 text-center transition ${
                      i <= phaseIndex
                        ? 'border-accent/30 bg-accent/10 text-accent-bright'
                        : 'border-white/8 bg-white/[0.03] text-dim'
                    }`}
                  >
                    <p className="text-[9px] font-semibold uppercase tracking-wide">
                      {i < phaseIndex ? '✓' : i === phaseIndex ? '●' : '○'}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <AnimatePresence>
                {complete && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                    className="mt-6 flex flex-col gap-3 sm:flex-row"
                  >
                    <Button
                      to="/login"
                      variant="primary"
                      className="flex-1"
                      onClick={closeMatching}
                    >
                      Try live demo
                    </Button>
                    <Button
                      to="/demo"
                      variant="secondary"
                      className="flex-1"
                      onClick={closeMatching}
                    >
                      Interactive scorer
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
