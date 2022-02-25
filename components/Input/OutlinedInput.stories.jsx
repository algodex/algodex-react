import React from 'react'
import { OutlinedInput as Component } from './OutlinedInput'
import styled from '@emotion/styled'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.gray['700']};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
`
export default {
  title: '@algodex/components/Input/Outlined Input',
  component: Component,
  parameters: { layout: 'fullscreen' },
  args: {},
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

export function OutlinedInput(props) {
  return <Component {...props} />
}
