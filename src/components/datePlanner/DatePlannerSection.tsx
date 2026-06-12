import { motion } from 'framer-motion'
import { usePlannerReveal } from '../../hooks/usePlannerReveal'
import { datePlannerContent } from '../../data/datePlanner'
import { SectionHeader } from '../SectionHeader'
import { Section } from '../Section'
import { PreferencesPanel } from './PreferencesPanel'
import { AIAnalysisPanel } from './AIAnalysisPanel'
import { DateTimelinePanel } from './DateTimelinePanel'
import { ConversationStarters } from './ConversationStarters'
import { SafetyLayer } from './SafetyLayer'
import { AlternativePlans } from './AlternativePlans'
import { SmartInsights } from './SmartInsights'
import { MemoryPredictions } from './MemoryPredictions'
import { PlannerSkeleton } from './PlannerSkeleton'

export function DatePlannerSection() {
  const loading = usePlannerReveal(1100)

  return (
    <Section id="date-planner" border dots className="bg-bg-elevated/40">
      <SectionHeader
        eyebrow={datePlannerContent.eyebrow}
        title={
          <>
            Your first date,{' '}
            <span className="text-gradient-spectrum">engineered by AI.</span>
          </>
        }
        description={datePlannerContent.description}
        align="center"
      />

      {loading ? (
        <div className="grid gap-5 lg:grid-cols-3">
          <PlannerSkeleton />
          <PlannerSkeleton />
          <PlannerSkeleton />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="grid gap-5 xl:grid-cols-3 xl:gap-6">
            <PreferencesPanel />
            <AIAnalysisPanel />
            <DateTimelinePanel />
          </div>

          <ConversationStarters />
          <SafetyLayer />
          <div className="grid gap-6 lg:grid-cols-2">
            <AlternativePlans />
            <SmartInsights />
          </div>
          <MemoryPredictions />
        </motion.div>
      )}
    </Section>
  )
}
