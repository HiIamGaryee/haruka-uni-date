import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

type PageBackLinkProps = {
  to?: string
  label?: string
}

export function PageBackLink({ to = '/', label = 'Back to home' }: PageBackLinkProps) {
  return (
    <div className="mb-8">
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" />
        {label}
      </Link>
    </div>
  )
}
