import type { ReactNode } from 'react'
import { demoCandidatePool, studentPreviewContent } from '../data/students'
import { StudentMatchCard } from './StudentMatchCard'
import { SectionHeader } from './SectionHeader'
import { Section } from './Section'

type StudentMatchPreviewProps = {
  id?: string
  eyebrow?: string
  title?: ReactNode
  description?: string
  className?: string
  border?: boolean
}

export function StudentMatchPreview({
  id = 'preview',
  eyebrow = studentPreviewContent.eyebrow,
  title = (
    <>
      Curated matches,{' '}
      <span className="text-gradient-spectrum">ranked for campus life.</span>
    </>
  ),
  description = studentPreviewContent.description,
  className,
  border = true,
}: StudentMatchPreviewProps) {
  return (
    <Section id={id} dots border={border} className={className}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="center"
      />

      <div className="mb-6 flex justify-center">
        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-200">
          {studentPreviewContent.demoLabel}
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {demoCandidatePool.slice(0, 3).map((student, i) => (
          <StudentMatchCard key={student.id} student={student} index={i} />
        ))}
      </div>
    </Section>
  )
}
