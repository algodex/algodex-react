const path = require('path')

module.exports = {
  stories: [
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links', 
    '@storybook/addon-essentials', 
    'storybook-addon-next-router', 
    { 
      name: '@storybook/addon-postcss', 
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  webpackFinal: async (config) => {
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules']
    return config
  }
}
