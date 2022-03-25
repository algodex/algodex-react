import React from 'react'
import { USDPrice as Component } from './USDPrice'

export default {
  title: '@algodex/recipes/Wallet/Price Conversion',
  component: Component,
  parameters: { layout: 'fullscreen' },
  args: {
    isRegenerate: false,
    algoPrice: 260,
    priceToConvert: 3000
  }
}

/* eslint-disable */
export const USDPrice = ({ isRegenerate, algoPrice, priceToConvert, ...props }) => {
  if (isRegenerate) {
    algoPrice = 0
  }
  return <Component algoPrice={algoPrice} priceToConvert={priceToConvert} {...props} />
}
