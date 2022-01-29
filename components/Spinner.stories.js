import React from 'react'
import { default as Component } from './Spinner'
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
  title: '@algodex/components/Spinner',
  component: Component,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    color: {
      options: [
        'gray.000',
        'gray.100',
        'gray.200',
        'gray.300',
        'gray.400',
        'gray.500',
        'gray.600',
        'gray.700',
        'gray.800',
        'gray.900'
      ],
      control: { type: 'select' }
    },
    flex: {
      options: [true, false],
      control: { type: 'radio' }
    },
    size: {
      control: { type: 'range', min: 1, max: 10 }
    }
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

export const Spinner = Template.bind({})
Spinner.args = {
  color: 'gray.600',
  flex: true,
  size: 5
}
