export const matchScoreContent = {
  eyebrow: 'Match Score Engine',
  title: 'Transparent AI compatibility scoring.',
  explanation:
    'Our prototype scores compatibility by combining student profile signals, shared interests, comfort level, campus context, and date-plan preferences.',
} as const

export const matchScores = [
  { key: 'overall', label: 'Overall Match', value: 92, accent: 'gold' as const, featured: true },
  { key: 'interest', label: 'Interest Match', value: 88, accent: 'emerald' as const },
  { key: 'campus', label: 'Campus Match', value: 100, accent: 'blue' as const },
  { key: 'personality', label: 'Personality Match', value: 84, accent: 'violet' as const },
  { key: 'datePlan', label: 'Date Plan Fit', value: 91, accent: 'cyan' as const },
] as const

export const overallScore = matchScores.find((s) => s.key === 'overall')!.value

export const signalScores = matchScores.filter((s) => s.key !== 'overall')
