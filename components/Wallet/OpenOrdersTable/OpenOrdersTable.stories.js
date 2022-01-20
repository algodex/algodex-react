import React from 'react'
import { OpenOrders as Component, default as ComponentWithData } from './WalletOpenOrdersTable'
import styled from 'styled-components'

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
  title: 'Wallet/Wallet Open Orders',
  component: Component,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

const Template = (args) => <Component {...args} />
const TemplateWithData = (args) => <ComponentWithData {...args} />

export const OpenOrders = Template.bind({})
OpenOrders.args = {
  wallet: {
    address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
  }
}

export const OpenOrdersPreview = TemplateWithData.bind({})
OpenOrdersPreview.args = {
  wallet: {
    address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
  }
}
