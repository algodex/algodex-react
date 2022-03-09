import { NavSearchTable as Component } from './SearchTable'
// SearchTable.stories.js
import styled from '@emotion/styled'
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.palette.gray['800']};
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`
export default {
  title: '@algodex/recipes/Nav/Table/Search Table',
  component: Component,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    algoPrice: { control: { type: 'range', min: 1, max: 10 } }
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

const Template = (args) => <Component {...args} />
// const TemplateWithData = (args) => <ComponentWithData {...args} />
/**
 * @todo Refactor SearchTable to render properly in a `flex` and `block` display
 * @type {any}
 */
export const SearchTable = Template.bind({})
SearchTable.args = {
  onAssetFocus: false,
  onAssetLeave: false,
  onAssetClick: () => console.log('Hello'),
  assets: [
    {
      change: '22.22',
      fullName: 'Lamps',
      hasBeenOrdered: true,
      id: 15322902,
      liquidityAlgo: '274056.448261',
      liquidityAsa: '28.217400',
      name: 'LAMP',
      price: '2200.0000',
      verified: false
    }
  ],
  isListingVerifiedAssets: false,
  algoPrice: 1.44,
  isFilteringByFavorites: false,
  setIsFilteringByFavorites: () => console.log('Hello')
}

// export const LiveTable = TemplateWithData.bind({})
// LiveTable.args = {
//   query: '',
//   onAssetFocus: false,
//   onAssetLeave: false,
//   onAssetClick: () => console.log('Hello'),
//   isListingVerifiedAssets: false,
//   algoPrice: 1.44,
//   isFilteringByFavorites: false,
//   setIsFilteringByFavorites: () => console.log('Hello')
// }
