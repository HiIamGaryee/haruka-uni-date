export const easeOut = [0.22, 1, 0.36, 1] as const

export const pageEntrance = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.45, ease: 'easeOut' },
} as const

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: easeOut },
} as const

export const fadeUpDelayed = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: easeOut },
})

export const scrollReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: easeOut },
} as const

export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
} as const

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
} as const
