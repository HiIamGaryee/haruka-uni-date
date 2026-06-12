export const faqContent = {
  eyebrow: 'FAQ',
  title: 'Questions? We have answers.',
  description:
    'Everything you need to know about Haruka Uni Date — the prototype, how matching works, and what to expect.',
} as const

export const faqItems = [
  {
    question: 'What is Haruka Uni Date?',
    answer:
      'Haruka Uni Date is a university student matching platform prototype. It helps students discover compatible people through interests, course life, campus routine, and AI-generated first-date plans — not endless swiping.',
  },
  {
    question: 'Is this a real dating app?',
    answer:
      'Not yet. This is a static frontend prototype built for hackathons and demos. There is no backend, no user accounts, and no live matching — just the product experience and vision.',
  },
  {
    question: 'How does matching work?',
    answer:
      'Haruka scores compatibility across seven signals: university, course, interests, personality, dating intention, availability, and date-plan preference. You see a transparent breakdown and curated matches — not a black-box swipe feed.',
  },
  {
    question: 'What is the AI date planner?',
    answer:
      'Based on both profiles, Haruka generates safe, simple, budget-friendly first-date ideas — like a café study session, campus food hunt, or gallery walk — plus an icebreaker to get the conversation started.',
  },
  {
    question: 'Is my data stored anywhere?',
    answer:
      'No. This demo runs entirely in your browser. We do not collect, store, or transmit any personal data. When a full product ships, campus-verified profiles and privacy controls will be core.',
  },
  {
    question: 'What is Group Match Mode?',
    answer:
      'A planned feature that lets students meet in friend groups before going one-on-one — lowering the pressure of first meets and making campus dating feel more natural.',
  },
  {
    question: 'What is the Delulu Fun Layer?',
    answer:
      'Playful optional filters like “CGPA 4.0 energy” and “campus crush probability” — because university dating should not take itself too seriously all the time.',
  },
  {
    question: 'Can I use this on my campus?',
    answer:
      'The prototype is open for hackathon teams to fork, extend, and pitch. Register interest on the landing page CTA or explore the live demo to see the match dashboard in action.',
  },
] as const
