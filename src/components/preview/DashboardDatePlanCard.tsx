import { motion } from 'framer-motion'
import { Clock, MapPin, MessageCircle, Sparkles, Wallet } from 'lucide-react'
import {
  previewDatePlan,
  previewDatePlanFields,
  type PreviewDatePlanData,
} from '../../data/previewDashboard'

const fieldIcons = {
  mapPin: MapPin,
  clock: Clock,
  wallet: Wallet,
  message: MessageCircle,
} as const

type DashboardDatePlanCardProps = {
  datePlan?: PreviewDatePlanData
}

export function DashboardDatePlanCard({ datePlan = previewDatePlan }: DashboardDatePlanCardProps) {
  const fields = previewDatePlanFields(datePlan)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.16 }}
      className="dash-card dash-card-hover flex h-full flex-col p-5 sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="dash-label">AI Date Plan</span>
        <span className="flex size-7 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
          <Sparkles className="size-3.5" />
        </span>
      </div>

      <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-violet-500/5 to-emerald-500/5 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">
          Plan title
        </p>
        <h3 className="mt-1 font-display text-lg font-bold leading-snug">
          {datePlan.title}
        </h3>
      </div>

      <div className="mt-4 flex-1 space-y-2.5">
        {fields.map((field) => {
          const Icon = fieldIcons[field.icon]
          const isIcebreaker = field.key === 'icebreaker'
          return (
            <div
              key={field.key}
              className={
                isIcebreaker
                  ? 'rounded-xl border border-violet-500/20 bg-violet-500/5 px-3.5 py-3'
                  : 'rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-3'
              }
            >
              <div className="flex items-start gap-3">
                <span
                  className={
                    isIcebreaker
                      ? 'flex size-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400'
                      : 'flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-muted'
                  }
                >
                  <Icon className="size-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="dash-label">{field.label}</p>
                  <p
                    className={
                      isIcebreaker
                        ? 'mt-1 text-sm italic leading-relaxed text-muted'
                        : 'mt-0.5 text-sm font-medium'
                    }
                  >
                    {field.value}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
        <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
        <p className="text-[11px] text-muted">Generated from both profiles · Updated just now</p>
      </div>
    </motion.div>
  )
}
