import { createContext } from 'react'

export type MatchingContextValue = {
  isOpen: boolean
  openMatching: () => void
  closeMatching: () => void
  isCelebrationOpen: boolean
  openCelebration: () => void
  closeCelebration: () => void
}

export const MatchingContext = createContext<MatchingContextValue | null>(null)
