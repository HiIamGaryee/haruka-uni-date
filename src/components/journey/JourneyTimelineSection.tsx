import { motion } from 'framer-motion'
import { journeyContent, journeySteps } from '../../data/journeyTimeline'
import { useJourneyProgress } from '../../hooks/useJourneyProgress'
import { SectionHeader } from '../SectionHeader'
import { JourneyAvatar } from './JourneyAvatar'
import { JourneyStepCard } from './JourneyStepCard'
import { JourneyStepNode } from './JourneyStepNode'

function HorizontalTrack({
  activeIndex,
  progress,
}: {
  activeIndex: number
  progress: number
}) {
  const fillPercent = progress

  return (
    <div className="relative hidden px-4 lg:block">
      <div className="relative mx-auto max-w-4xl pt-8 pb-4">
        <div className="absolute left-[6%] right-[6%] top-[calc(50%-4px)] h-1.5 rounded-full bg-white/8">
          <motion.div
            className="journey-track-fill h-full rounded-full bg-gradient-to-r from-accent via-rose-400 to-violet-400"
            style={{ width: `${fillPercent * 100}%` }}
          />
        </div>

        <div className="relative flex justify-between">
          <JourneyAvatar
            progress={progress}
            isWalking={progress > 0 && progress < 0.98}
          />
          {journeySteps.map((step, i) => (
            <JourneyStepNode
              key={step.id}
              step={step}
              index={i}
              active={i === activeIndex}
              passed={i < activeIndex}
              layout="horizontal"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function VerticalTrack({
  activeIndex,
  progress,
}: {
  activeIndex: number
  progress: number
}) {
  const fillPercent = progress * 100

  return (
    <div className="relative pl-6 lg:hidden">
      <div className="absolute bottom-4 left-[1.65rem] top-4 w-1.5 rounded-full bg-white/8">
        <motion.div
          className="journey-track-fill w-full rounded-full bg-gradient-to-b from-accent via-rose-400 to-violet-400"
          style={{ height: `${fillPercent}%` }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute left-0 z-20 -translate-x-1/2"
        style={{ top: `${fillPercent}%` }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex size-10 items-center justify-center rounded-full border-2 border-accent/40 bg-gradient-to-br from-amber-200 to-amber-400 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
          <span className="text-sm">🚶</span>
        </div>
      </motion.div>

      <div className="space-y-10 py-4">
        {journeySteps.map((step, i) => (
          <JourneyStepNode
            key={step.id}
            step={step}
            index={i}
            active={i === activeIndex}
            passed={i < activeIndex}
            layout="vertical"
          />
        ))}
      </div>
    </div>
  )
}

export function JourneyTimelineSection() {
  const { containerRef, activeIndex, progress } = useJourneyProgress()
  const activeStep = journeySteps[activeIndex]

  return (
    <section id="date-journey" className="relative border-t border-white/5">
      <div ref={containerRef} className="relative h-[260vh] sm:h-[280vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="section-container relative w-full py-8">
            <motion.div
              className="pointer-events-none absolute -left-20 top-1/4 size-72 rounded-full bg-rose-500/8 blur-3xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />

            <SectionHeader
              eyebrow={journeyContent.eyebrow}
              title={
                <>
                  Follow the path{' '}
                  <span className="text-gradient-gold">from hello to goodbye.</span>
                </>
              }
              description={journeyContent.description}
              align="center"
            />

            <p className="mb-2 text-center font-mono text-[10px] uppercase tracking-widest text-dim">
              Scroll to progress
            </p>

            <HorizontalTrack activeIndex={activeIndex} progress={progress} />
            <VerticalTrack activeIndex={activeIndex} progress={progress} />

            <JourneyStepCard
              step={activeStep}
              stepIndex={activeIndex}
              active
            />
          </div>
        </div>
      </div>
    </section>
  )
}
