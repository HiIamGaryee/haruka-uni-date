import { motion } from 'framer-motion'
import { Cpu, Sparkles } from 'lucide-react'
import {
  matchScoreContent,
  overallScore,
  signalScores,
} from '../data/matchScore'
import { easeOut } from '../lib/motion'
import { FindMatchButton } from './matching/FindMatchButton'
import { ScoreProgressBar } from './ScoreProgressBar'
import { SectionHeader } from './SectionHeader'
import { Section } from './Section'
import { DecorativeAsset } from './visual/DecorativeAsset'

export function MatchScoreEngine() {
  return (
    <Section id="match-engine" border className="bg-bg-elevated/30">
      <SectionHeader
        eyebrow={matchScoreContent.eyebrow}
        title={
          <>
            Transparent AI{' '}
            <span className="text-gradient-spectrum">compatibility scoring.</span>
          </>
        }
        align="center"
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="glass-strong glow-accent mx-auto max-w-4xl overflow-hidden"
      >
        <div className="border-b border-white/8 bg-white/[0.03] px-5 py-4 sm:px-8 sm:py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Cpu className="size-4" />
              </span>
              <div>
                <p className="font-mono text-[11px] text-dim">haruka.match.engine</p>
                <p className="text-sm font-semibold">Compatibility Report</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
              AI scored
            </span>
          </div>
        </div>

        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10">
          <div className="relative flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-dim">
              Overall Match
            </p>
            <div className="relative my-4 flex size-36 items-center justify-center sm:size-40">
              <DecorativeAsset placementId="match-engine-score" />
              <svg className="absolute inset-0 z-10 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="7"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#engineGradient)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={264}
                  initial={{ strokeDashoffset: 264 }}
                  whileInView={{
                    strokeDashoffset: 264 - (264 * overallScore) / 100,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: easeOut }}
                />
                <defs>
                  <linearGradient id="engineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="50%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="relative z-10">
                <p className="font-display text-4xl font-bold text-gradient-spectrum sm:text-5xl">
                  {overallScore}%
                </p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Weighted composite across all student profile signals.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {signalScores.map((score, i) => (
              <ScoreProgressBar
                key={score.key}
                label={score.label}
                value={score.value}
                accent={score.accent}
                delay={0.1 + i * 0.08}
                large
              />
            ))}
          </div>
        </div>

        <div className="border-t border-white/8 bg-white/[0.02] px-5 py-4 sm:px-8 sm:py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-muted">
                {matchScoreContent.explanation}
              </p>
            </div>
            <FindMatchButton size="sm" className="shrink-0" />
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
