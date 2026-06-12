import { Hero } from '../components/Hero'
import { ProblemSection } from '../components/ProblemSection'
import { SolutionSection } from '../components/SolutionSection'
import { HowMatchingWorks } from '../components/HowMatchingWorks'
import { DemoFlowSection } from '../components/DemoFlowSection'
import { FeatureGrid } from '../components/FeatureGrid'
import { UniverseAlignmentSection } from '../components/cosmos/UniverseAlignmentSection'
import { CompatibilityDNASection } from '../components/matching/CompatibilityDNASection'
import { MatchingCinematicSection } from '../components/matching/MatchingCinematicSection'
import { MatchScoreEngine } from '../components/MatchScoreEngine'
import { ProductPreview } from '../components/ProductPreview'
import { FutureMemoriesSection } from '../components/memories/FutureMemoriesSection'
import { CTA } from '../components/CTA'
import { SiteLayout } from '../components/SiteLayout'

export function HomePage() {
  return (
    <SiteLayout showAnnouncement>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowMatchingWorks />
      <DemoFlowSection />
      <FeatureGrid />
      <MatchScoreEngine />
      <MatchingCinematicSection />
      <CompatibilityDNASection />
      <UniverseAlignmentSection />
      <ProductPreview />
      <FutureMemoriesSection />
      <CTA />
    </SiteLayout>
  )
}
