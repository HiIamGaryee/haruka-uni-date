import brandLogo from '../assets/branding/logo.png'
import glassPlatform from '../assets/decorations/glass_platform.png'

export type VisualAsset = {
  src: string
  alt: string
  fit: 'cover' | 'contain'
  decorative?: boolean
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
