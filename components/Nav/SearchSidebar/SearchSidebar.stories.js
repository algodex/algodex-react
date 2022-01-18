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
    <Component />
    <NavSearchTable />
  </div>
)

const Template = (args) => <Component {...args} />

export const Default = Template.bind({})

export const WithSearchTable = SearchWithTableTemplate.bind({})

Default.args = {
  assetPrice: 100,
  components: { NavTable: NavSearchTable }
}
