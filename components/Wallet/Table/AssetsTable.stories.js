import React from 'react'
import { AssetsTable as Component, default as ComponentWithData } from './AssetsTable'
import styled from 'styled-components'
import { ReactQueryDevtools } from 'react-query/devtools'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.gray['700']};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
`

export default {
  title: '@algodex/recipes/Wallet/Table/Assets Table',
  component: Component,
  parameters: { layout: 'fullscreen', controls: { exclude: ['assets', 'wallet'] } },
  args: {
    wallet: {
      address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
    },
    assets: [
      {
        unit: 'TEST',
        id: 22847687,
        name: 'TEST',
        total: '100',
        available: '10',
        'in-order': '0',
        'algo-value': '0.888'
      }
    ],
    isLive: false
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
export const AssetsTable = ({ wallet, assets, isLive, ...props }) => (
  <>
    {!isLive && <Component wallet={wallet} assets={assets} {...props} />}
    {isLive && <ComponentWithData wallet={wallet} />}
    {isLive && <ReactQueryDevtools initialIsOpen={false} />}
  </>
)
