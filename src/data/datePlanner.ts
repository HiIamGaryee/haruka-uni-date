export interface DatePreference {
  id: string
  icon: 'wallet' | 'clock' | 'sparkles' | 'utensils' | 'footprints' | 'battery' | 'shield' | 'message' | 'music' | 'heart' | 'timer' | 'cloud' | 'target'
  label: string
  value: string
  tags?: string[]
}

export interface AnalysisMetric {
  id: string
  label: string
  value: string | number
  type: 'radial' | 'bar' | 'badge'
  percent?: number
  badgeTone?: 'high' | 'low' | 'neutral' | 'excellent'
}

export interface TimelineEvent {
  id: string
  time: string
  title: string
  description?: string
}

export interface ConversationStarter {
  id: string
  text: string
  category: string
  icon: 'message' | 'brain' | 'zap' | 'star' | 'utensils' | 'tv' | 'music' | 'plane'
}

export interface SafetyMetric {
  id: string
  label: string
  value: string
  tone: 'safe' | 'good' | 'excellent' | 'low' | 'neutral'
}

export interface DateTab {
  id: string
  label: string
  plan: string
}

export interface SmartInsight {
  id: string
  label: string
  value: string
}

export interface MemoryPrediction {
  id: string
  text: string
}

export const datePlannerContent = {
  eyebrow: 'AI Date Planner',
  title: 'Your first date, engineered by AI.',
  description:
    'Preferences, compatibility intelligence, and a minute-by-minute timeline — a premium demo of how Haruka plans low-pressure campus dates.',
  aiGenerating: 'Analyzing compatibility signals and generating your personalized date plan…',
  whyMatchTitle: 'Why this match works',
  whyMatchBody:
    'Both students enjoy creative hobbies, low-pressure environments, dessert cafés, and playful conversations. Their social energy and expectations are highly aligned, reducing first-date anxiety.',
  safetyNote:
    'This plan prioritizes comfort, accessibility, and low-pressure social interaction.',
} as const

export const preferences: DatePreference[] = [
  { id: 'budget', icon: 'wallet', label: 'Budget', value: 'RM20 – RM50', tags: ['Student-friendly'] },
  { id: 'time', icon: 'clock', label: 'Preferred Time', value: 'Saturday Afternoon', tags: ['Weekend'] },
  { id: 'vibe', icon: 'sparkles', label: 'Vibe', value: 'Chill + Playful', tags: ['Low pressure'] },
  { id: 'food', icon: 'utensils', label: 'Food Preference', value: 'Dessert Café', tags: ['Sweet'] },
  { id: 'transport', icon: 'footprints', label: 'Transportation', value: 'Walking Distance', tags: ['Campus'] },
  { id: 'battery', icon: 'battery', label: 'Social Battery', value: 'Medium', tags: ['Balanced'] },
  { id: 'comfort', icon: 'shield', label: 'Comfort Level', value: 'Public Place Only', tags: ['Safe'] },
  { id: 'conversation', icon: 'message', label: 'Conversation Style', value: 'Funny + Deep Talks', tags: ['Witty'] },
  { id: 'music', icon: 'music', label: 'Music Taste', value: 'Indie + Lo-fi', tags: ['Chill'] },
  { id: 'love', icon: 'heart', label: 'Love Language', value: 'Quality Time', tags: ['Present'] },
  { id: 'duration', icon: 'timer', label: 'Date Duration', value: '90 Minutes', tags: ['Flexible'] },
  { id: 'weather', icon: 'cloud', label: 'Weather Preference', value: 'Indoor', tags: ['AC'] },
  { id: 'goal', icon: 'target', label: 'Relationship Goal', value: 'Long-term', tags: ['Intentional'] },
]

export const analysisMetrics: AnalysisMetric[] = [
  { id: 'score', label: 'Compatibility Score', value: '94%', type: 'radial', percent: 94 },
  { id: 'chemistry', label: 'Chemistry Prediction', value: 'High', type: 'badge', badgeTone: 'high' },
  { id: 'awkward', label: 'Awkward Silence Risk', value: 'Low', type: 'badge', badgeTone: 'low' },
  { id: 'energy', label: 'Conversation Energy', value: 'Playful', type: 'badge', badgeTone: 'neutral' },
  { id: 'interests', label: 'Shared Interests', value: 8, type: 'badge', badgeTone: 'high' },
  { id: 'lifestyle', label: 'Lifestyle Alignment', value: '91%', type: 'bar', percent: 91 },
  { id: 'pace', label: 'Emotional Pace', value: 'Very Compatible', type: 'badge', badgeTone: 'excellent' },
  { id: 'budget', label: 'Budget Alignment', value: 'Excellent', type: 'badge', badgeTone: 'excellent' },
  { id: 'difficulty', label: 'Date Difficulty', value: 'Easy', type: 'badge', badgeTone: 'low' },
]

export const timeline: TimelineEvent[] = [
  { id: 't1', time: '4:00 PM', title: 'Meet at Butter & Beans Café' },
  { id: 't2', time: '4:15 PM', title: 'Order drinks and desserts' },
  {
    id: 't3',
    time: '4:30 PM',
    title: 'Icebreaker Challenge',
    description: "Guess each other's most embarrassing assignment submission.",
  },
  {
    id: 't4',
    time: '5:00 PM',
    title: 'Mini compatibility game',
    description: 'Would You Rather',
  },
  { id: 't5', time: '5:30 PM', title: 'Walk around campus garden' },
  { id: 't6', time: '6:00 PM', title: 'Safe ending point' },
]

export const conversationStarters: ConversationStarter[] = [
  { id: 'c1', text: 'What course stereotype annoys you the most?', category: 'Campus', icon: 'message' },
  { id: 'c2', text: 'Which assignment nearly destroyed your sanity?', category: 'Relatable', icon: 'brain' },
  { id: 'c3', text: 'If you could instantly master one skill, what would it be?', category: 'Dreams', icon: 'zap' },
  { id: 'c4', text: "What's your biggest delulu dream?", category: 'Fun', icon: 'star' },
  { id: 'c5', text: "What's the weirdest food combination you secretly love?", category: 'Food', icon: 'utensils' },
  { id: 'c6', text: 'Which fictional character would survive university life best?', category: 'Pop Culture', icon: 'tv' },
  { id: 'c7', text: "What's your most questionable Spotify playlist name?", category: 'Music', icon: 'music' },
  { id: 'c8', text: "If money wasn't a problem, what would your dream weekend look like?", category: 'Lifestyle', icon: 'plane' },
]

export const safetyMetrics: SafetyMetric[] = [
  { id: 's1', label: 'Meeting Environment', value: 'Safe', tone: 'safe' },
  { id: 's2', label: 'Privacy Risk', value: 'Low', tone: 'low' },
  { id: 's3', label: 'Crowded Area', value: 'Yes', tone: 'good' },
  { id: 's4', label: 'Emergency Exit Accessibility', value: 'Good', tone: 'good' },
  { id: 's5', label: 'Transportation Convenience', value: 'Excellent', tone: 'excellent' },
  { id: 's6', label: 'Estimated Cost', value: 'RM38', tone: 'neutral' },
  { id: 's7', label: 'Weather Backup', value: 'Available', tone: 'good' },
]

export const dateTabs: DateTab[] = [
  { id: 'foodie', label: 'Foodie Date', plan: 'Dessert café + bookstore' },
  { id: 'active', label: 'Active Date', plan: 'Arcade + bubble tea' },
  { id: 'study', label: 'Study Date', plan: 'Library + coffee' },
]

export const smartInsights: SmartInsight[] = [
  { id: 'i1', label: 'Best Time to Meet', value: 'Saturday 4 PM' },
  { id: 'i2', label: 'Expected Date Length', value: '2 hours' },
  { id: 'i3', label: 'Reply Energy Match', value: '92%' },
  { id: 'i4', label: 'Potential Ghosting Risk', value: 'Low' },
  { id: 'i5', label: 'Social Compatibility', value: '95%' },
  { id: 'i6', label: 'Shared Humor Score', value: '89%' },
  { id: 'i7', label: 'Long-Term Potential', value: '87%' },
  { id: 'i8', label: 'Emotional Maturity Match', value: '91%' },
]

export const memoryPredictions: MemoryPrediction[] = [
  { id: 'm1', text: 'Laughing over terrible group projects' },
  { id: 'm2', text: 'Comparing assignment horror stories' },
  { id: 'm3', text: 'Discovering a shared anime obsession' },
  { id: 'm4', text: 'Taking random campus photos' },
  { id: 'm5', text: 'Planning a second meetup' },
]
