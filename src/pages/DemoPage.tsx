import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { SiteLayout } from '../components/SiteLayout'
import { SectionHeader } from '../components/SectionHeader'
import { DemoMatchExplorer } from '../components/demo/DemoMatchExplorer'
import { DemoAccountsPanel } from '../components/demo/DemoAccountsPanel'
import { DemoFlowSection } from '../components/DemoFlowSection'
import { FindMatchButton } from '../components/matching/FindMatchButton'
import { CTA } from '../components/CTA'
import { PageBackLink } from '../components/PageBackLink'
import { Section } from '../components/Section'

export function DemoPage() {
  return (
    <SiteLayout>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-32 top-0 size-[480px] rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute right-0 top-1/4 size-[400px] rounded-full bg-rose-500/15 blur-[100px]" />
          <div className="absolute bottom-0 left-1/3 size-[520px] rounded-full bg-amber-500/12 blur-[130px]" />
          <div className="grid-dots absolute inset-0 opacity-30" />
        </div>

        <Section className="relative pb-0">
          <PageBackLink label="Back to home" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SectionHeader
              eyebrow="Interactive demo"
              title={
                <>
                  Same-uni matching,{' '}
                  <span className="text-gradient-spectrum">live on this page.</span>
                </>
              }
              description="Switch between Haruka, Kai, and Mei. Scores update in real time — same 90% gate, privacy rules, and date-plan logic as the logged-in app."
            />
          </motion.div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs text-accent-bright">
              <Sparkles className="size-3.5" />
              No login required here
            </span>
            <FindMatchButton variant="secondary" size="sm">
              Run match animation
            </FindMatchButton>
          </div>
        </Section>

        <div className="relative">
          <DemoMatchExplorer />
        </div>

        <Section border>
          <DemoAccountsPanel />
        </Section>

        <DemoFlowSection className="border-t-0" hideCta />

        <CTA
          title="Ready to try it for real?"
          subtitle="Log in as Haruka or Kai — same password, full mock flow through profile, match, schedule, and WhatsApp safety share."
          primary={{ label: 'Log in to demo', to: '/login' }}
          secondary={{ label: 'Back to Home', to: '/' }}
        />
      </div>
    </SiteLayout>
  )
}
