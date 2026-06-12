import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const footerLinks = [
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Demo', to: '/demo' },
] as const

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))] sm:py-12">
      <div className="section-container flex flex-col items-center gap-6">
        <nav className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <Heart className="size-3.5" />
            </span>
            <span className="font-display text-sm font-bold sm:text-base">Haruka Uni Date</span>
          </Link>
          <p className="text-center text-xs text-muted sm:text-sm">
            Static prototype · No backend · Hackathon-ready
          </p>
          <p className="text-xs text-dim">© {new Date().getFullYear()} Haruka</p>
        </div>
      </div>
    </footer>
  )
}
