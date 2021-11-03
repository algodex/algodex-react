module.exports = ['ch', 'en', 'es', 'hu', 'nl', 'se', 'tr', 'vn'].reduce(
  (prev, key) => {
    if (typeof prev.translations[key] === 'undefined') {
      prev.translations[key] = {}
    }

    prev.translations[key] = {
      assets: require(`./${key}/assets.json`),
      chart: require(`./${key}/chart.json`),
      common: require(`./${key}/common.json`),
      orders: require(`./${key}/orders.json`),
      'place-order': require(`./${key}/place-order.json`),
      wallet: require(`./${key}/wallet.json`)
    }
    return prev
  },
  {
    translations: {},
    defaultLang: 'en'
  }
)
