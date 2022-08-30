import React from 'react'
import { StableAssetUSDPrice as Component } from './StableAssetUSDPrice'

export default {
  title: '@algodex/recipes/Wallet/Stable Asset Price Conversion',
  component: Component,
  parameters: { layout: 'fullscreen' },
  args: {
    isRegenerate: false,
    algoPrice: 260,
    priceToConvert: 3000,
    currency: '$'
  }
}

/* eslint-disable */
export const StableAssetUSDPrice = ({ isRegenerate, algoPrice, priceToConvert, currency, ...props }) => {
  if (isRegenerate) {
    algoPrice = 0
  }
  return (
    <Component
      algoPrice={algoPrice}
      priceToConvert={priceToConvert}
      currency={currency}
      {...props}
    />
  )
}
