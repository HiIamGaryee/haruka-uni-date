import {
  Coffee,
  Footprints,
  HandHeart,
  MessageCircleHeart,
  Users,
} from 'lucide-react'
import type { JourneyIcon as JourneyIconName } from '../../data/journeyTimeline'

type JourneyIconProps = {
  icon: JourneyIconName
  className?: string
  strokeWidth?: number
}

export function JourneyIcon({ icon, className, strokeWidth = 1.75 }: JourneyIconProps) {
  switch (icon) {
    case 'meet':
      return <Users className={className} strokeWidth={strokeWidth} />
    case 'coffee':
      return <Coffee className={className} strokeWidth={strokeWidth} />
    case 'icebreaker':
      return <MessageCircleHeart className={className} strokeWidth={strokeWidth} />
    case 'walk':
      return <Footprints className={className} strokeWidth={strokeWidth} />
    case 'goodbye':
      return <HandHeart className={className} strokeWidth={strokeWidth} />
  }
}
