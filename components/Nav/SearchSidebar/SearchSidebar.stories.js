// SearchSidebar.stories.js
import { NavSearchSidebar as Component } from './SearchSidebar'
import { NavSearchTable } from './SearchTable'

export default {
  title: 'Nav/SearchSidebar',
  component: Component
}

const Template = (args) => <Component {...args} />

export const Default = Template.bind({})

Default.args = {
  assetPrice: 100
  // components: { NavTable: NavSearchTable }
}
