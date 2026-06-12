import { GraduationCap, MapPin, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { previewProfile, type PreviewProfileData } from '../../data/previewDashboard'

type DashboardProfileCardProps = {
  profile?: PreviewProfileData
}

export function DashboardProfileCard({ profile = previewProfile }: DashboardProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="dash-card dash-card-hover flex h-full flex-col p-5 sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="dash-label">Student Profile</span>
        <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
          <User className="size-3.5" />
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-blue-500 to-violet-500 text-lg font-bold text-white shadow-lg shadow-violet-500/20">
          {profile.initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-bold sm:text-xl">{profile.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="size-3.5 shrink-0 text-blue-400" />
            <span className="truncate">{profile.university}</span>
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
        <p className="dash-label mb-1">Course</p>
        <p className="flex items-center gap-2 text-sm font-medium">
          <GraduationCap className="size-4 shrink-0 text-purple-400" />
          {profile.course}
        </p>
      </div>

      <div className="mt-4 flex-1">
        <p className="dash-label mb-2.5">Interests</p>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-muted"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
          Status
        </p>
        <p className="mt-0.5 text-xs text-muted">
          {profile.status ?? 'Profile complete · Ready to match'}
        </p>
      </div>
    </motion.div>
  )
}
