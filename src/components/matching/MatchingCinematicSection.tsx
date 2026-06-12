import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { scrollReveal } from '../../lib/motion'
import { Section } from '../Section'
import { SectionHeader } from '../SectionHeader'
import { FindMatchButton } from './FindMatchButton'
import { FloatingParticles } from './FloatingParticles'

export function MatchingCinematicSection() {
  return (
    <Section id="find-match" className="relative overflow-hidden">
      <motion.div
        {...scrollReveal}
        className="match-cinematic relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b10]/90 p-8 text-center sm:p-12 lg:p-14"
      >
        <motion.div
          className="pointer-events-none absolute -left-24 top-1/2 size-72 -translate-y-1/2 rounded-full bg-accent/12 blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="pointer-events-none absolute -right-20 top-0 size-64 rounded-full bg-rose-500/10 blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
        <FloatingParticles count={20} />

        <div className="relative z-10">
          <SectionHeader
            eyebrow="Cinematic AI Matching"
            title={
              <>
                Face ID energy.{' '}
                <span className="text-gradient-rose">Tinder payoff.</span>
              </>
            }
            description="Press Find Match to watch Haruka analyze interests, lifestyle, emotional compatibility, and your first-date experience — in under five seconds."
            align="center"
          />

          <motion.div
            className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <FindMatchButton className="min-w-[220px] text-base shadow-[0_0_48px_rgba(234,179,8,0.22)]">
              Find Match
            </FindMatchButton>
            <p className="flex items-center gap-2 text-xs text-dim">
              <Zap className="size-3.5 text-accent" />
              5-phase AI sequence · Demo only · No backend
            </p>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}
