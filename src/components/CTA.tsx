import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { ctaContent } from '../data/homepage'
import { easeOut } from '../lib/motion'
import { Button } from './Button'
import { GlassCard } from './GlassCard'
import { Section } from './Section'
import { cn } from '../lib/cn'

type CTAAction = {
  label: string
  href?: string
  to?: string
}

type CTAProps = {
  id?: string
  title?: string
  subtitle?: string
  primary?: CTAAction
  secondary?: CTAAction
  className?: string
  children?: ReactNode
}

export function CTA({
  id = 'cta',
  title = ctaContent.title,
  subtitle = ctaContent.subtitle,
  secondary = ctaContent.ctaSecondary,
  className,
  children,
}: CTAProps) {
  const secondaryIsDemo = secondary.to === '/demo' || secondary.label.toLowerCase().includes('demo')

  return (
    <Section id={id} className={cn('pb-20 sm:pb-24 lg:pb-28', className)}>
      <GlassCard strong hover={false} className="relative overflow-hidden p-8 text-center sm:p-12 lg:p-14 glow-accent">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-violet-500/8" />
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent/12 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-violet-500/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="relative"
        >
          {children ?? (
            <>
              <h2 className="font-display text-[1.65rem] font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
                {subtitle}
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center">
                <Button to="/register" className="w-full sm:w-auto sm:min-w-[180px]">
                  Start Matching
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  href={secondary.href}
                  to={secondary.to}
                  variant="secondary"
                  className="w-full sm:w-auto sm:min-w-[180px]"
                >
                  {secondaryIsDemo && <Play className="size-4" />}
                  {secondary.label}
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </GlassCard>
    </Section>
  )
}
