import React from 'react'
import { OrderBookView as Component, default as ComponentWithData } from './OrderBook'
import { ReactQueryDevtools } from 'react-query/devtools'
/**
 * @todo: Add Full Selection for Assets
 * @todo: Add withData hooks and isLive flag
 */
const assets = {
  VOTE: { id: 48806985, decimals: 6 },
  LAMP: { id: 15322902, decimals: 6 }
}

export default {
  title: '@algodex/recipes/Asset/Orderbook',
  component: Component,
  argTypes: {
    asset: {
      options: Object.keys(assets),
      mapping: assets,
      control: {
        type: 'select'
      }
    }
  },
  args: {
    asset: {
      id: 15322902,
      name: 'LAMP',
      decimals: 6,
      price: 0.5
    },
    isLive: false,
    sellData: [
      {
        amount: 0.004234,
        price: '1000000000000000000.0000',
        total: 33.38740400000001
      },
      {
        amount: 0.042853,
        price: '10000000000000000.0000',
        total: 33.383170000000014
      }
    ],
    buyData: [
      {
        amount: 0.026283,
        price: '1950.0000',
        total: 0.026283
      },
      {
        amount: 0.008604,
        price: '1850.0000',
        total: 0.034887
      },
      {
        amount: 1.1598770000000003,
        price: '1800.0000',
        total: 1.1947640000000002
      }
    ]
  },
  parameters: { layout: 'fullscreen', controls: { exclude: ['sellData', 'buyData'] } },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Story />
      </div>
    )
  ]
}
//eslint-disable-next-line
export const Orderbook = ({ asset, sellData, buyData, isLive }) => (
  <>
    {!isLive && <Component asset={asset} sellData={sellData} buyData={buyData} />}
    {isLive && <ComponentWithData asset={asset} />}
    {isLive && <ReactQueryDevtools initialIsOpen={false} />}
  </>
)
