import { useContext } from 'react'
import { MatchingContext } from '../context/matchingContext'

export function useMatching() {
  const ctx = useContext(MatchingContext)
  if (!ctx) {
    throw new Error('useMatching must be used within MatchingProvider')
  }
  return ctx
}
