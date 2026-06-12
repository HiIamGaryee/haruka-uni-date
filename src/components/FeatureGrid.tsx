import {
  BookOpen,
  Flame,
  GraduationCap,
  HeartHandshake,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { features } from '../data/homepage'
import { FeatureCard } from './FeatureCard'
import { SectionHeader } from './SectionHeader'
import { Section } from './Section'

const iconMap = {
  graduationCap: GraduationCap,
  heartHandshake: HeartHandshake,
  bookOpen: BookOpen,
  sparkles: Sparkles,
  users: Users,
  shieldCheck: ShieldCheck,
  flame: Flame,
  rocket: Rocket,
} as const

export function FeatureGrid() {
  return (
    <Section id="features" border>
      <SectionHeader
        eyebrow="Features"
        title={
          <>
            Everything you need for{' '}
            <span className="text-gradient-spectrum">campus-grade matching.</span>
          </>
        }
        align="center"
      />

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {features.map((feature, i) => {
          const Icon = iconMap[feature.icon]
          return (
            <FeatureCard
              key={feature.title}
              icon={Icon}
              title={feature.title}
              description={feature.description}
              index={i}
              delay={i * 0.04}
            />
          )
        })}
      </div>
    </Section>
  )
}
