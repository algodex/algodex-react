import React from 'react'
import Button from './Button'
import { FlexContainer } from 'components/Layout'

export default {
  title: '@algodex/components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'none'],
      control: { type: 'radio' }
    },
    type: {
      options: ['button'],
      control: { type: 'radio' }
    }
  },
  decorators: [
    (Story) => (
      <FlexContainer>
        <Story />
      </FlexContainer>
    )
  ]
}

const Template = (args) => <Button {...args}>{args.children}</Button>

export const Default = Template.bind({})
Default.args = {
  variant: 'primary',
  type: 'button',
  children: 'Storybook'
}
