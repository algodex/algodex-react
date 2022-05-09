import { default as Component } from '.'
import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  background: ${({ theme }) => theme.palette.gray['700']};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
export default {
  title: '@algodex/recipes/Nav',
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

const Header = Template.bind({})

Header.args = {
  variant: 'large',
  fontSize: 2
}

// export Header
