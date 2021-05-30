import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import Header from '.'

export default {
  title: 'Header',
  component: Header
}

const Template = (args) => <Header {...args} />

export const Default = Template.bind({})
Default.args = {
  variant: 'large',
  fontSize: 2
}
