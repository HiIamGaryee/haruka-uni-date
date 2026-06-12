import { motion, useInView } from 'framer-motion'
import { ArrowLeftRight, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  compatibilityDnaContent,
  dnaStudents,
  sharedInterestPairs,
} from '../../data/matchingAnimation'
import { scrollReveal } from '../../lib/motion'
import { Section } from '../Section'
import { SectionHeader } from '../SectionHeader'
import { Button } from '../Button'
import { MatchEnergyBeam } from './MatchEnergyBeam'
import { MatchScoreHero } from './MatchScoreHero'
import { StudentProfileCard } from './StudentProfileCard'
import { CompatibilityInsights } from './CompatibilityInsights'
import { CosmicBackdrop } from './CosmicBackdrop'

type AnalysisPhase = 0 | 1 | 2 | 3 | 4

export function CompatibilityDNASection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [phase, setPhase] = useState<AnalysisPhase>(0)
  const [runKey, setRunKey] = useState(0)

  useEffect(() => {
    if (!inView) return

    const timers = [
      setTimeout(() => setPhase(0), 0),
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3000),
    ]

    return () => timers.forEach(clearTimeout)
  }, [inView, runKey])

  const [studentA, studentB] = dnaStudents
  const handleReplay = () => setRunKey((k) => k + 1)

  return (
    <Section id="compatibility-dna" border className="overflow-hidden">
      <SectionHeader
        eyebrow={compatibilityDnaContent.eyebrow}
        title={
          <>
            Two profiles.{' '}
            <span className="text-gradient-gold">One clear signal.</span>
          </>
        }
        description={compatibilityDnaContent.description}
        align="center"
      />

      <motion.div
        ref={ref}
        {...scrollReveal}
        className="compat-stage relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/[0.06] p-4 sm:p-6 lg:p-8"
      >
        <CosmicBackdrop />

        <div className="relative z-10">
          {/* Three-column analysis */}
          <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,1.15fr)_minmax(0,1fr)] lg:gap-6">
            {/* Student A */}
            <motion.div
              animate={{ y: phase >= 1 ? [0, -3, 0] : 0 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="order-1"
            >
              <StudentProfileCard
                student={studentA}
                align="left"
                active={phase >= 1}
                delay={0.1}
              />
            </motion.div>

            {/* Center visualization */}
            <div className="order-2 flex flex-col items-center justify-center py-2 lg:order-2 lg:py-0">
              <div className="relative w-full max-w-md">
                <MatchEnergyBeam active={phase >= 1} phase={phase} />

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <MatchScoreHero active={phase >= 2} complete={phase >= 4} />
                </div>
              </div>

              {/* Shared interest bridges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 8 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 flex w-full max-w-md flex-col gap-2"
              >
                {sharedInterestPairs.map((pair, i) => (
                  <motion.div
                    key={pair.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: phase >= 3 ? 1 : 0, x: phase >= 3 ? 0 : -8 }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.45 }}
                    className="flex items-center justify-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-2 backdrop-blur-md sm:gap-3 sm:px-4"
                  >
                    <span className="rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-medium text-white/60">
                      {pair.studentA}
                    </span>
                    <ArrowLeftRight
                      className="size-3 shrink-0 text-amber-400/50"
                      strokeWidth={1.5}
                    />
                    <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-medium text-white/60">
                      {pair.studentB}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Student B */}
            <motion.div
              animate={{ y: phase >= 1 ? [0, 3, 0] : 0 }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="order-3"
            >
              <StudentProfileCard
                student={studentB}
                align="right"
                active={phase >= 1}
                delay={0.2}
              />
            </motion.div>
          </div>

          {/* Insights + replay */}
          <div className="relative z-10 mt-6 space-y-4 lg:mt-8">
            <CompatibilityInsights active={phase >= 4} />

            <div className="flex justify-center">
              <Button variant="secondary" size="sm" onClick={handleReplay}>
                <RotateCcw className="size-3.5" />
                {compatibilityDnaContent.replayLabel}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
