import React from 'react'
import {
  TradeHistoryTable as Component /*, default as ComponentWithData*/
} from './TradeHistoryTable'
import styled from 'styled-components'
import { ReactQueryDevtools } from 'react-query/devtools'

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
  title: '@algodex/recipes/Wallet/Table/Trade History Table',
  component: Component,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <Container>
        <Story />
        <ReactQueryDevtools initialIsOpen={false} />
      </Container>
    )
  ]
}

const Template = (args) => <Component {...args} />
// const TemplateWithData = (args) => <ComponentWithData {...args} />

export const TradeHistoryTable = Template.bind({})
TradeHistoryTable.args = {
  wallet: {
    address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
  }
}

// export const TradeHistoryTablePreview = TemplateWithData.bind({})
// TradeHistoryTablePreview.args = {
//   wallet: {
//     address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
//   }
// }
