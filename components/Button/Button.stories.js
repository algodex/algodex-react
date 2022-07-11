import React from 'react'
import { Button as Component } from './Button'
export default {
  title: '@algodex/components/Button',
  component: Component,
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
  return <Component {...props} />
}
