import React from 'react'
import { PlaceOrderForm as Component } from './Form'
import generateAsset from 'spec/Asset'

const testAsset = generateAsset()
export default {
  title: '@algodex/recipes/Wallet/Place Order Form',
  component: Component,
  parameters: { layout: 'fullscreen' },
  args: {
    isRegenerate: false,
    asset: testAsset,
    wallet: {
      address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I',
      balance: 100,
      assets: {
        [testAsset.id]: {
          balance: 0
        }
      }
    },
    onSubmit: (e) => {
      let order = {
        amount: e.target.amount.value,
        type: e.target.type.value,
        price: e.target.price.value,
        total: e.target.total.value,
        asset: e.target.asset.value
        // execution: e.target.execution.value
      }
      console.log(order)
      e.preventDefault()
    }
  }
}

/* eslint-disable */
export const PlaceOrderForm = ({isRegenerate, asset, wallet, ...props}) => {
  if (isRegenerate) {
    asset = generateAsset()
    wallet.assets[asset.id] = wallet.assets[testAsset.id]
  }
  return <Component asset={asset} wallet={wallet} {...props} />
}
