import React from 'react'
import styled from 'styled-components'
import Component from './Controls'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.gray['800']};
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`

export default {
  title: '@algodex/components',
  component: Component,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

const Template = (args) => <Component {...args} />

export const Controls = Template.bind({})
Controls.parameters = { layout: 'fullscreen' }
Controls.args = {
  asset: {
    id: 15322902,
    deleted: false,
    txid: 'NOFSUK4EXHFFXJK3ZA6DZMGE6CAGQ7G5JT2X7FYTYQBSQEBZHY4Q',
    timestamp: 1618666459,
    decimals: 6,
    name: 'LAMP',
    txns: 377155,
    fullName: 'Lamps',
    circulating: 99989339745,
    verified: false,
    url: null,
    total: 100000000000
  },
  borderColor: 'blue',
  border: 'dashed'
}
