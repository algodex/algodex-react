import React from 'react'
import { AssetsTable as Component /*, default as ComponentWithData*/ } from './AssetsTable'
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
  title: '@algodex/recipes/Wallet/Table/Assets Table',
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

export const AssetsTable = Template.bind({})
AssetsTable.args = {
  wallet: {
    address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
  }
}

// export const AssetsTablePreview = TemplateWithData.bind({})
// AssetsTablePreview.args = {
//   wallet: {
//     address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
//   }
// }
