import Page from './Page'
import React from 'react'
import Chart from './chart'
import AssetInfo from './asset-info'
export default {
  title: 'Page',
  component: Page,
  decorators: [(Story) => <Story />]
}

const TradePageTemplate = (args) => <Page {...args}>{({ asset }) => <Chart asset={asset} />}</Page>
const AssetPageTemplate = (args) => (
  <Page {...args}>{({ asset }) => <AssetInfo explorerAsset={asset} />}</Page>
)
const asset = {
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
}

export const Default = TradePageTemplate.bind({})
Default.args = {
  staticExplorerAsset: asset
}

export const AssetPage = AssetPageTemplate.bind({})

AssetPage.args = {
  staticExplorerAsset: asset
}
