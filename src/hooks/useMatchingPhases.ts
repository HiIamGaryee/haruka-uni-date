import { useEffect, useState } from 'react'
import { matchingPhases } from '../data/matchingAnimation'

export function useMatchingPhases(active: boolean) {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)

  const totalDuration = matchingPhases.reduce((sum, p) => sum + p.duration, 0)

  useEffect(() => {
    if (!active) {
      const reset = setTimeout(() => {
        setPhaseIndex(0)
        setProgress(0)
        setComplete(false)
      }, 0)
      return () => clearTimeout(reset)
    }

    let elapsed = 0
    let phase = 0
    const boot = setTimeout(() => {
      setPhaseIndex(0)
      setProgress(0)
      setComplete(false)
    }, 0)

    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      elapsed = now - start
      setProgress(Math.min((elapsed / totalDuration) * 100, 100))

      let accumulated = 0
      for (let i = 0; i < matchingPhases.length; i++) {
        accumulated += matchingPhases[i].duration
        if (elapsed < accumulated) {
          if (i !== phase) {
            phase = i
            setPhaseIndex(i)
          }
          break
        }
        if (i === matchingPhases.length - 1 && elapsed >= totalDuration) {
          setPhaseIndex(matchingPhases.length - 1)
          setComplete(true)
        }
      }

      if (elapsed < totalDuration) {
        raf = requestAnimationFrame(tick)
      } else {
        setProgress(100)
        setComplete(true)
      }
    }

    const startRaf = setTimeout(() => {
      raf = requestAnimationFrame(tick)
    }, 0)

    return () => {
      clearTimeout(boot)
      clearTimeout(startRaf)
      cancelAnimationFrame(raf)
    }
  }, [active, totalDuration])

  return {
    phase: matchingPhases[phaseIndex],
    phaseIndex,
    progress,
    complete,
    totalDuration,
  }
}
