import { useMemo, useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import { Button } from '../Button'
import {
  MIN_DATE_DURATION_MINUTES,
  endTimeOptionsForStart,
  formatScheduledDateTime,
  getScheduleWindow,
  toDateInputValue,
  validateScheduleInput,
  TIME_SLOT_OPTIONS,
  minutesToDisplay,
  parseTimeToMinutes,
} from '../../lib/dateSchedule'

function labelTime(t: string) {
  return minutesToDisplay(parseTimeToMinutes(t))
}

type DateSchedulePickerProps = {
  onConfirm: (data: { scheduledDate: string; timeStart: string; timeEnd: string }) => Promise<void>
  loading?: boolean
}

export function DateSchedulePicker({ onConfirm, loading }: DateSchedulePickerProps) {
  const { minDate, maxDate } = useMemo(() => getScheduleWindow(), [])
  const [scheduledDate, setScheduledDate] = useState(toDateInputValue(minDate))
  const [timeStart, setTimeStart] = useState('14:00')
  const [timeEnd, setTimeEnd] = useState('17:00')
  const [error, setError] = useState('')

  const endOptions = useMemo(() => endTimeOptionsForStart(timeStart), [timeStart])

  function handleStartChange(v: string) {
    setTimeStart(v)
    const ends = endTimeOptionsForStart(v)
    if (!ends.includes(timeEnd) && ends.length > 0) {
      setTimeEnd(ends[0])
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validation = validateScheduleInput(scheduledDate, timeStart, timeEnd)
    if (validation) {
      setError(validation)
      return
    }
    setError('')
    await onConfirm({ scheduledDate, timeStart, timeEnd })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-accent/25 bg-accent/[0.06] p-6 sm:p-8"
    >
      <div className="flex items-center gap-2 text-accent">
        <Calendar className="size-5" />
        <p className="text-xs font-semibold uppercase tracking-widest">Pick your date</p>
      </div>
      <h2 className="mt-3 font-display text-2xl font-bold">Schedule your 3-hour date</h2>
      <p className="mt-2 text-sm text-muted">
        Choose a day after next Friday (within 3 weeks) and a time range of at least 3 hours. Your
        plan includes ~2 hours at a café.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-dim">
            Date (calendar only)
          </label>
          <input
            type="date"
            required
            min={toDateInputValue(minDate)}
            max={toDateInputValue(maxDate)}
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent/40"
          />
          <p className="mt-1.5 text-xs text-dim">
            Available: {toDateInputValue(minDate)} → {toDateInputValue(maxDate)}
          </p>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-dim">
            <Clock className="size-3.5" />
            Start time
          </label>
          <select
            required
            value={timeStart}
            onChange={(e) => handleStartChange(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent/40"
          >
            {TIME_SLOT_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {labelTime(t)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-dim">
            <Clock className="size-3.5" />
            End time (min {MIN_DATE_DURATION_MINUTES / 60}h)
          </label>
          <select
            required
            value={timeEnd}
            onChange={(e) => setTimeEnd(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent/40"
          >
            {endOptions.map((t) => (
              <option key={t} value={t}>
                {labelTime(t)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-muted">
        Preview:{' '}
        <span className="text-fg">
          {formatScheduledDateTime(scheduledDate, timeStart, timeEnd)}
        </span>
      </p>

      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}

      <Button type="submit" className="mt-6" disabled={loading}>
        {loading ? 'Saving...' : 'Confirm date & unlock plan'}
      </Button>
    </form>
  )
}
