import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Calendar,
  Heart,
  LogOut,
  MapPin,
  MessageCircle,
  Sparkles,
  User,
} from 'lucide-react'
import { DateSchedulePicker } from '../../components/match/DateSchedulePicker'
import { MeetupSafetyCard } from '../../components/safety/MeetupSafetyCard'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'
import { api, type MatchResultPayload } from '../../lib/api'
import { getInitials } from '../../data/students'

function ProfileCard({
  title,
  profile,
  accent,
}: {
  title: string
  profile: MatchResultPayload['self']
  accent: string
}) {
  return (
    <div className="glass flex h-full flex-col rounded-[28px] p-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-dim">
        <User className="size-3.5" />
        {title}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div
          className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-bold text-white ${accent}`}
        >
          {getInitials(profile.name)}
        </div>
        <div>
          <p className="font-display text-xl font-bold">{profile.name}</p>
          <p className="text-sm text-muted">
            {profile.course} · {profile.year}
          </p>
        </div>
      </div>
      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between border-b border-white/5 pb-2">
          <dt className="text-dim">University</dt>
          <dd className="text-right">{profile.university}</dd>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-2">
          <dt className="text-dim">Personality</dt>
          <dd>{profile.personalityType}</dd>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-2">
          <dt className="text-dim">Dating goal</dt>
          <dd>{profile.datingGoal}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-dim">Comfort</dt>
          <dd>{profile.comfortLevel}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        {profile.interests.slice(0, 6).map((i) => (
          <span
            key={i}
            className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-muted"
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  )
}

export function MatchResultPage() {
  const { matchId } = useParams<{ matchId: string }>()
  const { user, logout } = useAuth()
  const [data, setData] = useState<MatchResultPayload | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [scheduling, setScheduling] = useState(false)

  const scheduleConfirmed = data?.datePlan?.scheduleConfirmed === true

  useEffect(() => {
    if (!matchId) return
    api.match
      .result(matchId)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load match'))
      .finally(() => setLoading(false))
  }, [matchId])

  if (!user) return <Navigate to="/login" replace />
  if (!matchId) return <Navigate to="/profile" replace />

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-muted">
        Revealing your match...
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-4 text-center">
        <p className="text-rose-400">{error || 'Match not available'}</p>
        <Button to="/profile">Back to profile</Button>
      </div>
    )
  }

  const score = Math.round(data.match.compatibilityScore)

  async function handleSchedule(input: {
    scheduledDate: string
    timeStart: string
    timeEnd: string
  }) {
    if (!matchId) return
    setScheduling(true)
    setError('')
    try {
      const { datePlan } = await api.match.schedule(matchId, input)
      setData((prev) => (prev ? { ...prev, datePlan } : prev))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule date')
    } finally {
      setScheduling(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-white/8 bg-bg-elevated/80 backdrop-blur-xl">
        <div className="section-container flex items-center justify-between py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-dim">
              haruka.match.reveal
            </p>
            <h1 className="font-display text-xl font-bold">Your soulmate match</h1>
          </div>
          <div className="flex gap-2">
            <Button to="/profile" variant="ghost" size="sm">
              My profile
            </Button>
            <Button variant="secondary" size="sm" onClick={logout}>
              <LogOut className="size-3.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="section-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold text-rose-300">
            <Heart className="size-3.5 fill-current" />
            Match revealed · Only you and your partner
          </div>
          <p className="mt-6 font-display text-6xl font-bold text-gradient-gold">{score}%</p>
          <p className="mt-2 text-sm text-muted">Compatibility score</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ProfileCard
            title="Your Profile"
            profile={data.self}
            accent="from-violet-500 to-purple-600"
          />
          <ProfileCard
            title="Your Match"
            profile={data.partner}
            accent="from-emerald-500 to-teal-600"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 glass rounded-[28px] p-6"
        >
          <div className="flex items-center gap-2 text-accent">
            <Sparkles className="size-4" />
            <p className="text-xs font-semibold uppercase tracking-widest">Why this match works</p>
          </div>
          <p className="mt-3 text-muted">{data.match.aiReason}</p>
          {data.match.sharedInterests.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-dim">
                Shared interests
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.match.sharedInterests.map((i) => (
                  <span
                    key={i}
                    className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent-bright"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          )}
          <p className="mt-4 text-sm text-muted">
            Comfort level: <span className="text-fg">{data.match.comfortLevel}</span>
          </p>
        </motion.div>

        {data.datePlan && !scheduleConfirmed && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-8 space-y-4"
          >
            <div className="glass rounded-2xl p-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-dim">
                Suggested plan
              </p>
              <p className="mt-1 font-semibold">{data.datePlan.title}</p>
              <p className="text-muted">{data.datePlan.location} · {data.datePlan.budget}</p>
            </div>
            <DateSchedulePicker onConfirm={handleSchedule} loading={scheduling} />
            {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
          </motion.div>
        )}

        {data.datePlan && scheduleConfirmed && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 planner-card p-6"
          >
            <div className="flex items-center gap-2 text-accent">
              <Calendar className="size-4" />
              <p className="text-xs font-semibold uppercase tracking-widest">
                AI date plan · 3+ hours
              </p>
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold">{data.datePlan.title}</h2>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
              <span className="flex items-center gap-2">
                <MapPin className="size-3.5" />
                {data.datePlan.location}
              </span>
              <span>{data.datePlan.time}</span>
              <span>{data.datePlan.budget}</span>
            </div>
            <p className="mt-2 text-sm text-dim">{data.datePlan.vibe}</p>
            <p className="mt-3 rounded-xl border border-accent/20 bg-accent/5 px-3 py-2 text-xs text-accent-bright">
              Includes ~2 hours café time · minimum 3-hour date
            </p>
            <div className="mt-5 space-y-3 border-t border-white/8 pt-4">
              {data.datePlan.timeline.map((step) => (
                <div key={step.time + step.title} className="flex gap-3 text-sm">
                  <span className="w-20 shrink-0 font-mono text-xs text-accent">{step.time}</span>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    {step.description && <p className="text-xs text-dim">{step.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {scheduleConfirmed && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-[28px] p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-dim">
              <MessageCircle className="size-3.5" />
              Conversation starters
            </div>
            <ul className="mt-4 space-y-3">
              {data.conversationStarters.map((s) => (
                <li
                  key={s.text}
                  className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-muted"
                >
                  {s.text}
                </li>
              ))}
            </ul>
          </div>
          <MeetupSafetyCard
            safetyNote={data.match.safetyNote}
            datePlan={data.datePlan}
            userName={data.self.name}
            partnerName={data.partner.name}
          />
        </div>
        )}

        <p className="mt-8 text-center text-xs text-dim">
          <Link to="/" className="text-accent hover:underline">
            Back to home
          </Link>
        </p>
      </main>
    </div>
  )
}
