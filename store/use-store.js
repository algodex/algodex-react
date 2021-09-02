import create from 'zustand'
import { persist } from 'zustand/middleware'
import produce from 'immer'

export const mobileTabs = {
  CHART: 'CHART',
  BOOK: 'BOOK',
  TRADE: 'TRADE',
  ORDERS: 'ORDERS'
}

export const chartModes = {
  CANDLE: 'CANDLE',
  AREA: 'AREA'
}

export const orderModes = {
  OPEN_ORDERS: 'OPEN_ORDERS',
  ORDER_HISTORY: 'ORDER_HISTORY',
  ASSETS: 'ASSETS'
}

const immer = (config) => (set, get, api) =>
  config(
    (partial, replace) => {
      const nextState = typeof partial === 'function' ? produce(partial) : partial
      return set(nextState, replace)
    },
    get,
    api
  )

export const useStorePersisted = create(
  persist(
    immer((set) => ({
      wallets: [],
      setWallets: (wallets) => set({ wallets }),

      activeWalletAddress: '',
      setActiveWalletAddress: (addr) => set({ activeWalletAddress: addr })
    })),
    {
      name: 'algodex',
      version: 3
    }
  )
)

export const useStore = create(
  immer((set, get) => ({
    asset: {},
    setAsset: (asset) => {
      const prevAsset = get().asset
      const isNew = prevAsset.id !== asset.id
      const orderBook = { buyOrders: [], sellOrders: [] }

      set({
        asset,
        ...(isNew ? orderBook : {}) // only reset order book if asset is new
      })
    },

    isSignedIn: false,
    setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
    signOut: () => set({ wallets: [], activeWallet: '', isSignedIn: false }),

    orderBook: {
      buyOrders: [],
      sellOrders: []
    },
    setOrderBook: ({ buyASAOrdersInEscrow, sellASAOrdersInEscrow }) =>
      set({
        orderBook: {
          buyOrders: buyASAOrdersInEscrow,
          sellOrders: sellASAOrdersInEscrow
        }
      }),

    order: {
      type: 'buy',
      price: '',
      amount: '',
      total: '0',
      execution: 'both'
    },
    setOrder: (order) => set((state) => ({ order: { ...state.order, ...order } })),

    // Controls showing of Asset Info or Chart
    showAssetInfo: false,
    setShowAssetInfo: (bool) => set({ showAssetInfo: bool}),

    // Controls Chart Time interval
    chartTimeInterval: "1h",
    setChartTimeInterval: input => set({chartTimeInterval: input}),

    activeMobileTab: mobileTabs.CHART,
    setActiveMobileTab: (tab) => set({ activeMobileTab: tab }),

  }))
)

export const getChartTimeInterval = state => state.chartTimeInterval;

export default useStore
