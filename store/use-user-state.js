import _ from 'lodash'
import { createStore } from './use-store'
const userState = (set, get) => ({
  // Controls showing of Asset Info or Chart
  showAssetInfo: false,
  setShowAssetInfo: (bool) => set({ showAssetInfo: bool }),
  /**
   * Assets should be a reduced list keyed by Asset ID
   *
   * This list is composed of a Algodex Assets Query and
   */
  assets: {},
  /**
   * Current network used.
   *
   * Network can be Testnet or Mainnet
   */
  isMainNet: _.includes(process.env.NEXT_PUBLIC_API, 'testnet') ? 1 : 2,

  setIsMainNet: (status) => {
    console.log(status, 'status')
    set({
      isMainNet: status === 1 ? true : false
    })
  },
  /**
   * Favourite should be a reduced list keyed by Asset ID and UserID
   *
   */
  favorites: {},

  setFavourite: (assetId) => {
    set({
      favorites: [assetId].reduce((previous, asset) => {
        // If asset does not exist
        if (previous[asset] === undefined) {
          previous[asset] = true
        } else {
          // Delete item if it has been added previously
          delete previous[asset]
        }

        return previous
      }, get().favorites)
    })
  },
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
