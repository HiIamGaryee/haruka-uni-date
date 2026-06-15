import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2, Sparkles } from 'lucide-react'
import { demoViewers, type DemoViewer } from '../../data/demoViewers'
import { demoCandidatePool } from '../../data/students'
import {
  DEMO_MIN_MATCH_SCORE,
  rankDemoCandidates,
} from '../../lib/demoCompatibility'
import { StudentMatchCard } from '../StudentMatchCard'
import { SectionHeader } from '../SectionHeader'
import { Section } from '../Section'
import { DemoViewerPicker } from './DemoViewerPicker'
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

  return (
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
  )
}
