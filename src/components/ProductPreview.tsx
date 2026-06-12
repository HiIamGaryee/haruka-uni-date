import type { ReactNode } from 'react'
import { productPreviewContent } from '../data/homepage'
import { StudentMatchPreview } from './StudentMatchPreview'

type ProductPreviewProps = {
  id?: string
  eyebrow?: string
  title?: ReactNode
  description?: string
  className?: string
  border?: boolean
}

export function ProductPreview({
  id = 'preview',
  eyebrow = productPreviewContent.eyebrow,
  title,
  description = productPreviewContent.description,
  className,
  border = true,
}: ProductPreviewProps) {
  return (
    <StudentMatchPreview
      id={id}
      eyebrow={eyebrow}
      title={title}
      description={description}
      className={className}
      border={border}
    />
  )
}
