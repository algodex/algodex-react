import create from 'zustand'
import { persist } from 'zustand/middleware'
import produce from 'immer'
import defaultLang from 'lang/en.js'
import Big from 'big.js'


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
        ...(isNew ? { orderBook } : {}) // only reset order book if asset is new
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
    setOrder: (order) =>
      set((state) => { 
        // Always Round order price, amount, and recalculate total
        const priceChanged = order.price !== state.order.price;
        const amountChanged = order.amount !== state.order.amount;
        const price = typeof order.price === 'undefined' ? state.order.price : order.price
        const amount = typeof order.amount === "undefined" ? state.order.amount : order.amount
        order.price = priceChanged ? new Big(price || 0).round(6).toString() : state.order.price;
        order.amount = amountChanged ? new Big(amount || 0).round(state.asset.decimals, Big.roundDown).toString() : state.order.amount;
        order.total = priceChanged || amountChanged ? new Big(order.price).times(new Big(order.amount)).round(6).toString() : state.order.total;

        return {
          order: {
            ...state.order,
            ...order
          }
        }
      }),
      
    // Controls showing of Asset Info or Chart
    showAssetInfo: false,
    setShowAssetInfo: (bool) => set({ showAssetInfo: bool }),

    // Controls Chart Time interval
    chartTimeInterval: '1h',
    setChartTimeInterval: (input) => set({ chartTimeInterval: input }),

    // Controls Chart Mode
    chartMode: 'candle',
    setChartMode: (input) => set({ chartMode: input }),

    // Language Object
    lang: defaultLang,
    setLang: (lang) => set({ lang })
  }))
)

export const getChartTimeInterval = (state) => state.chartTimeInterval

export default useStore
