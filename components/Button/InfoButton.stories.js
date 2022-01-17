import React from 'react'
import InfoButton from './InfoButton'
import { FlexColumn } from 'components/Layout'

export default {
  title: '@algodex/components/Button/InfoButton',
  component: InfoButton,
  decorators: [
    (Story) => (
      <FlexColumn>
        <Story />
      </FlexColumn>
    )
  ]
}

const Template = (args) => <InfoButton {...args} />

export const Default = Template.bind({})
Default.args = {}
