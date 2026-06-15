import type { ReactNode } from 'react'
import { productPreviewContent } from '../data/homepage'
import { PreviewDashboard } from './preview/PreviewDashboard'
import { SectionHeader } from './SectionHeader'
import { Section } from './Section'
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
    <>
      <StudentMatchPreview
        id={id}
        eyebrow={eyebrow}
        title={title}
        description={description}
        className={className}
        border={border}
      />

      <Section id="match-dashboard-preview" border className="border-t-0 pt-0">
        <SectionHeader
          eyebrow="Match result preview"
          title={
            <>
              Profile, compatibility, and{' '}
              <span className="text-gradient-gold">AI date plan</span> in one view.
            </>
          }
          description="Example of what members see after Haruka finds a 90%+ match — no browsing, one partner at a time."
          align="center"
        />
        <PreviewDashboard />
      </Section>
    </>
  )
}
