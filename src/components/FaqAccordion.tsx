import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { easeOut } from '../lib/motion'
import { cn } from '../lib/cn'

type FaqItem = {
  question: string
  answer: string
}

type FaqAccordionProps = {
  items: readonly FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={item.question}
            className="glass card-hover overflow-hidden rounded-2xl"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              aria-expanded={isOpen}
            >
              <span className="font-display text-sm font-semibold sm:text-base">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  'size-5 shrink-0 text-muted transition-transform duration-300',
                  isOpen && 'rotate-180 text-accent',
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: easeOut }}
                >
                  <p className="border-t border-white/8 px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
