import React from 'react'
import styled from '@emotion/styled'
import { default as Component } from '.'

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[900]};
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
`

export default {
  title: '@algodex/components/Button/Hamburger',
  component: Component,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

const Template = (args) => <Component {...args} />

export const Hamburger = Template.bind({})
Hamburger.args = {
  isOpen: false
}
