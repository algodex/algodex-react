// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack')

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {}

  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify')
  })
  config.resolve.fallback = fallback
  // ignore warning about source map of perawallet/connect

  config.ignoreWarnings = [/Failed to parse source map/]
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ])
  return config
}
