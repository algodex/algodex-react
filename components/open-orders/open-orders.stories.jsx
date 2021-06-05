import { openOrders } from 'data'
import React from 'react'
import styled from 'styled-components'
import OpenOrders from '.'

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
  title: 'Open Orders',
  component: OpenOrders,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

const Template = (args) => <OpenOrders {...args} />

export const Default = Template.bind({})
Default.args = {
  openOrders
}

export const NoOpenOrders = Template.bind({})
NoOpenOrders.args = {
  openOrders: []
}
