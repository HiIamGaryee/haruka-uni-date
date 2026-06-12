export const MIN_DATE_DURATION_MINUTES = 180
export const CAFE_BLOCK_MINUTES = 120
export const MEET_MINUTES = 15
export const GOODBYE_MINUTES = 15

export function getNextFriday(from = new Date()): Date {
  const d = new Date(from)
  d.setHours(0, 0, 0, 0)
  const day = d.getDay()
  let add = (5 - day + 7) % 7
  if (add === 0) add = 7
  d.setDate(d.getDate() + add)
  return d
}

export function getScheduleWindow(from = new Date()) {
  const nextFriday = getNextFriday(from)
  const minDate = new Date(nextFriday)
  minDate.setDate(minDate.getDate() + 1)
  const maxDate = new Date(minDate)
  maxDate.setDate(maxDate.getDate() + 21)
  return { minDate, maxDate }
}

export function toDateInputValue(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function minutesToDisplay(minutes: number): string {
  const h24 = Math.floor(minutes / 60) % 24
  const m = minutes % 60
  const period = h24 >= 12 ? 'PM' : 'AM'
  const h12 = h24 % 12 || 12
  return `${h12}:${String(m).padStart(2, '0')} ${period}`
}

export function formatScheduledDateTime(
  dateStr: string,
  timeStart: string,
  timeEnd: string,
): string {
  const d = new Date(`${dateStr}T12:00:00`)
  const day = d.toLocaleDateString('en-MY', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
  return `${day} · ${minutesToDisplay(parseTimeToMinutes(timeStart))} – ${minutesToDisplay(parseTimeToMinutes(timeEnd))}`
}

export function validateScheduleInput(
  scheduledDate: string,
  timeStart: string,
  timeEnd: string,
  now = new Date(),
): string | null {
  const { minDate, maxDate } = getScheduleWindow(now)
  const picked = new Date(`${scheduledDate}T12:00:00`)
  picked.setHours(0, 0, 0, 0)

  if (picked < minDate || picked > maxDate) {
    return `Date must be after next Friday and within 3 weeks (${toDateInputValue(minDate)} – ${toDateInputValue(maxDate)})`
  }

  const start = parseTimeToMinutes(timeStart)
  const end = parseTimeToMinutes(timeEnd)
  if (end <= start) return 'End time must be after start time'
  if (end - start < MIN_DATE_DURATION_MINUTES) {
    return 'Date plan must be at least 3 hours'
  }

  return null
}

export function buildThreeHourTimeline(opts: {
  timeStart: string
  timeEnd: string
  venueTitle: string
  cafeTitle?: string
  activityTitle?: string
}): { time: string; title: string; description?: string }[] {
  const start = parseTimeToMinutes(opts.timeStart)
  const end = parseTimeToMinutes(opts.timeEnd)
  const cafeTitle = opts.cafeTitle ?? 'Café & meal together'
  const activityTitle = opts.activityTitle ?? 'Campus walk & conversation'
  const venue = opts.venueTitle

  const cafeStart = start + MEET_MINUTES
  const cafeEnd = cafeStart + CAFE_BLOCK_MINUTES
  const activityEnd = end - GOODBYE_MINUTES
  const activityMinutes = Math.max(30, activityEnd - cafeEnd)

  return [
    {
      time: minutesToDisplay(start),
      title: `Meet at ${venue}`,
      description: 'Public entrance · confirm comfort',
    },
    {
      time: minutesToDisplay(cafeStart),
      title: cafeTitle,
      description: `~2 hours · eat, drink, and chat (${minutesToDisplay(cafeStart)} – ${minutesToDisplay(cafeEnd)})`,
    },
    {
      time: minutesToDisplay(cafeEnd),
      title: activityTitle,
      description: `~${activityMinutes} min · low-pressure activity before wrap-up`,
    },
    {
      time: minutesToDisplay(activityEnd),
      title: 'Safe goodbye',
      description: `End by ${minutesToDisplay(end)} · share location with a friend`,
    },
  ]
}

export const TIME_SLOT_OPTIONS = (() => {
  const slots: string[] = []
  for (let m = 10 * 60; m <= 20 * 60; m += 30) {
    const h = String(Math.floor(m / 60)).padStart(2, '0')
    const min = String(m % 60).padStart(2, '0')
    slots.push(`${h}:${min}`)
  }
  return slots
})()
