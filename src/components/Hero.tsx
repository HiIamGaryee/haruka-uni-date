import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { heroContent, heroStats } from '../data/homepage'
import { decorationAssets } from '../data/visualAssets'
import { fadeUpDelayed } from '../lib/motion'
import { FindMatchButton } from './matching/FindMatchButton'
import { Button } from './Button'
import { GlassCard } from './GlassCard'
import { AssetImage } from './visual/AssetImage'

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
      <div className="section-container relative">
        <motion.p
          {...fadeUpDelayed(0)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-bright"
        >
          <span className="size-1.5 animate-pulse rounded-full bg-accent" />
          {heroContent.eyebrow}
        </motion.p>

        <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-14">
          <div>
            <motion.h1
              {...fadeUpDelayed(0.08)}
              className="max-w-4xl font-display text-[2rem] font-bold leading-[1.05] tracking-tight min-[390px]:text-[2.25rem] sm:text-5xl lg:text-6xl xl:text-[4rem]"
            >
              {heroContent.title}
            </motion.h1>

            <motion.p
              {...fadeUpDelayed(0.16)}
              className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg lg:text-xl"
            >
              {heroContent.subtitle}
            </motion.p>

            <motion.div
              {...fadeUpDelayed(0.24)}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
            >
              <FindMatchButton showIcon={false} className="sm:min-w-[180px]">
                Find Match
                <ArrowRight className="size-4" />
              </FindMatchButton>
              <Button to={heroContent.ctaSecondary.to} variant="secondary">
                <Play className="size-4" />
                {heroContent.ctaSecondary.label}
              </Button>
            </motion.div>
          </div>

          <motion.div {...fadeUpDelayed(0.32)} className="relative">
            <AssetImage
              asset={decorationAssets.glassPlatform}
              animate="float"
              className="pointer-events-none absolute -bottom-6 left-1/2 z-0 w-[min(72vw,220px)] -translate-x-1/2 opacity-55 sm:w-[240px]"
            />
            <GlassCard strong className="relative z-10 glow-accent p-5 sm:p-6">
              <p className="mb-4 font-mono text-xs text-dim">haruka.match</p>
              <div className="grid grid-cols-2 gap-3">
                {heroStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                    className="rounded-xl border border-white/8 bg-bg/40 px-3 py-3.5 sm:px-4 sm:py-4"
                  >
                    <p className="font-display text-xl font-bold text-gradient-gold sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] text-muted sm:text-xs">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
