import React from 'react'
import styled from 'styled-components'
import Orders from '.'

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
  title: 'Wallet/Tabs',
  component: Orders,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

const Template = (args) => <Orders {...args} />

export const Default = Template.bind({})
Default.args = {
  openOrders: [],
  orderHistory: [],
  assets: {}
}
export const Empty = Template.bind({})
Empty.args = {
  openOrders: [],
  orderHistory: [],
  assets: []
}
