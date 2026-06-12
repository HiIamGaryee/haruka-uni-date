import type { DemoStepMock } from '../data/demoFlow'

type DemoFlowMockUIProps = {
  mock: DemoStepMock
}

export function DemoFlowMockUI({ mock }: DemoFlowMockUIProps) {
  if (mock.type === 'profile') {
    return (
      <div className="mt-5 rounded-xl border border-white/8 bg-bg/50 p-3.5">
        <p className="mb-2.5 font-mono text-[10px] text-dim">profile.form</p>
        <div className="space-y-2">
          {mock.fields.map((field) => (
            <div
              key={field.label}
              className="rounded-lg border border-white/6 bg-white/[0.03] px-3 py-2"
            >
              <p className="text-[10px] text-dim">{field.label}</p>
              <p className="text-xs font-medium">{field.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {mock.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (mock.type === 'comfort') {
    return (
      <div className="mt-5 rounded-xl border border-white/8 bg-bg/50 p-3.5">
        <p className="mb-2.5 font-mono text-[10px] text-dim">comfort.level</p>
        <div className="grid grid-cols-2 gap-1.5">
          {mock.options.map((option) => {
            const active = option === mock.selected
            return (
              <span
                key={option}
                className={
                  active
                    ? 'rounded-lg border border-violet-500/30 bg-violet-500/15 px-2 py-1.5 text-center text-[10px] font-medium text-violet-300'
                    : 'rounded-lg border border-white/6 bg-white/[0.02] px-2 py-1.5 text-center text-[10px] text-dim'
                }
              >
                {option}
              </span>
            )
          })}
        </div>
      </div>
    )
  }

  if (mock.type === 'score') {
    return (
      <div className="mt-5 rounded-xl border border-white/8 bg-bg/50 p-3.5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono text-[10px] text-dim">match.score</p>
          <span className="font-display text-lg font-bold text-accent">{mock.overall}%</span>
        </div>
        <div className="space-y-2">
          {mock.signals.map((signal) => (
            <div key={signal.label}>
              <div className="mb-1 flex justify-between text-[10px]">
                <span className="text-dim">{signal.label}</span>
                <span className="font-mono text-muted">{signal.value}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500"
                  style={{ width: `${signal.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-5 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-violet-500/5 p-3.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">
        AI date plan
      </p>
      <p className="mt-1 text-sm font-semibold">{mock.title}</p>
      <div className="mt-2 space-y-1 text-[11px] text-muted">
        <p>📍 {mock.location}</p>
        <p>💰 {mock.budget}</p>
        <p className="italic text-violet-300/80">&ldquo;{mock.icebreaker}&rdquo;</p>
      </div>
    </div>
  )
}
