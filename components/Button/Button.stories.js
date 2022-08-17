import ButtonEl from './Button'
import React from 'react'
export default {
  title: '@algodex/components/Button',
  component: ButtonEl,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'third', 'none'],
      control: { type: 'radio' }
    },
    type: {
      options: ['button'],
      control: { type: 'radio' }
    }
  },
  args: {
    variant: 'primary',
    type: 'button',
    children: 'Storybook'
  }
}

//eslint-disable-next-line
export const Button = (props) => {
  return <ButtonEl {...props} />
}
