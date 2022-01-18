// SearchSidebar.stories.js
import { NavSearchSidebar as Component } from './SearchSidebar'
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
Default.args = {
  components: { NavTable: NavSearchTable }
}

export const WithSearchTable = SearchWithTableTemplate.bind({})
WithSearchTable.decorators = [
  (Story) => (
    <div>
      <Story />
    </div>
  )
]
WithSearchTable.args = {
  searchHeight: '51px',
  isActive: true,
  onAssetFocus: false,
  onAssetLeave: false,
  onAssetClick: () => console.log('Hello'),
  assets: [],
  isListingVerifiedAssets: false,
  algoPrice: 1.44,
  isFilteringByFavorites: false,
  setIsFilteringByFavorites: () => console.log('Hello')
}
