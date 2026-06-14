import { decorationAssets, getDecorationPlacement } from '../../data/visualAssets'
import { AssetImage } from './AssetImage'

type DecorativeAssetProps = {
  placementId: string
}

export function DecorativeAsset({ placementId }: DecorativeAssetProps) {
  const placement = getDecorationPlacement(placementId)
  if (!placement) return null

  return (
    <AssetImage
      asset={decorationAssets[placement.assetKey]}
      animate={placement.animate}
      className={placement.className}
    />
  )
}
