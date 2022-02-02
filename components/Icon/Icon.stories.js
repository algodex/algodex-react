/* eslint-disable */
import React from 'react'
import styled from '@emotion/styled'
import { Icon as Component, ICONS } from './Icon'
import * as Icons from 'react-feather'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.palette.gray['300']};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
`

const colors = ['blue', 'amber', 'green', 'gray', 'red']
const mapping = Object.keys(Icons).reduce((previousValue, next) => {
  previousValue[next] = next
  return previousValue
}, {})

export default {
  title: '@algodex/components/Icon',
  component: Component,
  parameters: { layout: 'fullscreen' },
  args: {
    use: 'algoLogo',
    size: 10,
    // color: 'gray'
  },
  argTypes: {
    use: {
      options: Object.keys(mapping),
      mapping: mapping,
      control: {
        type: 'select'
      }
    },
    rowHeight: {
      control: { type: 'range', min: 0, max: 100 }
    }
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

export const Icon = (args) => {
  return <Component {...args} />
}
