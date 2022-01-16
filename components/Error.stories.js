import React from 'react'
import styled from 'styled-components'
import Error from './Error'

const Container = styled.div`
  width: 320px;
  height: 320px;
  background: ${({ theme }) => theme.colors.gray['800']};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
`

export default {
  title: 'Error',
  component: Error,
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

const Template = (args) => <Error {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'gray.600',
  flex: false,
  size: 4,
  message: 'Error loading data'
}
