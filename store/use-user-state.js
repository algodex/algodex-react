import _ from 'lodash'
import { createStore } from './use-store'
import { getActiveNetwork } from '../services/environment'

const userState = (set, get) => ({
  /**
   * Order Aggregation in Orderbook
   *
   * @cachedSelectedPrecision All Aggregation options selected by a user
   * for an asset
   */
  cachedSelectedPrecision: {},
  setCachedSelectedPrecision: (cachedSelectedPrecision) => set({ cachedSelectedPrecision }),

  // Controls showing of Asset Info or Chart
  showAssetInfo: false,
  setShowAssetInfo: (bool) => set({ showAssetInfo: bool }),
  /**
   * Assets should be a reduced list keyed by Asset ID
   *
   * This list is composed of a Algodex Assets Query and
   */
  assets: {},

  activeNetwork: getActiveNetwork(),
  setActiveNetwork: (network) => {
    set({ activeNetwork: network })
  },

  /**
   * Ribbon notification for Mainnet
   *
   * @true when Mainnet notification ribbon is visible
   * @false when Mainnet notification ribbon is hidden
   */
  hasMainnetRibbon: null,
  setHasMainnetRibbon: (bool) => {
    const check = get().hasMainnetRibbon
    if (bool !== check) {
      set({ hasMainnetRibbon: bool })
    }
  },

  /**
   * Ribbon notification for Testnet
   *
   * @true when Testnet notification ribbon is visible
   * @false when Testnet notification ribbon is hidden
   */
  hasTestnetRibbon: null,
  setHasTestnetRibbon: (bool) => set({ hasTestnetRibbon: bool }),

  /**
   * Modal notification for Mainnet.
   *
   * @true when Mainnet notification modal is visible
   * @false when Mainnet notification modal is hidden
   */
  hasMainnetNotificationModal: null,
  setHasMainnetNotificationModal: (bool) => set({ hasMainnetNotificationModal: bool }),

  /**
   * Modal notification for Testnet.
   *
   * @true when Testnet notification modal is visible
   * @false when Testnet notification modal is hidden
   */
  hasTestnetNotificationModal: null,
  setHasTestnetNotificationModal: (bool) => set({ hasTestnetNotificationModal: bool }),

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
   * Wallet OrderHistory State
   */
  walletOrderHistoryTableState: {
    sortBy: []
  },
  /**
   * Set Wallet OrderHistory Table State
   * @param walletOrderHistoryTableState
   */
  setWalletOrderHistoryTableState: (walletOrderHistoryTableState) =>
    set({
      walletOrderHistoryTableState: {
        ...get().walletOrderHistoryTableState,
        ...walletOrderHistoryTableState
      }
    }),
  /**
   * Wallet OpenOrders Table State
   */
  walletOpenOrdersTableState: {
    sortBy: []
  },
  /**
   * Set Wallet OpenOrders Table State
   * @param walletOpenOrdersTableState
   */
  setWalletOpenOrdersTableState: (walletOpenOrdersTableState) =>
    set({
      walletOpenOrdersTableState: {
        ...get().walletOpenOrdersTableState,
        ...walletOpenOrdersTableState
      }
    }),
  /**
   * Wallet Assets Table State
   */
  walletAssetsTableState: {
    sortBy: []
  },
  /**
   * Set Wallet Assets Table State
   * @param walletAssetsTableState
   */
  setWalletAssetsTableState: (walletAssetsTableState) =>
    set({
      walletAssetsTableState: {
        ...get().walletAssetsTableState,
        ...walletAssetsTableState
      }
    }),

  /**
   * New Orders Size Filter
   */
  newOrderSizeFilter: 0,
  /**
   * Set Order Size Filter
   * @param newOrderSizeFilter
   */
  setNewOrderSizeFilter: (newOrderSizeFilter) =>
    set({
      newOrderSizeFilter
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
