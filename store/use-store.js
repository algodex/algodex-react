import create from 'zustand'

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

// eslint-disable-next-line
const useStore = create((set) => ({
  asset: {},
  setAsset: (asset) => set({ asset }),

  wallets: [],
  setWallets: (wallets) =>
    set({ wallets, activeWalletAddress: wallets[0].address, isSignedIn: true }),

  activeWalletAddress: '',
  setActiveWalletAddress: (addr) => set({ activeWalletAddress: addr }),

  isSignedIn: false,
  signOut: () => set({ wallets: [], activeWallet: '', isSignedIn: false }),

  activeMobileTab: mobileTabs.CHART,
  setActiveMobileTab: (tab) => set({ activeMobileTab: tab }),

  chartMode: chartModes.CANDLE,
  setChartMode: (mode) => set({ chartMode: mode }),

  orderMode: orderModes.OPEN_ORDERS,
  setOrderMode: (mode) => set({ orderMode: mode })
}))

export default useStore
