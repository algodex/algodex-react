import { demoOrderHistoryData } from './demo'
import React from 'react'
import styled from 'styled-components'
import OrderHistory from '.'

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[800]};
  display: flex;
  width: 800px;
  height: 250px;
  flex-direction: column;
  padding: 0;
  margin: 0;
`

export default {
  title: 'Order History',
  component: OrderHistory,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

const Template = (args) => <OrderHistory {...args} />

export const Default = Template.bind({})
Default.args = {
  orderHistory: demoOrderHistoryData
}

export const NoOrderHistory = Template.bind({})
NoOrderHistory.args = {
  orderHistory: []
}
