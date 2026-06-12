import {
  BatteryMedium,
  Clock,
  Cloud,
  Footprints,
  Heart,
  MessageCircle,
  Music,
  Shield,
  Sparkles,
  Target,
  Timer,
  Utensils,
  Wallet,
} from 'lucide-react'
import type { DatePreference } from '../../data/datePlanner'
import { preferences } from '../../data/datePlanner'
import { PlannerCard } from './PlannerCard'
import { cn } from '../../lib/cn'

const iconMap = {
  wallet: Wallet,
  clock: Clock,
  sparkles: Sparkles,
  utensils: Utensils,
  footprints: Footprints,
  battery: BatteryMedium,
  shield: Shield,
  message: MessageCircle,
  music: Music,
  heart: Heart,
  timer: Timer,
  cloud: Cloud,
  target: Target,
} as const

function PreferenceRow({ item }: { item: DatePreference }) {
  const Icon = iconMap[item.icon]
  return (
    <div
      className={cn(
        'group rounded-2xl border border-white/8 bg-white/[0.03] p-3.5 transition-colors',
        'hover:border-white/15 hover:bg-white/[0.05]',
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition-colors group-hover:bg-violet-500/20">
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-dim">
            {item.label}
          </p>
          <p className="mt-0.5 text-sm font-medium">{item.value}</p>
          {item.tags && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function PreferencesPanel() {
  return (
    <PlannerCard delay={0.05} className="h-full">
      <div className="border-b border-white/8 bg-white/[0.02] px-5 py-4 sm:px-6">
        <p className="font-mono text-[10px] text-dim">preferences.panel</p>
        <h3 className="font-display text-lg font-bold">Date Preferences</h3>
        <p className="mt-1 text-xs text-muted">Editable match context for AI planning</p>
      </div>
      <div className="max-h-[520px] space-y-2 overflow-y-auto p-4 sm:p-5">
        {preferences.map((item) => (
          <PreferenceRow key={item.id} item={item} />
        ))}
      </div>
    </PlannerCard>
  )
}
