import React from 'react'
import { CurrencyInput as Component } from './CurrencyInput'
import styled from '@emotion/styled'
import asset from 'spec/Asset'
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.palette.gray['400']};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
`
export default {
  title: '@algodex/components/Input',
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

export const OrderInput = Template.bind({})
OrderInput.args = {
  label: 'Price',
  currency: asset.name
}
