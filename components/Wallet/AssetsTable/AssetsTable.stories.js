import React from 'react'
import { AssetsTab as Component, default as ComponentWithData } from './WalletAssetsTable'
import styled from 'styled-components'

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
  title: 'Wallet/Wallet Assets Tab',
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
const TemplateWithData = (args) => <ComponentWithData {...args} />

export const AssetsTab = Template.bind({})
AssetsTab.args = {
  wallet: {
    address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
  }
}

export const AssetsTabPreview = TemplateWithData.bind({})
AssetsTabPreview.args = {
  wallet: {
    address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
  }
}
