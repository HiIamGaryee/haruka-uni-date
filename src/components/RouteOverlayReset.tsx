import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useMatching } from '../hooks/useMatching'

/** Close full-screen overlays when the route changes so navigation is never blocked. */
export function RouteOverlayReset() {
  const { pathname } = useLocation()
  const { closeMatching, closeCelebration } = useMatching()

  useEffect(() => {
    closeMatching()
    closeCelebration()
    document.body.style.overflow = ''
  }, [pathname, closeMatching, closeCelebration])

  return null
}
