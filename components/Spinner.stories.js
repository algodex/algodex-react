import React from 'react'
import Spinner from './Spinner'
import { FlexColumn } from './Layout'

export default {
  title: '@algodex/components/Spinner',
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
      <FlexColumn>
        <Story />
      </FlexColumn>
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
