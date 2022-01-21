import { default as Component } from '.'
import React from 'react'

export default {
  title: 'Nav',
  component: Component
}

const Template = (args) => <Component {...args} />

export const Header = Template.bind({})

Header.args = {
  variant: 'large',
  fontSize: 2
}
