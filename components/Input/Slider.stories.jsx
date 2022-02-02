import { default as Component } from './Slider'
import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.gray['400']};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
`
export default {
  title: '@algodex/components/Input',
  component: Component,
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 10 } }
  },
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

export const SliderInput = Template.bind({})
SliderInput.args = {
  type: 'line-marks',
  value: 50,
  marks: true,
  step: 10,
  min: 10,
  max: 100
}
