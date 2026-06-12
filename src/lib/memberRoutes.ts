import type { AuthUser } from './api'

type SafeMatch = { id: string; status: string } | null

export function getMemberHomePath(user: AuthUser, match: SafeMatch): string {
  if (!user.profileComplete || user.status === 'INCOMPLETE_PROFILE') {
    return '/create-profile'
  }
  if (match?.id && ['PLAN_GENERATED', 'REVEALED', 'PENDING_PLAN'].includes(match.status)) {
    return `/match-result/${match.id}`
  }
  if (user.status === 'MATCHED' && match?.id) {
    return `/match-result/${match.id}`
  }
  if (user.status === 'WAITING_FOR_MATCH' || user.status === 'MATCHING') {
    return '/match'
  }
  return '/profile'
}
