import { createStore } from './use-store'
import _ from 'lodash'
const userState = (set, get) => ({
  /**
   * Assets should be a reduced list keyed by Asset ID
   *
   * This list is composed of a Algodex Assets Query and
   */
  assets: {},
  /**
   * Add Assets
   *
   * Bulk update the Assets Store
   * @param assets
   */
  addAssets: (assets) => {
    set({
      assets: assets.reduce((previous, asset) => {
        // Add New Asset
        if (typeof previous[asset.id] === 'undefined') {
          previous[asset.id] = asset
        }
        // Merge Asset
        else {
          previous[asset.id] = {
            ...previous[asset.id],
            ...asset
          }
        }
        return previous
      }, get().assets)
    })
  },
  /**
   * Adds an Asset
   *
   * Adds an asset to local storage
   * @param asset
   */
  addAsset: (asset) => {
    let assets = get().assets
    if (typeof asset.id !== 'undefined') {
      // Add New Asset
      if (typeof assets[asset.id] === 'undefined') {
        assets[asset.id] = asset
      }
      // Merge Asset
      else {
        assets[asset.id] = {
          ...assets[asset.id],
          ...asset
        }
      }
      set({ assets })
    }
  },
  /**
   * Last Known Search Query
   */
  query: '',
  /**
   * Set the Last Known Query
   * @param query
   */
  setQuery: (query) => {
    set({ query })
  },
  /**
   * SearchTable State
   */
  search: {
    sortBy: [
      // {
      //   id: 'price',
      //   desc: true
      // }
    ]
  },
  /**
   * Set SearchTable State
   * @param search
   */
  setSearch: (search) =>
    set({
      search: {
        ...get().search,
        ...search
      }
    }),
  /**
   * Wallet Accounts[Work in Progress]
   */
  accounts: {},
  /**
   * Set Accounts [Work in Progress]
   * @param accounts
   */
  setAccounts: (accounts) =>
    set({
      accounts: _.merge(get().accounts, accounts)
    })
})

const options = {
  name: 'user',
  version: 3
}

const localstorage = true

export default createStore({ config: userState, options, localstorage })
