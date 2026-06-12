import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useRef, useState } from 'react'
import { journeySteps } from '../data/journeyTimeline'

export function useJourneyProgress() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setProgress(value)
    const index = Math.min(
      journeySteps.length - 1,
      Math.max(0, Math.floor(value * journeySteps.length)),
    )
    setActiveIndex(index)
  })

  return { containerRef, activeIndex, progress }
}
