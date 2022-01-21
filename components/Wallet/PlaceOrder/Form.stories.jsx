import React from 'react'
import { PlaceOrderForm as Component } from './Form'
import styled from 'styled-components'
import asset from 'spec/Asset'

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
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

const Template = (args) => <Component {...args} />
// const TemplateWithData = (args) => <ComponentWithData {...args} />
delete asset.name
export const PlaceOrderForm = Template.bind({})
PlaceOrderForm.args = {
  asset,
  wallet: {
    address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I',
    balance: 100,
    assets: {
      15322902: {
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

// export const OpenOrdersPreview = TemplateWithData.bind({})
// OpenOrdersPreview.args = {
//     wallet: {
//         address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
//     }
// }
