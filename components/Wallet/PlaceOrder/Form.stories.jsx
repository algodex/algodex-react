import { PlaceOrderForm as Component } from './Form'
import React from 'react'
// import asset from 'spec/Asset'
import styled from '@emotion/styled'
import generateAsset, { Example } from 'spec/Asset'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.gray['800']};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
`

export default {
  title: '@algodex/recipes/Wallet/Place Order Form',
  component: Component,
  parameters: { layout: 'fullscreen' },
  args: {
    isRegenerate: false,
    asset: Example,
    wallet: {
      address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I',
      balance: 100,
      assets: {
        [Example.id]: {
          balance: 100
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
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

/* eslint-disable */
export const PlaceOrderForm = ({isRegenerate, asset, wallet, ...props}) => {
  if (isRegenerate) {
    asset = generateAsset()
    wallet.assets[asset.id] = wallet.assets[Example.id]
  }
  return <Component asset={asset} wallet={wallet} {...props} />
}
