import create from 'zustand'
import { persist } from 'zustand/middleware'
import produce from 'immer'

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

      activeWalletAddress: '',
      setActiveWalletAddress: (addr) => set({ activeWalletAddress: addr }),

      isSignedIn: false,
      setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
      signOut: () => set({ wallets: [], activeWallet: '', isSignedIn: false }),

      orderBook: {
        buyOrders: [],
        sellOrders: [],
        decimals: 6
      },
      setOrderBook: ({ buyASAOrdersInEscrow, sellASAOrdersInEscrow }, decimals) =>
        set({
          orderBook: {
            buyOrders: buyASAOrdersInEscrow,
            sellOrders: sellASAOrdersInEscrow,
            decimals
          }
        })
    })),
    {
      name: 'algodex',
      version: 2
    }
  )
)

export const useStoreMemory = create(
  immer((set) => ({
    order: {
      type: 'buy',
      price: '',
      amount: '',
      total: '0',
      execution: 'both'
    },
    setOrder: (order) => set((state) => ({ order: { ...state.order, ...order } }))
  }))
)

export default useStore

// currentAsset: {
//   id: null,
//   name: null,
//   symbol: null,
//   currentPrice: null,
//   bid: null,
//   ask: null,
//   volume24H: null,
//   dailyChange: null,
//   open: null,
//   high: null,
//   low: null,
//   close: null
// }
