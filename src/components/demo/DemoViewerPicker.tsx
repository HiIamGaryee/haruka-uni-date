import { motion } from 'framer-motion'
import { demoViewers, viewerInitials, type DemoViewer } from '../../data/demoViewers'
import { cn } from '../../lib/cn'

type DemoViewerPickerProps = {
  activeId: string
  onChange: (viewer: DemoViewer) => void
}

export function DemoViewerPicker({ activeId, onChange }: DemoViewerPickerProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {demoViewers.map((viewer, i) => {
        const active = viewer.id === activeId
        return (
          <motion.button
            key={viewer.id}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onChange(viewer)}
            className={cn(
              'relative overflow-hidden rounded-2xl border p-4 text-left transition',
              active
                ? 'border-accent/40 bg-gradient-to-br from-accent/15 via-violet-500/10 to-rose-500/10 shadow-[0_0_32px_rgba(234,179,8,0.15)]'
                : 'border-white/10 bg-white/[0.03] hover:border-white/20',
            )}
          >
            <div
              className={cn(
                'pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-gradient-to-br opacity-40 blur-2xl',
                viewer.accent,
              )}
              aria-hidden
            />
            <div className="relative flex items-center gap-3">
              <div
                className={cn(
                  'flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white',
                  viewer.accent,
                )}
              >
                {viewerInitials(viewer.name)}
              </div>
              <div className="min-w-0">
                <p className="font-display text-sm font-bold">{viewer.name}</p>
                <p className="truncate text-[11px] text-muted">{viewer.university}</p>
              </div>
            </div>
            <p className="relative mt-2 text-[11px] leading-relaxed text-dim">{viewer.tagline}</p>
          </motion.button>
        )
      })}
    </div>
  )
}
