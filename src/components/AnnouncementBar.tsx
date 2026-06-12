import { motion } from 'framer-motion'
import { announcement } from '../data/homepage'

export function AnnouncementBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="border-b border-accent/20 bg-accent/[0.08] px-4 py-2.5 text-center text-xs font-medium tracking-wide text-accent-bright sm:text-sm"
    >
      <span>{announcement.text}</span>
      <span className="mx-2 opacity-40">·</span>
      <span>{announcement.highlight}</span>
    </motion.div>
  )
}
