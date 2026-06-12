import { matchingSteps } from '../data/homepage'
import { GlassCard } from './GlassCard'
import { SectionHeader } from './SectionHeader'
import { Section } from './Section'

export function HowMatchingWorks() {
  return (
    <Section id="how-it-works" border dots>
      <SectionHeader
        eyebrow="How Matching Works"
        title="From profile to first date in four steps."
        align="center"
      />

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {matchingSteps.map((step, i) => (
          <GlassCard key={step.step} delay={i * 0.06} className="p-6 sm:p-7">
            <span className="font-mono text-sm font-bold text-accent">{step.step}</span>
            <h3 className="mt-3 font-display text-lg font-bold sm:text-xl">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              {step.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </Section>
  )
}
