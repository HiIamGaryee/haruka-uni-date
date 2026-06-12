import { motion } from 'framer-motion'
import {
  defaultPreviewDashboard,
  type PreviewDashboardData,
} from '../../data/previewDashboard'
import { DashboardProfileCard } from './DashboardProfileCard'
import { DashboardMatchCard } from './DashboardMatchCard'
import { DashboardDatePlanCard } from './DashboardDatePlanCard'

type PreviewDashboardProps = {
  data?: PreviewDashboardData
}

export function PreviewDashboard({ data = defaultPreviewDashboard }: PreviewDashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="dash-shell relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c10]/90 p-3 shadow-2xl shadow-black/50 sm:rounded-3xl sm:p-4"
    >
      <div
        className="pointer-events-none absolute -left-20 top-0 size-56 rounded-full bg-violet-600/15 blur-[80px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 right-0 size-48 rounded-full bg-amber-500/10 blur-[70px]"
        aria-hidden
      />

      <div className="relative mb-3 flex items-center gap-2 border-b border-white/8 px-1 pb-3 sm:px-2">
        <span className="size-2.5 rounded-full bg-rose-500/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-2 truncate font-mono text-[10px] text-dim sm:text-[11px]">
          haruka.app/match-result
        </span>
      </div>

      <div className="relative grid gap-3 lg:grid-cols-3 lg:gap-4">
        <DashboardProfileCard profile={data.profile} />
        <DashboardMatchCard match={data.match} />
        <DashboardDatePlanCard datePlan={data.datePlan} />
      </div>
    </motion.div>
  )
}
