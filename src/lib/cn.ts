import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes with conflict resolution (e.g. `p-4` + `p-6` → `p-6`). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
