import create from 'zustand'

// eslint-disable-next-line
const useStore = create(() => ({
  currentAsset: {
    id: null,
    name: null,
    symbol: null,
    currentPrice: null,
    bid: null,
    ask: null,
    volume24H: null,
    dailyChange: null,
    open: null,
    high: null,
    low: null,
    close: null
  }
}))

export default useStore
