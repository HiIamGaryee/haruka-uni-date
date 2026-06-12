import { useEffect, useRef, useState } from 'react'
import { futureMemories, futureMemoriesContent } from '../../data/futureMemories'
import { seededRandom } from '../../lib/seededRandom'
import { Section } from '../Section'
import { SectionHeader } from '../SectionHeader'
import { MemoryCard } from './MemoryCard'
import { TwinkleStars } from './TwinkleStars'

export function FutureMemoriesSection() {
  const [glowIndex, setGlowIndex] = useState(0)
  const pulseRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      pulseRef.current += 1
      setGlowIndex((prev) => {
        const roll = Math.floor(seededRandom(pulseRef.current + 42) * futureMemories.length)
        return roll === prev ? (roll + 1) % futureMemories.length : roll
      })
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Section id="future-memories" border className="overflow-hidden">
      <div className="memory-stage relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-[#0d0a14] via-[#0a0a10] to-[#0a0a0f] px-4 py-10 sm:px-8 sm:py-14">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/8 via-transparent to-rose-500/6" />
        <TwinkleStars count={48} />

        <div className="relative z-10">
          <SectionHeader
            eyebrow={futureMemoriesContent.eyebrow}
            title={
              <>
                Moments you haven&apos;t lived yet{' '}
                <span className="text-gradient-rose">but already feel real.</span>
              </>
            }
            description={futureMemoriesContent.description}
            align="center"
          />

          <div className="mx-auto grid max-w-4xl grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {futureMemories.map((memory, i) => (
              <div
                key={memory.id}
                className={
                  i === 2
                    ? 'sm:col-span-2 lg:col-span-1'
                    : i === 4
                      ? 'lg:col-span-1 lg:justify-self-end'
                      : ''
                }
              >
                <MemoryCard memory={memory} index={i} glowing={glowIndex === i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
