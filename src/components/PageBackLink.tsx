import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { fadeUpDelayed } from '../lib/motion'

type PageBackLinkProps = {
  to?: string
  label?: string
}

export function PageBackLink({ to = '/', label = 'Back to home' }: PageBackLinkProps) {
  return (
    <motion.div {...fadeUpDelayed(0)} className="mb-8">
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" />
        {label}
      </Link>
    </motion.div>
  )
}
