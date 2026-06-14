import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Logo } from '../../components/Logo'

type AuthLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-4 py-12">
      <div className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-violet-500/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <Logo className="mb-8" imageClassName="h-10 sm:h-11" />
        <div className="glass-strong rounded-[28px] p-8">
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
          <div className="mt-6">{children}</div>
          <div className="mt-6 text-center text-sm text-muted">{footer}</div>
        </div>
      </motion.div>
    </div>
  )
}
