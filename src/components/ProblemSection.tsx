import { problemContent } from '../data/homepage'
import { GlassCard } from './GlassCard'
import { SectionHeader } from './SectionHeader'
import { Section } from './Section'

export function ProblemSection() {
  return (
    <Section id="problem" border>
      <SectionHeader
        eyebrow={problemContent.eyebrow}
        title={
          <>
            Campus dating is{' '}
            <span className="text-gradient-rose">broken by design.</span>
          </>
        }
        description={problemContent.description}
      />

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {problemContent.painPoints.map((point, i) => (
          <GlassCard key={point.label} delay={i * 0.05} className="p-6 sm:p-7">
            <p className="font-display text-3xl font-bold text-accent sm:text-4xl lg:text-5xl">
              {point.stat}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {point.label}
            </p>
          </GlassCard>
        ))}
      </div>
    </Section>
  )
}
