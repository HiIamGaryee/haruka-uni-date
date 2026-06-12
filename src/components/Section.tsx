import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

type SectionProps = {
  id?: string
  children: ReactNode
  className?: string
  dots?: boolean
  border?: boolean
}

export function Section({
  id,
  children,
  className,
  dots = false,
  border = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'section-padding relative',
        border && 'border-t border-white/5',
        className,
      )}
    >
      {dots && (
        <div className="pointer-events-none absolute inset-0 grid-dots opacity-20" />
      )}
      <div className="section-container relative">{children}</div>
    </section>
  )
}
