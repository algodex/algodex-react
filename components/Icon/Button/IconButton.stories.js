import React from 'react'
import { IconButton as Component } from './IconButton'
import styled from 'styled-components'
import * as Icons from 'react-feather'

const colors = ['blue', 'amber', 'green', 'gray', 'red']
const mapping = Object.keys(Icons).reduce((previousValue, next) => {
  previousValue[next] = next
  return previousValue
}, {})

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[200]};
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
`
export default {
  title: '@algodex/components/Icon/Button',
  component: Component,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    color: {
      options: colors,
      control: { type: 'select' }
    },
    icon: {
      options: Object.keys(Icons),
      mapping: mapping,
      control: {
        type: 'select'
      }
    },
    gradient: { control: { type: 'range', min: 0, max: 900, step: 100 } },
    fillGradient: { control: { type: 'range', min: 0, max: 900, step: 100 } },
    size: { control: { type: 'range', min: 1, max: 1000 } }
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

const Template = (args) => <Component {...args} />

export const Button = Template.bind({})
Button.args = {
  icon: 'Info',
  size: 500,
  onClick: () => console.log('Clicked')
}
