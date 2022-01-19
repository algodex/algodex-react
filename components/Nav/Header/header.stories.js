import Header from '.'
import React from 'react'

export default {
  title: 'Nav/Header',
  component: Header
}

const Template = (args) => <Header {...args} />

export const Default = Template.bind({})

Default.args = {
  variant: 'large',
  fontSize: 2
}
