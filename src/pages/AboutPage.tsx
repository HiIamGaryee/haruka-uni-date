import { SiteLayout } from '../components/SiteLayout'
import { SectionHeader } from '../components/SectionHeader'
import { GlassCard } from '../components/GlassCard'
import { CTA } from '../components/CTA'
import { PageBackLink } from '../components/PageBackLink'
import { Section } from '../components/Section'
import { aboutContent } from '../data/about'

export function AboutPage() {
  return (
    <SiteLayout>
      <Section className="pb-0">
        <PageBackLink />
        <SectionHeader
          eyebrow={aboutContent.eyebrow}
          title={
            <>
              Built by students,{' '}
              <span className="text-gradient-gold">for students.</span>
            </>
          }
          description={aboutContent.description}
        />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {aboutContent.stats.map((stat, i) => (
            <GlassCard key={stat.label} delay={i * 0.05} className="p-6 text-center sm:p-7">
              <p className="font-display text-3xl font-bold text-gradient-spectrum sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section border className="bg-bg-elevated/40 pt-0">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <GlassCard strong className="p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold sm:text-2xl">
              {aboutContent.mission.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {aboutContent.mission.body}
            </p>
          </GlassCard>

          <GlassCard className="p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold sm:text-2xl">
              {aboutContent.story.title}
            </h2>
            <div className="mt-4 space-y-4">
              {aboutContent.story.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-sm leading-relaxed text-muted sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </GlassCard>
        </div>
      </Section>

      <Section border>
        <SectionHeader
          eyebrow="Our Values"
          title="What we stand for."
          align="center"
        />
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {aboutContent.values.map((value, i) => (
            <GlassCard key={value.title} delay={i * 0.06} className="p-6 sm:p-7">
              <h3 className="font-display text-lg font-bold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {value.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <CTA
        title="Want to see Haruka in action?"
        subtitle="Explore the match dashboard demo or head back to the landing page."
        primary={{ label: 'Login', to: '/login' }}
        secondary={{ label: 'Back to Home', to: '/' }}
      />
    </SiteLayout>
  )
}
