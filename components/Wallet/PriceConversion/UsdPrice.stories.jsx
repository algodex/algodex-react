import React from 'react'
import { UsdPrice as Component } from './UsdPrice'

export default {
  title: '@algodex/recipes/Wallet/Price Conversion',
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
export const UsdPrice = ({ isRegenerate, algoPrice, priceToConvert, currency, ...props }) => {
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
