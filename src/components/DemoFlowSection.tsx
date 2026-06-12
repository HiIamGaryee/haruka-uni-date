import { demoFlowContent, demoSteps } from '../data/demoFlow'
import { DemoFlowStepCard } from './DemoFlowStepCard'
import { SectionHeader } from './SectionHeader'
import { Section } from './Section'
import { Button } from './Button'

type DemoFlowSectionProps = {
  className?: string
  hideCta?: boolean
}

export function DemoFlowSection({ className, hideCta = false }: DemoFlowSectionProps) {
  return (
    <Section id="demo-flow" border dots className={className}>
      <SectionHeader
        eyebrow={demoFlowContent.eyebrow}
        title={
          <>
            What happens{' '}
            <span className="text-gradient-gold">after you sign up.</span>
          </>
        }
        description={demoFlowContent.description}
        align="center"
      />

      <div className="relative">
        <div
          className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block"
          aria-hidden
        />

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-4">
          {demoSteps.map((step, i) => (
            <DemoFlowStepCard
              key={step.step}
              step={step}
              index={i}
              isLast={i === demoSteps.length - 1}
            />
          ))}
        </div>
      </div>

      {!hideCta && (
        <div className="mt-10 flex justify-center">
          <Button to="/demo" variant="secondary">
            Open full demo →
          </Button>
        </div>
      )}
    </Section>
  )
}
