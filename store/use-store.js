import create from 'zustand'

// eslint-disable-next-line
const useStore = create((set) => ({
  asset: {
    id: 15322902,
    name: 'LAMP',
    decimals: 6
  },
  setAsset: (asset) => set({ asset }),

  wallets: [],
  setWallets: (wallets) =>
    set({ wallets, activeWalletAddress: wallets[0].address, isSignedIn: true }),

  activeWalletAddress: '',
  setActiveWalletAddress: (addr) => set({ activeWalletAddress: addr }),

  isSignedIn: false,
  signOut: () => set({ wallets: [], activeWallet: '', isSignedIn: false })
}))

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
