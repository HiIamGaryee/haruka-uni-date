import { LogIn, Sparkles } from 'lucide-react'
import { demoAccounts } from '../../data/demoViewers'
import { Button } from '../Button'

export function DemoAccountsPanel() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-accent/20 bg-gradient-to-br from-accent/10 via-violet-500/5 to-rose-500/10 p-6 sm:p-8">
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent">
            <Sparkles className="size-3" />
            try the real flow
          </p>
          <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">
            Log in and run the full mock match
          </h3>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Same logic as this page — mock auth, same-uni gate, 90%+ threshold, date plan, and
            schedule picker. Password for all accounts: <span className="text-fg">demo1234</span>
          </p>
        </div>
        <Button to="/login" className="glow-accent shrink-0">
          <LogIn className="size-4" />
          Open live demo
        </Button>
      </div>

      <div className="relative mt-6 grid gap-2 sm:grid-cols-3">
        {demoAccounts.map((account) => (
          <div
            key={account.email}
            className="rounded-xl border border-white/10 bg-bg/40 px-3 py-2.5 font-mono text-[11px]"
          >
            <p className="text-accent-bright">{account.email}</p>
            <p className="mt-1 text-dim">{account.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
