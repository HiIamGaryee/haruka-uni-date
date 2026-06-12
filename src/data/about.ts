export const aboutContent = {
  eyebrow: 'About Us',
  title: 'Built by students, for students.',
  description:
    'Haruka Uni Date started as a hackathon prototype — a better way to meet people on campus without the noise of generic dating apps.',
  mission: {
    title: 'Our mission',
    body: 'Help university students find compatible matches through real campus context — not just photos and swipes. We believe dating on campus should feel intentional, safe, and a little fun.',
  },
  story: {
    title: 'Why Haruka?',
    paragraphs: [
      'Most dating apps treat students like everyone else. They ignore course life, semester schedules, club culture, and the awkward truth that your first date idea matters as much as your profile.',
      'Haruka Uni Date was built to fix that. We score compatibility across seven signals — university, course, interests, personality, dating intention, availability, and date-plan preference — then use AI to suggest simple, budget-friendly first dates.',
      'This is a static prototype for now. No backend, no auth, no messaging layer — just the product vision, demo-ready for hackathons and campus pitches.',
    ],
  },
  values: [
    {
      title: 'Campus-first',
      description: 'Matching designed around how students actually live — not corporate LinkedIn energy.',
    },
    {
      title: 'Transparency',
      description: 'See why you matched with clear compatibility breakdowns, not mystery algorithms.',
    },
    {
      title: 'Safety & consent',
      description: 'Comfort levels, boundaries, and safe meetup suggestions built into the product thinking.',
    },
    {
      title: 'Playful honesty',
      description: 'University dating should feel human — including the delulu fun layer.',
    },
  ],
  stats: [
    { value: '7', label: 'Match signals' },
    { value: '2026', label: 'Prototype cohort' },
    { value: '0', label: 'Random swipes required' },
    { value: '∞', label: 'Café date ideas' },
  ],
} as const
