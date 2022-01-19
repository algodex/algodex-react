// SearchSidebar.stories.js
import { NavSearchSidebar as Component, default as ComponentWithData } from './SearchSidebar'
import { NavSearchTable as Table, default as LiveTable } from './SearchTable'
import styled from 'styled-components'

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
  title: 'Nav/Search',
  component: Component,
  parameters: {
    layout: 'fullscreen'
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
const TemplateWithData = (args) => <ComponentWithData {...args} />
/**
 * @TODO: Refactor Sidebar to accept a <Table/>
 * @type {any}
 */
export const Sidebar = Template.bind({})
Sidebar.args = {
  components: { NavTable: Table },
  query: '',
  tableProps: {
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
    ]
  }
}
export const LiveSidebar = TemplateWithData.bind({})

LiveSidebar.args = {
  components: { NavTable: LiveTable },
  searchHeight: '51px',
  isActive: true,
  // onAssetFocus: false,
  // onAssetLeave: false,
  // onAssetClick: () => console.log('Hello'),
  isListingVerifiedAssets: false,
  algoPrice: 1.44,
  isFilteringByFavorites: false,
  setIsFilteringByFavorites: () => console.log('Hello')
}
// export const WithSearchTable = SearchWithTableTemplate.bind({})
// WithSearchTable.decorators = [
//   (Story) => (
//     <div>
//       <Story />
//     </div>
//   )
// ]
// WithSearchTable.args = {
//   searchHeight: '51px',
//   isActive: true,
//   onAssetFocus: false,
//   onAssetLeave: false,
//   onAssetClick: () => console.log('Hello'),
//   assets: [],
//   isListingVerifiedAssets: false,
//   algoPrice: 1.44,
//   isFilteringByFavorites: false,
//   setIsFilteringByFavorites: () => console.log('Hello')
// }
