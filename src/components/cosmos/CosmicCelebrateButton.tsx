import type { ReactNode } from 'react'
import { Stars } from 'lucide-react'
import { useMatching } from '../../hooks/useMatching'
import { Button } from '../Button'
import { cn } from '../../lib/cn'

type CosmicCelebrateButtonProps = {
  children?: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'sm'
  className?: string
}

export function CosmicCelebrateButton({
  children = 'Witness Cosmic Match',
  variant = 'primary',
  size = 'default',
  className,
}: CosmicCelebrateButtonProps) {
  const { openCelebration } = useMatching()

  return (
    <Button variant={variant} size={size} onClick={openCelebration} className={cn(className)}>
      <Stars className="size-4" />
      {children}
    </Button>
  )
}
