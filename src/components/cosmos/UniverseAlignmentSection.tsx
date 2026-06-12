import { motion, useInView } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { useRef, useState } from 'react'
import { universeAlignmentContent } from '../../data/cosmicMatch'
import { useUniverseAlignment } from '../../hooks/useUniverseAlignment'
import { Section } from '../Section'
import { SectionHeader } from '../SectionHeader'
import { Button } from '../Button'
import { CosmicCelebrateButton } from './CosmicCelebrateButton'
import { UniverseAlignmentCanvas } from './UniverseAlignmentCanvas'

const stageLabels = [
  'Stars approaching',
  'Constellation forming',
  'Interests becoming planets',
  'Traits entering orbit',
  'Galaxy vortex',
  'Merged system',
]

export function UniverseAlignmentSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [runKey, setRunKey] = useState(0)
  const { stage, stageIndex } = useUniverseAlignment(inView, runKey)

  return (
    <Section id="universe-alignment" border dots className="overflow-hidden">
      <SectionHeader
        eyebrow={universeAlignmentContent.eyebrow}
        title={
          <>
            When two stars were{' '}
            <span className="text-gradient-spectrum">always meant to orbit together.</span>
          </>
        }
        description={universeAlignmentContent.description}
        align="center"
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="cosmic-stage relative overflow-hidden rounded-[32px] border border-white/10 bg-[#06060c] p-5 sm:p-8 lg:p-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.08)_0%,transparent_65%)]" />

        <UniverseAlignmentCanvas stage={stage} />

        <motion.p
          key={stage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: stage === 'idle' ? 0 : 1, y: 0 }}
          className="mt-6 text-center font-mono text-[11px] uppercase tracking-widest text-violet-300/70"
        >
          {stage === 'idle' ? 'Initializing...' : stageLabels[stageIndex] ?? 'Aligning...'}
        </motion.p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CosmicCelebrateButton className="shadow-[0_0_48px_rgba(167,139,250,0.2)]">
            {universeAlignmentContent.triggerLabel}
          </CosmicCelebrateButton>
          <Button variant="secondary" size="sm" onClick={() => setRunKey((k) => k + 1)}>
            <RotateCcw className="size-3.5" />
            {universeAlignmentContent.replayLabel}
          </Button>
        </div>
      </motion.div>
    </Section>
  )
}
