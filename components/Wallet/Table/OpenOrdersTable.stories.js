import React from 'react'
import { OpenOrdersTable as Component, default as ComponentWithData } from './OpenOrdersTable'
import styled from '@emotion/styled'
import { ReactQueryDevtools } from 'react-query/devtools'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.palette.gray['700']};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
`
export default {
  title: '@algodex/recipes/Wallet/Table/Open Orders Table',
  component: Component,
  parameters: { layout: 'fullscreen', controls: { exclude: ['wallet', 'orders'] } },
  args: {
    isLive: false,
    wallet: {
      address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
    },
    orders: [
      {
        id: 21547225,
        date: '2022-01-19 15:11:46',
        unix_time: 1642626706,
        price: '1000.0000',
        pair: 'BTC/ALGO',
        type: 'BUY',
        status: 'OPEN',
        amount: '1000.000'
      }
    ]
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

//eslint-disable-next-line
export const OpenOrdersTable = ({ wallet, orders, isLive, ...props }) => (
  <>
    {!isLive && <Component wallet={wallet} orders={orders} {...props} />}
    {isLive && <ComponentWithData wallet={wallet} />}
    {isLive && <ReactQueryDevtools initialIsOpen={false} />}
  </>
)
