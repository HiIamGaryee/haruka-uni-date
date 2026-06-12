import { Sparkles } from 'lucide-react'
import { solutionContent } from '../data/homepage'
import { GlassCard } from './GlassCard'
import { SectionHeader } from './SectionHeader'
import { Section } from './Section'

export function SolutionSection() {
  return (
    <Section id="solution" border className="bg-bg-elevated/30">
      <SectionHeader
        eyebrow={solutionContent.eyebrow}
        title={
          <>
            Matching built for{' '}
            <span className="text-gradient-gold">how students actually live.</span>
          </>
        }
        description={solutionContent.description}
      />

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        {solutionContent.pillars.map((pillar, i) => (
          <GlassCard key={pillar.title} strong delay={i * 0.07} className="p-6 sm:p-7">
            <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Sparkles className="size-4" />
            </div>
            <h3 className="font-display text-lg font-bold sm:text-xl">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {pillar.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </Section>
  )
}
