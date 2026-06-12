import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/cn'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'sm'
  className?: string
  href?: string
  to?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  className,
  href,
  to,
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) {
  const styles = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98]',
    size === 'default' && 'px-6 py-3 text-sm',
    size === 'sm' && 'px-4 py-2 text-xs',
    variant === 'primary' && 'btn-gradient-yellow transition-all duration-200',
    variant === 'secondary' &&
      'border border-white/15 bg-white/5 text-text backdrop-blur-sm hover:border-accent/35 hover:bg-white/10',
    variant === 'ghost' && 'text-muted hover:text-accent',
    disabled && 'pointer-events-none opacity-50',
    className,
  )

  if (to) {
    return (
      <Link to={to} className={styles} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={styles} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  )
}
