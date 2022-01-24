const path = require('path');

module.exports = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-addon-next-router', {
    name: '@storybook/addon-postcss',
    options: {
      postcssLoaderOptions: {
        implementation: require('postcss')
      }
    }
  }],
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/components": path.resolve(__dirname, "../components"),
      "@/hooks": path.resolve(__dirname, "../hooks"),
      "@/store": path.resolve(__dirname, "../store")
    };
    config.resolve.modules = [
        path.resolve(__dirname, '..'), 'node_modules',
    ];
    config.resolve.fallback={http: false, crypto: false, path: false}
    return config;
  },
  core: {
    builder: "webpack5"
  }
};
