import { Link } from 'react-router-dom'
import { brandAssets } from '../data/visualAssets'
import { cn } from '../lib/cn'

type LogoProps = {
  className?: string
  imageClassName?: string
  to?: string
  showText?: boolean
}

export function Logo({
  className,
  imageClassName,
  to = '/',
  showText = false,
}: LogoProps) {
  const content = (
    <>
      <img
        src={brandAssets.logo.src}
        alt={brandAssets.logo.alt}
        width={755}
        height={331}
        loading="eager"
        decoding="async"
        draggable={false}
        className={cn('h-9 w-auto object-contain sm:h-10', imageClassName)}
      />
      {showText && (
        <span className="font-display text-base font-bold tracking-tight sm:text-lg">
          Haruka
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        className={cn(
          'group flex min-w-0 shrink-0 items-center gap-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
          className,
        )}
      >
        {content}
      </Link>
    )
  }

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>{content}</span>
  )
}
