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

      updateBalances: (addr, algo, id, asa) =>
        set((state) => {
          const i = state.wallets.findIndex((w) => w.address === addr)
          state.wallets[i].balance = algo
          state.wallets[i].assets[id].balance = asa
        }),

      activeWalletAddress: '',
      setActiveWalletAddress: (addr) => set({ activeWalletAddress: addr }),

      isSignedIn: false,
      setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
      signOut: () => set({ wallets: [], activeWallet: '', isSignedIn: false })
    })),
    {
      name: 'algodex-wallets'
    }
  )
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
