import '../components/nav-item-container/nav-item-container.story'
import '../components/expanded-nav/expanded-nav.story'
import '../components/menu-button/menu-button.story'
import '../components/nav-item/nav-item.story'
import '../components/button/button.story'
import '../components/stateful-component/stateful-component.story'
import '../components/functional-component/functional-component.story'
module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials']
}
