import React from 'react'
import styled from 'styled-components'
import Spinner from '.'

const Container = styled.div`
  width: 320px;
  height: 320px;
  background: ${({ theme }) => theme.colors.gray['800']};
  display: flex;
`

export default {
  title: 'Spinner',
  component: Spinner,
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

const Template = (args) => <Spinner {...args} />

export const Default = Template.bind({})
Spinner.args = {
  color: 'gray.600',
  flex: false,
  size: 5
}
