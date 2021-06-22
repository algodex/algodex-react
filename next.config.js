const { parsed: myEnv } = require('dotenv').config({
  path: './.env'
})

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
    return config
  }
}
