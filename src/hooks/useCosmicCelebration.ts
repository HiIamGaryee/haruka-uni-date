import { useEffect, useState } from 'react'
import { celebrationPhases } from '../data/cosmicMatch'

export type CelebrationPhaseKey = (typeof celebrationPhases)[number]['key']

export function useCosmicCelebration(active: boolean) {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [complete, setComplete] = useState(false)

  const totalDuration = celebrationPhases.reduce((sum, p) => sum + p.duration, 0)

  useEffect(() => {
    if (!active) {
      const reset = setTimeout(() => {
        setPhaseIndex(0)
        setComplete(false)
      }, 0)
      return () => clearTimeout(reset)
    }

    const timeouts: ReturnType<typeof setTimeout>[] = []
    let elapsed = 0

    celebrationPhases.forEach((phase, i) => {
      timeouts.push(
        setTimeout(() => {
          setPhaseIndex(i)
          if (i === celebrationPhases.length - 1) {
            timeouts.push(setTimeout(() => setComplete(true), phase.duration))
          }
        }, elapsed),
      )
      elapsed += phase.duration
    })

    return () => timeouts.forEach(clearTimeout)
  }, [active])

  const phase = celebrationPhases[phaseIndex]
  const phaseKey = phase?.key ?? 'pause'

  const isAtLeast = (key: CelebrationPhaseKey) => {
    const target = celebrationPhases.findIndex((p) => p.key === key)
    return phaseIndex >= target
  }

  return {
    phase,
    phaseIndex,
    phaseKey,
    complete,
    totalDuration,
    isAtLeast,
  }
}
