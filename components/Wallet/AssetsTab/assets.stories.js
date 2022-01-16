import { demoAssetsData } from './demo'
import React from 'react'
import styled from 'styled-components'
import Assets from '.'

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[800]};
  display: flex;
  width: 800px;
  height: 250px;
  flex-direction: column;
  padding: 0;
  margin: 0;
`

export default {
  title: 'Assets',
  component: Assets,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

const Template = (args) => <Assets {...args} />

export const Default = Template.bind({})
Default.args = {
  assets: demoAssetsData
}

export const NoAssets = Template.bind({})
NoAssets.args = {
  assets: []
}
