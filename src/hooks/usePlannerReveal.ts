import { useEffect, useState } from 'react'

export function usePlannerReveal(delayMs = 900) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delayMs)
    return () => clearTimeout(timer)
  }, [delayMs])

  return loading
}
