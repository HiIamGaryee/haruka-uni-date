import type { UserWithRelations } from '../repositories/user.repository.js'

export type Starter = { text: string; category: string }

export class ConversationStarterService {
  generate(userA: UserWithRelations, userB: UserWithRelations): Starter[] {
    const hobbyA = userA.interests[0]?.label ?? 'hobbies'
    const hobbyB = userB.interests[0]?.label ?? 'music'
    const courseA = userA.course

    return [
      {
        text: `What ${courseA} stereotype annoys you the most?`,
        category: 'Campus',
      },
      {
        text: 'Which assignment nearly destroyed your sanity?',
        category: 'Relatable',
      },
      {
        text: `If you could instantly master one skill related to ${hobbyA}, what would it be?`,
        category: 'Dreams',
      },
      {
        text: "What's your biggest delulu dream?",
        category: 'Fun',
      },
      {
        text: `What's your most questionable ${hobbyB} hot take?`,
        category: 'Spicy',
      },
      {
        text: 'Which fictional character would survive university life best?',
        category: 'Pop Culture',
      },
      {
        text: "What's your weirdest food combination you secretly love?",
        category: 'Food',
      },
      {
        text: 'If money was not a problem, what would your dream weekend look like?',
        category: 'Lifestyle',
      },
    ]
  }
}

export const conversationStarterService = new ConversationStarterService()
