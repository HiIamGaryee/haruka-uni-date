import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Button } from './Button'
import { useAuth } from '../hooks/useAuth'
import { cn } from '../lib/cn'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { user, loading } = useAuth()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 12)
  })

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all duration-300',
        'pt-[env(safe-area-inset-top)]',
        scrolled
          ? 'border-white/10 bg-bg/85 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150'
          : 'border-white/5 bg-bg/50 backdrop-blur-md',
      )}
    >
      <div className="section-container flex h-14 items-center justify-between gap-6 sm:h-16">
        <Link
          to="/"
          className="group flex min-w-0 shrink-0 items-center gap-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent/20 sm:size-10">
            <Heart className="size-4 fill-accent/20 sm:size-[18px]" />
          </span>
          <span className="font-display text-base font-bold tracking-tight sm:text-lg">
            Haruka
          </span>
        </Link>

        <div className="flex shrink-0 items-center">
          {!loading && (
            <Button
              to={user ? '/profile' : '/login'}
              variant="primary"
              size="sm"
              className="min-w-[5.5rem] px-5 sm:min-w-[6.5rem] sm:px-6"
            >
              {user ? 'My profile' : 'Log in'}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
