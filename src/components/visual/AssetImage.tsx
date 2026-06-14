import { motion } from 'framer-motion'
import type { VisualAsset } from '../../data/visualAssets'
import { cn } from '../../lib/cn'

type AssetImageProps = {
  asset: VisualAsset
  className?: string
  animate?: 'none' | 'float' | 'float-slow'
}

const floatMotion = {
  float: {
    animate: { y: [0, -6, 0] as number[] },
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const },
  },
  'float-slow': {
    animate: { y: [0, -4, 0] as number[] },
    transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' as const },
  },
}

export function AssetImage({ asset, className, animate = 'none' }: AssetImageProps) {
  const imgClass = cn(
    'h-auto w-full max-w-full select-none',
    asset.fit === 'cover' ? 'object-cover' : 'object-contain',
    animate === 'none' ? className : undefined,
  )

  const img = (
    <img
      src={asset.src}
      alt={asset.decorative ? '' : asset.alt}
      aria-hidden={asset.decorative || undefined}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={imgClass}
    />
  )

  if (animate === 'none') return img

  return (
    <motion.div className={className} {...floatMotion[animate]}>
      {img}
    </motion.div>
  )
}
