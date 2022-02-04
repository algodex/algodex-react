const path = require('path');
const fs = require('fs');

function getPackageDir(filepath) {
  let currDir = path.dirname(require.resolve(filepath));
  while (true) {
    if (fs.existsSync(path.join(currDir, "package.json"))) {
      return currDir;
    }
    const { dir, root } = path.parse(currDir);
    if (dir === root) {
      throw new Error(
          `Could not find package.json in the parent directories starting from ${filepath}.`
      );
    }
    currDir = dir;
  }
}
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
      "@/store": path.resolve(__dirname, "../store"),
      "@/services": path.resolve(__dirname, "../services"),
      "@/utils": path.resolve(__dirname, "../utils"),
      "@emotion/core": getPackageDir("@emotion/react"),
      "@emotion/styled": getPackageDir("@emotion/styled"),
      "emotion-theming": getPackageDir("@emotion/react")
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
