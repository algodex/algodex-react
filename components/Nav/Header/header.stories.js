import React from 'react'
import Header from '.'

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
