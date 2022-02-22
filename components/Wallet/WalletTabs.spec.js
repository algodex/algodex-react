import React from 'react'
import { render } from 'test/test-utils'
import { default as WalletAssetsTable } from './Table/AssetsTable'
import { default as WalletOpenOrdersTable } from './Table/OpenOrdersTable'
import { default as WalletTradeHistoryTable } from './Table/TradeHistoryTable'

describe('Order Book', () => {
  const OPEN_ORDERS_PANEL = 'open-orders'
  const ORDER_HISTORY_PANEL = 'order-history'
  const ASSETS_PANEL = 'assets'
  const isSignedIn = true
  const wallet = {
    address: 'NN3BAWDPHEJAPIGO3IDB6I4TGUMYG3JKWN26ZYICXEZM3QRWISGXUK6J3E'
  }

  it('should not show tab if not signed in', () => {
    const { queryByTestId } = render(<div></div>)

    expect(queryByTestId(isSignedIn)).toHaveValue(false)
    expect(queryByTestId(OPEN_ORDERS_PANEL)).toBeNull()
    expect(queryByTestId(ORDER_HISTORY_PANEL)).toBeNull()
    expect(queryByTestId(ASSETS_PANEL)).toBeNull()
  })

  it('should show open orders', () => {
    const { queryByTestId } = render(<WalletOpenOrdersTable wallet={wallet} />)
    expect(queryByTestId(isSignedIn)).toHaveValue(true)
    expect(queryByTestId('has-wallet')).not.toBeNull()
    expect(queryByTestId(OPEN_ORDERS_PANEL)).not.toBeNull()
    expect(queryByTestId(ORDER_HISTORY_PANEL)).toBeNull()
    expect(queryByTestId(ASSETS_PANEL)).toBeNull()
  })

  it('should show trade history', () => {
    const { queryByTestId } = render(<WalletTradeHistoryTable wallet={wallet} />)
    expect(queryByTestId(isSignedIn)).toHaveValue(true)
    expect(queryByTestId('has-wallet')).not.toBeNull()
    expect(queryByTestId(OPEN_ORDERS_PANEL)).toBeNull()
    expect(queryByTestId(ORDER_HISTORY_PANEL)).not.toBeNull()
    expect(queryByTestId(ASSETS_PANEL)).toBeNull()
  })

  it('should show wallet asset table', () => {
    const { queryByTestId } = render(<WalletAssetsTable wallet={wallet} />)
    expect(queryByTestId(isSignedIn)).toHaveValue(true)
    expect(queryByTestId('has-wallet')).not.toBeNull()
    expect(queryByTestId(OPEN_ORDERS_PANEL)).toBeNull()
    expect(queryByTestId(ORDER_HISTORY_PANEL)).toBeNull()
    expect(queryByTestId(ASSETS_PANEL)).not.toBeNull()
  })
})

// import { matchers } from '@emotion/jest'
// import { render } from 'test/test-utils'
// import WalletTabs from './WalletTabs'
// // import Header from './WalletTabs'
// // import Container from './WalletTabs'
// // import Tab from './WalletTabs'

// expect.extend(matchers)

// describe('WalletTabs', () => {
//   it('Should display WalletTabs as flex', () => {
//     const { queryByTestId } = render(<WalletTabs data-testid="WalletTabs-element">hello</WalletTabs>)
//     expect(queryByTestId('WalletTabs-element')).toHaveStyle('display: flex')
//     expect(queryByTestId('WalletTabs-element')).not.toHaveStyle('display: block')
//   })
// })

// // describe('Tab', () => {
// //   it('Should display tab as flex', () => {
// //     const { queryByTestId } = render(<Tab data-testid="Tab-element">hello</Tab>)
// //     expect(queryByTestId('Tab-element')).toHaveStyle('display: flex')
// //     expect(queryByTestId('Tab-element')).not.toHaveStyle('display: block')
// //   })
// // })

// // describe('Header', () => {
// //   it('Should display Header as flex', () => {
// //     const { queryByTestId } = render(
// //       <Header data-testid="Header-element">
// //         <Tab>Hello</Tab>
// //         <Tab>Hello</Tab>
// //       </Header>
// //     )
// //     expect(queryByTestId('Header-element')).toHaveStyle('display: flex')
// //     expect(queryByTestId('Header-element')).not.toHaveStyle('display: block')
// //     expect(queryByTestId('Header-element')).toHaveStyle('padding: 0 1.125rem')
// //   })
// // })

// // describe('Container', () => {
// //   it('Should display Container flex as colomn', () => {
// //     const { queryByTestId } = render(
// //       <Container data-testid="Container-element">
// //         <Header>
// //           <Tab>Hello</Tab>
// //           <Tab>Hello</Tab>
// //         </Header>
// //       </Container>
// //     )
// //     expect(queryByTestId('Container-element')).toHaveStyle('display: flex')
// //     expect(queryByTestId('Container-element')).toHaveStyle('flex-direction: column')
// //   })
// // })
