import type { DatePlanRecord } from './api'

export const PUBLIC_MEETUP_SAFETY =
  'First meetup should stay in a public campus or mall area. Share your location with a friend. You can share your date plan and meetup location on WhatsApp before you go.'

export function buildWhatsAppSafetyMessage(opts: {
  datePlan: DatePlanRecord
  userName: string
  partnerName?: string
}): string {
  const { datePlan, userName, partnerName } = opts
  const lines = [
    '🛡️ Haruka Uni Date — safety check-in',
    '',
    `Hi! It's ${userName}. Sharing my first-date plan for safety:`,
    '',
    `📅 ${datePlan.title}`,
    `🕐 ${datePlan.time}`,
    `📍 ${datePlan.location}`,
    `💰 ${datePlan.budget}`,
  ]
  if (partnerName) {
    lines.push(`👤 Match: ${partnerName} (campus meetup)`)
  }
  lines.push(
    '',
    '✅ Public meetup only — campus or mall area',
    '📲 Please keep this message as my location share',
  )
  return lines.join('\n')
}

export function whatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}
