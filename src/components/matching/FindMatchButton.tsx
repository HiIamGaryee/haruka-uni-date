import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'
import { useMatching } from '../../hooks/useMatching'
import { Button } from '../Button'
import { cn } from '../../lib/cn'

type FindMatchButtonProps = {
  children?: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'sm'
  className?: string
  showIcon?: boolean
}

export function FindMatchButton({
  children = 'Find Match',
  variant = 'primary',
  size = 'default',
  className,
  showIcon = true,
}: FindMatchButtonProps) {
  const { openMatching } = useMatching()

  return (
    <Button
      variant={variant}
      size={size}
      onClick={openMatching}
      className={cn(className)}
    >
      {showIcon && <Sparkles className="size-4" />}
      {children}
    </Button>
  )
}
