export const announcement = {
  text: 'Hackathon mock · Spring 2026',
  highlight: 'Built for someone who still no girlfriend hhhh',
} as const

export const heroContent = {
  eyebrow: 'University Student Matching',
  title: 'Find your match, not just another random swipe.',
  subtitle:
    'Haruka Uni Date helps students discover compatible people through interests, course life, campus routine, and AI-generated first-date plans.',
  ctaPrimary: { label: 'Start Matching', to: '/register' },
  ctaSecondary: { label: 'View Demo', to: '/demo' },
} as const

export const heroStats = [
  { value: '7', label: 'Match Signals' },
  { value: '92%', label: 'Avg Compatibility' },
  { value: 'AI', label: 'Date Plans' },
  { value: '.edu', label: 'Verified' },
] as const

export const problemContent = {
  eyebrow: 'The Problem',
  title: 'Campus dating is broken by design.',
  description:
    'Most apps treat university students like everyone else — endless swipes, shallow profiles, and zero context about who you actually are on campus.',
  painPoints: [
    {
      stat: '68%',
      label: 'of students say dating apps feel random and exhausting',
    },
    {
      stat: '3×',
      label: 'more ghosting when schedules and intentions do not align',
    },
    {
      stat: '0',
      label: 'mainstream apps weight course life, clubs, or campus routine',
    },
    {
      stat: '???',
      label: '"What should we do?" kills momentum before the first meetup',
    },
  ],
} as const

export const solutionContent = {
  eyebrow: 'The Solution',
  title: 'Matching built for how students actually live.',
  description:
    'Haruka Uni Date is a campus-first matching platform. We score compatibility across university, course, interests, personality, dating intention, availability, and date-plan preference — then ship AI-generated first-date ideas so you can meet with confidence.',
  pillars: [
    {
      title: 'Campus-native profiles',
      description:
        'University, faculty, year, clubs, and semester rhythm — not just photos and a bio.',
    },
    {
      title: 'Transparent compatibility',
      description:
        'See exactly why you matched: shared interests, aligned intention, overlapping free time.',
    },
    {
      title: 'AI date-plan generator',
      description:
        'Get a first-date suggestion based on both profiles — café study session, gallery walk, night market run.',
    },
  ],
} as const

export const matchingSteps = [
  {
    step: '01',
    title: 'Build your campus profile',
    description:
      'Add university, course, interests, personality, and what you are looking for.',
  },
  {
    step: '02',
    title: 'Haruka scores 7 signals',
    description:
      'Our engine ranks matches on every dimension — with a clear compatibility breakdown.',
  },
  {
    step: '03',
    title: 'AI finds your match privately',
    description:
      'Haruka scans the waiting pool behind the scenes. You never browse other members.',
  },
  {
    step: '04',
    title: 'Meet with an AI date plan',
    description:
      'Get a tailored first-date idea. Mutual interest unlocks contact — no random DMs.',
  },
] as const

export const features = [
  {
    icon: 'graduationCap' as const,
    title: 'Campus-Based Matching',
    description:
      'Match with students from the same university or nearby campuses.',
  },
  {
    icon: 'heartHandshake' as const,
    title: 'Interest Compatibility',
    description:
      'Match by hobbies, clubs, study style, food preference, and lifestyle.',
  },
  {
    icon: 'bookOpen' as const,
    title: 'Course & Faculty Context',
    description:
      'Understand student background without making it feel like LinkedIn.',
  },
  {
    icon: 'sparkles' as const,
    title: 'AI First-Date Planner',
    description:
      'Generate safe, simple, budget-friendly first-date ideas.',
  },
  {
    icon: 'users' as const,
    title: 'Group Match Mode',
    description:
      'Let students meet in friend groups before going one-on-one.',
  },
  {
    icon: 'shieldCheck' as const,
    title: 'Safety & Boundaries',
    description:
      'Consent-first matching with comfort level, report options, and safe meetup suggestions.',
  },
  {
    icon: 'flame' as const,
    title: 'Delulu Fun Layer',
    description:
      'Playful filters like “CGPA 4.0 energy” and “campus crush probability”.',
  },
  {
    icon: 'rocket' as const,
    title: 'Hackathon Prototype Mode',
    description:
      'Demo-ready flow with sample profiles, match scoring, and generated date plans.',
  },
] as const

export const productPreviewContent = {
  eyebrow: 'Student Match Preview',
  title: 'Curated matches, ranked for campus life.',
  description:
    'Explore sample student profiles with compatibility breakdowns, safety context, and AI match reasoning — no swipes, no chat bubbles.',
} as const

export const ctaContent = {
  title: 'Ready to trust the AI with your match?',
  subtitle:
    'Create your private profile, enter the waiting pool, and let Haruka reveal one compatible partner — with a first-date plan.',
  ctaPrimary: { label: 'Start Matching', to: '/register' },
  ctaSecondary: { label: 'View Demo', to: '/demo' },
} as const
