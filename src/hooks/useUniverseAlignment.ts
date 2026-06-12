import { useEffect, useState } from 'react'

export type AlignmentStage =
  | 'idle'
  | 'stars'
  | 'constellation'
  | 'planets'
  | 'traits'
  | 'vortex'
  | 'merge'

const STAGE_DELAYS: { stage: AlignmentStage; at: number }[] = [
  { stage: 'stars', at: 0 },
  { stage: 'constellation', at: 2000 },
  { stage: 'planets', at: 3500 },
  { stage: 'traits', at: 5000 },
  { stage: 'vortex', at: 6500 },
  { stage: 'merge', at: 8000 },
]

export function useUniverseAlignment(active: boolean, runKey: number) {
  const [stage, setStage] = useState<AlignmentStage>('idle')

  useEffect(() => {
    if (!active) {
      const reset = setTimeout(() => setStage('idle'), 0)
      return () => clearTimeout(reset)
    }

    const timers = STAGE_DELAYS.map(({ stage: next, at }) =>
      setTimeout(() => setStage(next), at),
    )

    return () => timers.forEach(clearTimeout)
  }, [active, runKey])

  const stageIndex = STAGE_DELAYS.findIndex((s) => s.stage === stage)

  return { stage, stageIndex }
}
