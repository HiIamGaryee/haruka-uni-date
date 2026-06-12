import { useEffect, useState } from 'react'

export function useCountUp(
  target: number,
  active: boolean,
  duration = 1200,
  startDelay = 0,
) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) {
      const reset = setTimeout(() => setValue(0), 0)
      return () => clearTimeout(reset)
    }

    let raf = 0
    const start = performance.now() + startDelay

    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick)
        return
      }
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration, startDelay])

  return value
}
