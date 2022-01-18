// SearchSidebar.stories.js
import { NavSearchSidebar as Component } from './SearchSidebar'
// import NavSearchTable from './SearchTable'
import NavSearchTable from './SearchTable'

export default {
  title: 'Nav/SearchSidebar',
  component: Component
}

const SearchWithTableTemplate = ({ ...args }) => (
  <div>
    <Component {...args} />
    <NavSearchTable />
  </div>
)

const Template = (args) => <Component {...args} />

export const Default = Template.bind({})

export const WithSearchTable = SearchWithTableTemplate.bind({})

WithSearchTable.args = {
  searchHeight: '51px',
  isActive: true,
  onAssetFocus: false,
  onAssetLeave: false,
  onAssetClick: () => console.log('Hello'),
  assets: [],
  isListingVerifiedAssets: false,
  algoPrice: '1.44',
  isFilteringByFavorites: false,
  setIsFilteringByFavorites: () => console.log('Hello')
}

Default.args = {
  assetPrice: 100,
  components: { NavTable: NavSearchTable }
}
