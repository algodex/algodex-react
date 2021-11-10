import { createStore } from './use-store'

const assetsSearch = (set, get) => ({
  getCount: () => Object.keys(get().assets).length,
  assets: {},
  setAssets: (assets) =>
    set({
      assets: {
        ...get().assets,
        ...assets
      }
    })
})

const options = {
  name: 'assets',
  version: 3
}

const localstorage = true

export default createStore({ config: assetsSearch, options, localstorage })
