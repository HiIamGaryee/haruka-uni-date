export type Student = {
  id: string
  name: string
  age: number
  gender?: 'MALE' | 'FEMALE'
  university: string
  faculty: string
  course: string
  year: string
  location: string
  personalityType: string
  datingGoal: string
  comfortLevel: string
  availability: string
  matchScore: number
  campusScore: number
  interestScore: number
  lifestyleScore: number
  datePlanScore: number
  interests: string[]
  lookingFor: string
  idealFirstDate: string
  budgetRange: string
  safetyPreference: string
  redFlags: string[]
  funFact: string
  aiReason: string
  accent: string
}

export const studentPreviewContent = {
  eyebrow: 'Live scoring preview',
  title: 'Same-uni pool — scored live against your persona.',
  description:
    'Pick Haruka, Kai, or Mei below. Haruka only surfaces candidates from the same university and hides everyone below 90%. Real members are never browsable.',
  demoLabel: 'Interactive · no login needed',
} as const

export const students: Student[] = [
  {
    id: 'haruka-tan',
    name: 'Haruka Tan',
    age: 21,
    gender: 'FEMALE',
    university: 'Sunway University',
    faculty: 'School of Engineering and Technology',
    course: 'Software Engineering',
    year: 'Year 2',
    location: 'Bandar Sunway',
    personalityType: 'Playful Introvert',
    datingGoal: 'Slow dating, start as friends',
    comfortLevel: 'Public places only',
    availability: 'Friday evening, Saturday afternoon',
    matchScore: 94,
    campusScore: 100,
    interestScore: 91,
    lifestyleScore: 88,
    datePlanScore: 96,
    interests: ['UI Design', 'Anime', 'Café Hopping', 'Hackathons', 'Indie Games'],
    lookingFor: 'Someone funny, emotionally mature, and comfortable with nerdy conversations',
    idealFirstDate: 'Cozy café, design roast session, short walk',
    budgetRange: 'RM25–RM45',
    safetyPreference: 'Meet inside campus or mall area',
    redFlags: ['Pushy texting', 'Last-minute private meetup'],
    funFact: 'Has 47 unfinished Figma files',
    aiReason:
      'Strong match because both students enjoy creative tech, low-pressure dates, and playful conversation.',
    accent: 'from-violet-500 to-purple-600',
  },
  {
    id: 'kai-lim',
    name: 'Kai Lim',
    age: 22,
    gender: 'MALE',
    university: 'Sunway University',
    faculty: 'School of Engineering and Technology',
    course: 'Computer Science',
    year: 'Year 3',
    location: 'Bandar Sunway',
    personalityType: 'Calm Builder',
    datingGoal: 'Slow dating, start as friends',
    comfortLevel: 'Public places only',
    availability: 'Friday evening, Saturday afternoon',
    matchScore: 94,
    campusScore: 100,
    interestScore: 93,
    lifestyleScore: 90,
    datePlanScore: 95,
    interests: ['Gaming', 'Café Hopping', 'UI Design', 'Indie Games'],
    lookingFor: 'Someone creative, kind, and okay with nerdy café dates',
    idealFirstDate: 'Matcha café, portfolio roast, short campus walk',
    budgetRange: 'RM30–RM50',
    safetyPreference: 'Meet in public mall or campus area',
    redFlags: ['Ghosting', 'Pressure to meet alone'],
    funFact: 'Debugs relationships like production incidents',
    aiReason:
      'Top Sunway match — shared café energy, design hobbies, and the same slow-burn dating pace.',
    accent: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'mei-wong',
    name: 'Mei Wong',
    age: 22,
    gender: 'FEMALE',
    university: 'Monash University Malaysia',
    faculty: 'School of Business',
    course: 'Business Analytics',
    year: 'Year 3',
    location: 'Subang Jaya',
    personalityType: 'Ambitious Social Butterfly',
    datingGoal: 'Serious but no rush',
    comfortLevel: 'Group hangout first',
    availability: 'Saturday brunch, Sunday evening',
    matchScore: 89,
    campusScore: 82,
    interestScore: 87,
    lifestyleScore: 90,
    datePlanScore: 88,
    interests: ['Matcha', 'Startups', 'Volleyball', 'Productivity Apps', 'Café Reviews'],
    lookingFor: 'Someone driven, kind, and not afraid of honest communication',
    idealFirstDate: 'Matcha café, startup idea game, bookstore walk',
    budgetRange: 'RM35–RM60',
    safetyPreference: 'Bring a friend nearby for first meetup',
    redFlags: ['No ambition', 'Rude to service staff'],
    funFact: 'Rates every café like a product manager',
    aiReason:
      'Good match because lifestyle energy, ambition level, and weekend availability are highly compatible.',
    accent: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'yuna-lim',
    name: 'Yuna Lim',
    age: 20,
    gender: 'FEMALE',
    university: "Taylor's University",
    faculty: 'School of Liberal Arts and Sciences',
    course: 'Psychology',
    year: 'Year 2',
    location: 'Lakeside Campus',
    personalityType: 'Soft-Spoken Observer',
    datingGoal: 'Meaningful connection',
    comfortLevel: 'Text first, meet later',
    availability: 'Wednesday afternoon, Sunday morning',
    matchScore: 86,
    campusScore: 78,
    interestScore: 92,
    lifestyleScore: 81,
    datePlanScore: 85,
    interests: ['Books', 'Cats', 'Indie Music', 'Journaling', 'Night Walks'],
    lookingFor: 'Someone patient, gentle, and emotionally aware',
    idealFirstDate: 'Quiet bookstore, dessert, simple conversation',
    budgetRange: 'RM20–RM40',
    safetyPreference: 'Public café with easy transport access',
    redFlags: ['Love bombing', 'Emotional pressure'],
    funFact: "Can guess someone's mood from their playlist",
    aiReason:
      'Strong emotional compatibility and shared preference for calm, low-pressure first meetings.',
    accent: 'from-rose-500 to-pink-600',
  },
  {
    id: 'aiden-lee',
    name: 'Aiden Lee',
    age: 23,
    gender: 'MALE',
    university: 'Asia Pacific University',
    faculty: 'School of Computing',
    course: 'Cybersecurity',
    year: 'Final Year',
    location: 'Bukit Jalil',
    personalityType: 'Quiet Strategist',
    datingGoal: 'Friends to relationship',
    comfortLevel: 'Public places only',
    availability: 'Friday night, Sunday afternoon',
    matchScore: 91,
    campusScore: 85,
    interestScore: 89,
    lifestyleScore: 93,
    datePlanScore: 90,
    interests: ['Capture The Flag', 'Coffee', 'Gym', 'Tech Podcasts', 'Board Games'],
    lookingFor: 'Someone curious, loyal, and okay with quiet moments',
    idealFirstDate: 'Board game café, coffee, casual walk',
    budgetRange: 'RM30–RM50',
    safetyPreference: 'Daytime or early evening meetup',
    redFlags: ['Inconsistent communication', 'Disrespecting boundaries'],
    funFact: 'Uses threat modeling to choose restaurants',
    aiReason:
      'High compatibility due to shared tech interests, similar dating pace, and practical date preferences.',
    accent: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'chloe-ng',
    name: 'Chloe Ng',
    age: 21,
    gender: 'FEMALE',
    university: 'INTI International University',
    faculty: 'Faculty of Business and Communications',
    course: 'Mass Communication',
    year: 'Year 2',
    location: 'Nilai',
    personalityType: 'Creative Extrovert',
    datingGoal: 'Fun dates, maybe serious',
    comfortLevel: 'Casual public meetup',
    availability: 'Saturday night, Monday afternoon',
    matchScore: 83,
    campusScore: 72,
    interestScore: 88,
    lifestyleScore: 84,
    datePlanScore: 82,
    interests: ['Content Creation', 'Fashion', 'K-pop', 'Food Hunting', 'Photography'],
    lookingFor: 'Someone confident, funny, and supportive',
    idealFirstDate: 'Food market, photo challenge, dessert stop',
    budgetRange: 'RM30–RM70',
    safetyPreference: 'Crowded public area',
    redFlags: ['Controlling behavior', 'Boring replies'],
    funFact: 'Has a private TikTok draft folder with 200 videos',
    aiReason:
      'Good match for users who enjoy expressive, social, and spontaneous dating energy.',
    accent: 'from-amber-500 to-orange-600',
  },
  {
    id: 'ray-tan',
    name: 'Ray Tan',
    age: 22,
    gender: 'MALE',
    university: 'HELP University',
    faculty: 'Faculty of Behavioural Sciences',
    course: 'Psychology',
    year: 'Year 3',
    location: 'Damansara Heights',
    personalityType: 'Calm Listener',
    datingGoal: 'Long-term relationship',
    comfortLevel: 'Text first, call before meeting',
    availability: 'Thursday evening, Sunday lunch',
    matchScore: 88,
    campusScore: 76,
    interestScore: 84,
    lifestyleScore: 91,
    datePlanScore: 89,
    interests: ['Podcasts', 'Museums', 'Cats', 'Deep Talks', 'Coffee'],
    lookingFor: 'Someone emotionally honest and consistent',
    idealFirstDate: 'Museum visit, coffee, slow conversation',
    budgetRange: 'RM25–RM55',
    safetyPreference: 'Share meetup location with friend',
    redFlags: ['Avoidant communication', 'Aggressive flirting'],
    funFact: 'Remembers tiny details people forget they said',
    aiReason:
      'Strong match for users who prefer emotionally mature conversations and slower dating pace.',
    accent: 'from-indigo-500 to-violet-600',
  },
]

/** Full fictional pool used by the interactive demo scorer */
export const demoCandidatePool = students

export const compatibilityBreakdown = [
  { key: 'campusScore', label: 'Campus' },
  { key: 'interestScore', label: 'Interests' },
  { key: 'lifestyleScore', label: 'Lifestyle' },
  { key: 'datePlanScore', label: 'Date Plan' },
] as const

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
