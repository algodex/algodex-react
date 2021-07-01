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

export const useStore = create(
  persist(
    immer((set) => ({
      asset: {},
      setAsset: (asset) => set({ asset }),

      wallets: [],
      setWallets: (wallets) => set({ wallets }),

      isSignedIn: false,
      setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
      signOut: () => set({ wallets: [], activeWallet: '', isSignedIn: false }),

      activeMobileTab: mobileTabs.CHART,
      setActiveMobileTab: (tab) => set({ activeMobileTab: tab }),

      chartMode: chartModes.CANDLE,
      setChartMode: (mode) => set({ chartMode: mode }),

      orderMode: orderModes.OPEN_ORDERS,
      setOrderMode: (mode) => set({ orderMode: mode }),
      activeWalletAddress: '',
      setActiveWalletAddress: (addr) => set({ activeWalletAddress: addr }),

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
        })
    })),
    {
      name: 'algodex'
    }
  )
)

export default useStore
