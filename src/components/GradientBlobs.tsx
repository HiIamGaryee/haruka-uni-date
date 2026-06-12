import { motion } from 'framer-motion'

const blobMotion = (duration: number, delay = 0) => ({
  animate: {
    x: [0, 12, -8, 0],
    y: [0, -10, 6, 0],
    scale: [1, 1.04, 0.98, 1],
  },
  transition: {
    duration,
    delay,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
})

export function GradientBlobs() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        {...blobMotion(22)}
        className="blob blob-gold absolute -top-[20%] left-1/2 size-[min(90vw,720px)] -translate-x-1/2 rounded-full"
      />
      <motion.div
        {...blobMotion(26, 2)}
        className="blob blob-rose absolute -right-[10%] top-[15%] size-[min(60vw,480px)] rounded-full"
      />
      <motion.div
        {...blobMotion(24, 4)}
        className="blob blob-violet absolute -left-[15%] bottom-[5%] size-[min(55vw,420px)] rounded-full"
      />
      <motion.div
        {...blobMotion(28, 1)}
        className="blob blob-blue absolute right-[20%] bottom-[20%] size-[min(40vw,320px)] rounded-full"
      />
      <div className="grain absolute inset-0" />
    </div>
  )
}
