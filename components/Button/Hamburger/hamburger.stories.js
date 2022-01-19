import React from 'react'
import styled from 'styled-components'
import Hamburger from '.'

const Container = styled.div`
  display: flex;
  flex: 1 1 0%;
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0;
`

export default {
  title: '@algodex/components/Button/Hamburger',
  component: Hamburger,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

const Template = (args) => <Hamburger {...args} />

export const Default = Template.bind({})
Default.args = {
  isOpen: false
}