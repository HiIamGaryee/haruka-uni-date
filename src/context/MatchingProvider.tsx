import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { MatchingContext } from './matchingContext'

export function MatchingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false)

  const openMatching = useCallback(() => setIsOpen(true), [])
  const closeMatching = useCallback(() => setIsOpen(false), [])
  const openCelebration = useCallback(() => setIsCelebrationOpen(true), [])
  const closeCelebration = useCallback(() => setIsCelebrationOpen(false), [])

  const value = useMemo(
    () => ({
      isOpen,
      openMatching,
      closeMatching,
      isCelebrationOpen,
      openCelebration,
      closeCelebration,
    }),
    [isOpen, openMatching, closeMatching, isCelebrationOpen, openCelebration, closeCelebration],
  )

  return (
    <MatchingContext.Provider value={value}>{children}</MatchingContext.Provider>
  )
}
