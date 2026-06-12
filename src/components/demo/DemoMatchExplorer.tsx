import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2, Sparkles } from 'lucide-react'
import { demoViewers, type DemoViewer } from '../../data/demoViewers'
import { demoCandidatePool } from '../../data/students'
import {
  DEMO_MIN_MATCH_SCORE,
  pickDemoDatePlan,
  rankDemoCandidates,
  type DemoMatchCandidate,
} from '../../lib/demoCompatibility'
import { PreviewDashboard } from '../preview/PreviewDashboard'
import { StudentMatchCard } from '../StudentMatchCard'
import { SectionHeader } from '../SectionHeader'
import { Section } from '../Section'
import { DemoViewerPicker } from './DemoViewerPicker'
import { cn } from '../../lib/cn'

function buildDashboardData(viewer: DemoViewer, match: DemoMatchCandidate | null) {
  if (!match?.eligible) {
    return null
  }

  const plan = pickDemoDatePlan(viewer, match.student, match.sharedInterests)

  return {
    profile: {
      name: viewer.name.split(' ')[0],
      initials: viewer.name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      university: viewer.university,
      course: viewer.course,
      interests: viewer.interests,
      status: 'Waiting pool · match found',
    },
    match: {
      partnerName: match.student.name,
      compatibility: match.breakdown.total,
      sharedInterests: match.sharedInterests,
      metrics: [
        {
          key: 'sameUni',
          label: 'Same Uni',
          value: 'Yes',
          icon: 'graduation' as const,
        },
        {
          key: 'sharedInterests',
          label: 'Shared Tags',
          value: String(match.sharedInterests.length || '—'),
          icon: 'sparkles' as const,
        },
        {
          key: 'dateEnergy',
          label: 'Date Energy',
          value: match.student.personalityType.split(' ')[0],
          icon: 'zap' as const,
        },
      ],
      signalBars: [
        { label: 'University', value: match.breakdown.university, accent: 'emerald' as const },
        { label: 'Interests', value: match.breakdown.sharedInterests, accent: 'purple' as const },
        { label: 'Personality', value: match.breakdown.personality, accent: 'emerald' as const },
        { label: 'Dating Goals', value: match.breakdown.datingGoals, accent: 'blue' as const },
        { label: 'Date Plan Fit', value: match.breakdown.lifestyle, accent: 'blue' as const },
      ],
    },
    datePlan: plan,
  }
}

export function DemoMatchExplorer() {
  const [viewer, setViewer] = useState<DemoViewer>(demoViewers[0])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const ranked = useMemo(
    () => rankDemoCandidates(viewer, demoCandidatePool),
    [viewer],
  )

  const sameUniPool = ranked.filter((r) => r.breakdown.university > 0)
  const eligible = ranked.filter((r) => r.eligible)
  const bestMatch = eligible[0] ?? null

  useEffect(() => {
    setSelectedId(bestMatch?.student.id ?? sameUniPool[0]?.student.id ?? null)
  }, [viewer.id, bestMatch?.student.id, sameUniPool.length])

  const selected =
    ranked.find((r) => r.student.id === selectedId) ?? bestMatch ?? ranked[0] ?? null
  const dashboard = buildDashboardData(viewer, selected?.eligible ? selected : bestMatch)

  return (
    <>
      <Section id="demo-explorer" dots className="border-t-0 pt-0">
        <SectionHeader
          eyebrow="Pick your persona"
          title={
            <>
              Watch the{' '}
              <span className="text-gradient-gold">same-uni matcher</span> think.
            </>
          }
          description="Haruka never shows a browse feed. Switch personas to see who clears the 90% bar at each campus."
          align="center"
        />

        <div className="mb-8">
          <DemoViewerPicker activeId={viewer.id} onChange={setViewer} />
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted">
            Pool: {sameUniPool.length} same-uni · {eligible.length} above {DEMO_MIN_MATCH_SCORE}%
          </span>
          {bestMatch ? (
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
              <CheckCircle2 className="size-3.5" />
              Best: {bestMatch.student.name} · {bestMatch.breakdown.total}%
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
              <AlertCircle className="size-3.5" />
              No 90%+ match yet — waiting pool
            </span>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {ranked.slice(0, 6).map((row, i) => (
            <StudentMatchCard
              key={row.student.id}
              student={row.student}
              index={i}
              demoMatch={row}
              selected={selected?.student.id === row.student.id}
              onSelect={() => setSelectedId(row.student.id)}
            />
          ))}
        </div>

        {!bestMatch && (
          <p className="mx-auto mt-6 max-w-lg rounded-2xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-center text-sm text-muted">
            <Sparkles className="mb-1 inline size-4 text-amber-300" /> Mei&apos;s Monash pool is
            empty in this mock — that&apos;s the real waiting-pool behavior until more students join
            her campus.
          </p>
        )}
      </Section>

      <Section border>
        <SectionHeader
          eyebrow="Match dashboard"
          title={
            <>
              {dashboard ? (
                <>
                  <span className="text-gradient-gold">{viewer.name.split(' ')[0]}</span> ↔{' '}
                  {dashboard.match.partnerName.split(' ')[0]}
                </>
              ) : (
                <>No match yet for {viewer.name.split(' ')[0]}</>
              )}
            </>
          }
          description={
            dashboard
              ? 'Profile, compatibility breakdown, and AI date plan — synced to your selection above.'
              : 'Select an eligible candidate or try Haruka / Kai at Sunway.'
          }
          align="center"
        />

        <div
          className={cn(!dashboard && 'pointer-events-none opacity-40 grayscale-[0.3]')}
        >
          <PreviewDashboard data={dashboard ?? undefined} />
        </div>
      </Section>
    </>
  )
}
