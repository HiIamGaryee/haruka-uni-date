import { motion } from 'framer-motion'
import {
  Brain,
  MessageCircle,
  Music,
  Plane,
  Star,
  Tv,
  Utensils,
  Zap,
} from 'lucide-react'
import { conversationStarters } from '../../data/datePlanner'
import type { ConversationStarter } from '../../data/datePlanner'
import { easeOut } from '../../lib/motion'
import { PlannerCard } from './PlannerCard'
import { cn } from '../../lib/cn'

const iconMap = {
  message: MessageCircle,
  brain: Brain,
  zap: Zap,
  star: Star,
  utensils: Utensils,
  tv: Tv,
  music: Music,
  plane: Plane,
} as const

function StarterCard({ item, index }: { item: ConversationStarter; index: number }) {
  const Icon = iconMap[item.icon]
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: easeOut }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        'group rounded-2xl border border-white/10 bg-white/[0.04] p-4',
        'card-hover cursor-default',
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="flex size-8 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition-colors group-hover:bg-violet-500/20">
          <Icon className="size-4" />
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-muted">
          {item.category}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-text/90">&ldquo;{item.text}&rdquo;</p>
    </motion.div>
  )
}

export function ConversationStarters() {
  return (
    <PlannerCard delay={0.1}>
      <div className="border-b border-white/8 px-5 py-4 sm:px-6">
        <h3 className="font-display text-xl font-bold">AI Conversation Starters</h3>
        <p className="mt-1 text-sm text-muted">Icebreakers tuned to your match energy</p>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-2 sm:gap-4 sm:p-6 lg:grid-cols-4">
        {conversationStarters.map((item, i) => (
          <StarterCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </PlannerCard>
  )
}
