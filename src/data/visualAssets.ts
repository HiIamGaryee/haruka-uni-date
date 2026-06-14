import brandLogo from '../assets/branding/logo.png'
import glassPlatform from '../assets/decorations/glass_platform.png'

export type VisualAsset = {
  src: string
  alt: string
  fit: 'cover' | 'contain'
  decorative?: boolean
}

export type DecorationPlacement = {
  id: string
  assetKey: keyof typeof decorationAssets
  animate: 'none' | 'float' | 'float-slow'
  className: string
}

export const brandAssets = {
  logo: {
    src: brandLogo,
    alt: 'Haruka Uni Date',
    fit: 'contain',
  },
} as const satisfies Record<string, VisualAsset>

export const decorationAssets = {
  glassPlatform: {
    src: glassPlatform,
    alt: '',
    fit: 'contain',
    decorative: true,
  },
} as const satisfies Record<string, VisualAsset>

export const decorationPlacements: DecorationPlacement[] = [
  {
    id: 'hero-stats',
    assetKey: 'glassPlatform',
    animate: 'float',
    className:
      'pointer-events-none absolute -bottom-6 left-1/2 z-0 w-[min(72vw,220px)] -translate-x-1/2 opacity-55 sm:w-[240px]',
  },
  {
    id: 'match-engine-score',
    assetKey: 'glassPlatform',
    animate: 'float-slow',
    className:
      'pointer-events-none absolute bottom-0 left-1/2 z-0 w-[min(70vw,200px)] -translate-x-1/2 translate-y-1/3 opacity-50',
  },
  {
    id: 'cta-glow',
    assetKey: 'glassPlatform',
    animate: 'float-slow',
    className:
      'pointer-events-none absolute -bottom-10 left-1/2 z-0 w-[min(60vw,180px)] -translate-x-1/2 opacity-35',
  },
]

export function getDecorationPlacement(id: string): DecorationPlacement | undefined {
  return decorationPlacements.find((p) => p.id === id)
}
