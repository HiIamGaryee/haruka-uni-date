export type FutureMemory = {
  id: string
  text: string
  emoji: string
  rotation: number
  offsetX: number
  offsetY: number
}

export const futureMemoriesContent = {
  eyebrow: 'Future Memories',
  title: 'Moments you haven’t lived yet — but already feel real.',
  description:
    'Dreamy snapshots of what a great first date might leave behind. Nostalgic, romantic, and softly glowing.',
} as const

export const futureMemories: FutureMemory[] = [
  {
    id: 'trauma',
    text: 'Shared assignment trauma',
    emoji: '📚',
    rotation: -2.5,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: 'anime',
    text: 'Discovering the same anime',
    emoji: '✨',
    rotation: 2,
    offsetX: 12,
    offsetY: -8,
  },
  {
    id: 'presentations',
    text: 'Laughing at terrible presentations',
    emoji: '😂',
    rotation: -1.5,
    offsetX: -8,
    offsetY: 6,
  },
  {
    id: 'bubble-tea',
    text: 'Late-night bubble tea',
    emoji: '🧋',
    rotation: 3,
    offsetX: 6,
    offsetY: 10,
  },
  {
    id: 'second-date',
    text: 'Planning a second date',
    emoji: '💫',
    rotation: -2,
    offsetX: -4,
    offsetY: -4,
  },
]
