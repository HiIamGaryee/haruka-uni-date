import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { SiteLayout } from '../../components/SiteLayout'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { api } from '../../lib/api'
import { cn } from '../../lib/cn'
import { MALAYSIA_UNIVERSITIES, isMalaysiaUniversity } from '../../data/malaysiaUniversities'
import {
  allergyOptions,
  budgetOptions,
  cgpaOptions,
  genderOptions,
  hobbyOptions,
  languageOptions,
  outdoorOptions,
  yearOptions,
} from '../../data/profileOptions'
import { useAuth } from '../../hooks/useAuth'

const defaultAvailability = [{ day: 'Saturday', timeSlot: 'Afternoon' }]

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent/40'

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-dim">
      {children}
    </label>
  )
}

function RadioGroup({
  name,
  value,
  options,
  onChange,
  columns = 2,
}: {
  name: string
  value: string
  options: readonly string[] | readonly { value: string; label: string }[]
  onChange: (v: string) => void
  columns?: number
}) {
  const items =
    typeof options[0] === 'string'
      ? (options as readonly string[]).map((o) => ({ value: o, label: o }))
      : (options as { value: string; label: string }[])

  return (
    <div className={cn('grid gap-2', columns === 2 && 'sm:grid-cols-2', columns === 3 && 'sm:grid-cols-3')}>
      {items.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors',
            value === opt.value
              ? 'border-accent/50 bg-accent/10 text-fg'
              : 'border-white/10 bg-white/[0.03] text-muted hover:border-white/20',
          )}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="size-4 accent-accent"
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  )
}

export function CreateProfilePage() {
  const { user, refresh } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const signupUni = localStorage.getItem('haruka_signup_uni') ?? ''
  const initialUni =
    user?.university && isMalaysiaUniversity(user.university)
      ? user.university
      : isMalaysiaUniversity(signupUni)
        ? signupUni
        : ''

  const [form, setForm] = useState({
    name: user?.name ?? '',
    age: 21,
    gender: 'FEMALE',
    interestedGender: ['MALE'] as string[],
    university: initialUni,
    faculty: '',
    course: '',
    year: 'Year 2',
    personalityType: '',
    datingGoal: '',
    comfortLevel: 'Public places only',
    relationshipPace: 'Slow burn',
    loveLanguage: 'Quality Time',
    hobby: 'Café hopping',
    musicTaste: '',
    foodPreference: '',
    budgetPreference: budgetOptions[1],
    cgpa: cgpaOptions[2],
    languages: ['English', 'Malay'] as string[],
    outdoorPerson: outdoorOptions[1],
    allergies: allergyOptions[0],
    socialBattery: 'Medium',
    preferredMeetingStyle: 'Public café',
    dealBreakers: '',
    redFlags: '',
    greenFlags: '',
    location: '',
  })

  if (!user) return <Navigate to="/login" replace />

  function update(field: string, value: string | number | string[]) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function toggleLanguage(lang: string) {
    setForm((f) => ({
      ...f,
      languages: f.languages.includes(lang)
        ? f.languages.filter((l) => l !== lang)
        : [...f.languages, lang],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.languages.length === 0) {
      setError('Pick at least one language you can speak')
      return
    }
    setLoading(true)
    setError('')
    try {
      await api.saveProfile({
        ...form,
        age: Number(form.age),
        interestedGender: form.interestedGender,
        hobbies: [form.hobby],
        musicTaste: form.musicTaste.split(',').map((s) => s.trim()).filter(Boolean),
        dealBreakers: form.dealBreakers.split(',').map((s) => s.trim()).filter(Boolean),
        redFlags: form.redFlags.split(',').map((s) => s.trim()).filter(Boolean),
        greenFlags: form.greenFlags.split(',').map((s) => s.trim()).filter(Boolean),
        availability: defaultAvailability,
      })

      localStorage.removeItem('haruka_signup_uni')
      await refresh()
      navigate('/match')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SiteLayout>
      <Section>
        <h1 className="font-display text-3xl font-bold">Complete Your Profile</h1>
        <p className="mt-2 max-w-xl text-muted">
          Tell Haruka who you are — budget, CGPA, hobbies, languages, and more. Your data stays
          private until a match is found.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* Basics */}
          <fieldset className="grid gap-4 sm:grid-cols-2">
            <legend className="mb-4 font-display text-lg font-semibold text-accent-bright">
              About you
            </legend>
            <div>
              <FieldLabel>Name</FieldLabel>
              <input
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel>Age</FieldLabel>
              <input
                type="number"
                min={18}
                max={99}
                required
                value={form.age}
                onChange={(e) => update('age', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Gender</FieldLabel>
              <RadioGroup
                name="gender"
                value={form.gender}
                options={genderOptions}
                onChange={(v) => update('gender', v)}
                columns={2}
              />
            </div>
          </fieldset>

          {/* Campus */}
          <fieldset className="grid gap-4 sm:grid-cols-2">
            <legend className="mb-4 font-display text-lg font-semibold text-accent-bright">
              Campus
            </legend>
            <div className="sm:col-span-2">
              <FieldLabel>University (Malaysia)</FieldLabel>
              <select
                required
                value={form.university}
                onChange={(e) => update('university', e.target.value)}
                className={inputClass}
              >
                <option value="">Select your university</option>
                {MALAYSIA_UNIVERSITIES.map((uni) => (
                  <option key={uni} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-dim">
                Haruka only matches students from the same university.
              </p>
            </div>
            <div>
              <FieldLabel>Faculty</FieldLabel>
              <input
                required
                value={form.faculty}
                onChange={(e) => update('faculty', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel>Course</FieldLabel>
              <input
                required
                value={form.course}
                onChange={(e) => update('course', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel>Year</FieldLabel>
              <select
                required
                value={form.year}
                onChange={(e) => update('year', e.target.value)}
                className={inputClass}
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>CGPA range</FieldLabel>
              <select
                required
                value={form.cgpa}
                onChange={(e) => update('cgpa', e.target.value)}
                className={inputClass}
              >
                {cgpaOptions.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Location</FieldLabel>
              <input
                required
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                className={inputClass}
                placeholder="e.g. Bandar Sunway"
              />
            </div>
          </fieldset>

          {/* Lifestyle */}
          <fieldset className="space-y-4">
            <legend className="mb-4 font-display text-lg font-semibold text-accent-bright">
              Lifestyle & preferences
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Personality type</FieldLabel>
                <input
                  required
                  value={form.personalityType}
                  onChange={(e) => update('personalityType', e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Playful introvert"
                />
              </div>
              <div>
                <FieldLabel>Dating goal</FieldLabel>
                <input
                  required
                  value={form.datingGoal}
                  onChange={(e) => update('datingGoal', e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Slow dating"
                />
              </div>
              <div>
                <FieldLabel>Food preference</FieldLabel>
                <input
                  required
                  value={form.foodPreference}
                  onChange={(e) => update('foodPreference', e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Café & dessert"
                />
              </div>
              <div>
                <FieldLabel>Budget per date</FieldLabel>
                <select
                  required
                  value={form.budgetPreference}
                  onChange={(e) => update('budgetPreference', e.target.value)}
                  className={inputClass}
                >
                  {budgetOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <FieldLabel>Main hobby</FieldLabel>
              <RadioGroup
                name="hobby"
                value={form.hobby}
                options={hobbyOptions}
                onChange={(v) => update('hobby', v)}
                columns={2}
              />
            </div>

            <div>
              <FieldLabel>Outdoor person?</FieldLabel>
              <RadioGroup
                name="outdoor"
                value={form.outdoorPerson}
                options={outdoorOptions}
                onChange={(v) => update('outdoorPerson', v)}
                columns={3}
              />
            </div>
          </fieldset>

          {/* Languages & health */}
          <fieldset className="space-y-4">
            <legend className="mb-4 font-display text-lg font-semibold text-accent-bright">
              Languages & allergies
            </legend>
            <div>
              <FieldLabel>Languages you can speak</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {languageOptions.map((lang) => {
                  const active = form.languages.includes(lang)
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleLanguage(lang)}
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-sm transition-colors',
                        active
                          ? 'border-accent/50 bg-accent/15 text-accent-bright'
                          : 'border-white/10 bg-white/5 text-muted hover:border-white/20',
                      )}
                    >
                      {lang}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="max-w-md">
              <FieldLabel>Allergies</FieldLabel>
              <select
                required
                value={form.allergies}
                onChange={(e) => update('allergies', e.target.value)}
                className={inputClass}
              >
                {allergyOptions.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <Button type="submit" disabled={loading} className="min-w-[200px]">
            {loading ? 'Saving...' : 'Save & Find Match'}
          </Button>
        </form>
      </Section>
    </SiteLayout>
  )
}
