import { SiteLayout } from '../components/SiteLayout'
import { SectionHeader } from '../components/SectionHeader'
import { FaqAccordion } from '../components/FaqAccordion'
import { CTA } from '../components/CTA'
import { PageBackLink } from '../components/PageBackLink'
import { Section } from '../components/Section'
import { faqContent, faqItems } from '../data/faq'

export function FaqPage() {
  return (
    <SiteLayout>
      <Section>
        <div className="mx-auto max-w-3xl">
          <PageBackLink />
          <SectionHeader
            eyebrow={faqContent.eyebrow}
            title={
              <>
                Questions?{' '}
                <span className="text-gradient-spectrum">We have answers.</span>
              </>
            }
            description={faqContent.description}
          />
          <FaqAccordion items={faqItems} />
        </div>
      </Section>

      <CTA
        title="Still curious?"
        subtitle="Read about the team behind Haruka or jump into the live product demo."
        primary={{ label: 'About Us', to: '/about' }}
        secondary={{ label: 'View Demo', to: '/demo' }}
      />
    </SiteLayout>
  )
}
