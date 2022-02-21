import React from 'react'
import { UsdPrice as Component } from './UsdPrice'

export default {
  title: '@algodex/recipes/Wallet/Price Conversion',
  component: Component,
  parameters: { layout: 'fullscreen' },
  args: {
    isRegenerate: false,
    data: { algoPrice: '260' },
    fontSize: '1rem',
    priceToConvert: 3000
  }
}

/* eslint-disable */
export const UsdPrice = ({ isRegenerate, data, fontSize, priceToConvert, ...props }) => {
  if (isRegenerate) {
    data = {}
  }
  return <Component data={data} fontSize={fontSize} priceToConvert={priceToConvert} {...props} />
}
