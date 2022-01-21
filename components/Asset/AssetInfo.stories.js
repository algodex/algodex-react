import React from 'react'
import { AssetInfo as Component, default as ComponentWithData } from './Asset'

export default {
  title: '@algodex/Asset/AssetInfo',
  component: Component,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Story />
      </div>
    )
  ]
}

const Template = (args) => <Component {...args} />
const TemplateWithData = (args) => <ComponentWithData {...args} />

const asset = {
  circulating: 99989322377,
  decimals: 6,
  deleted: false,
  fullName: 'Lamps',
  id: 15322902,
  name: 'LAMP',
  timestamp: 1618666459,
  total: 100000000000,
  txid: 'NOFSUK4EXHFFXJK3ZA6DZMGE6CAGQ7G5JT2X7FYTYQBSQEBZHY4Q',
  txns: 550235,
  url: null,
  verified: false
}

const price = {
  id: 15322902,
  isTraded: true,
  price: 1810,
  price24Change: -21.475054229934923,
  priceBefore: 2305,
  unix_time: 1642616539
}

export const AssetInfo = Template.bind({})
AssetInfo.args = {
  asset,
  price
}

export const AssetInfoPreview = TemplateWithData.bind({})
AssetInfoPreview.args = {
  asset,
  price
}
