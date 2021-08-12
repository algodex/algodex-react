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
  immer((set) => ({
    asset: {},
    setAsset: (asset) => set({ asset }),

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
      }),

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
