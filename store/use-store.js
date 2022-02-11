import { devtools, persist } from 'zustand/middleware'

import Big from 'big.js'
import create from 'zustand'
import produce from 'immer'

export const roundValue = (value, decimalLimit) => {
  if (value === '' || value.slice(-1) === '0') {
    return value
  }

  const split = value.toString().split('.')
  const hasDecimals = split.length > 1

  if (hasDecimals && split[1].length >= decimalLimit) {
    return new Big(value).round(decimalLimit, Big.roundDown).toString()
  }

  return value
}

export const immer = (config) => (set, get, api) =>
  config(
    (partial, replace) => {
      const nextState = typeof partial === 'function' ? produce(partial) : partial
      return set(nextState, replace)
    },
    get,
    api
  )

export const createStore = ({ config, options, localstorage = false, name = 'Algodex' }) =>
  localstorage
    ? create(devtools(persist(immer(config), options), name))
    : create(devtools(immer(config), name))

export const useStorePersisted = create(
  devtools(
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
    ),
    'Wallet'
  )
)
export const useStore = create(
  devtools(
    immer((set) => ({
      // asset: {
      //   id: 15322902,
      //   name: 'LAMP',
      //   decimals: 6,
      //   price: 0,
      //   priceChange24hr: 0,
      //   isTraded: true,
      //   hasOrders: true,
      //   verified: false,
      //   info: {
      //     fullName: 'Lamps',
      //     algoExplorerUrl: 'https://algoindexer.testnet.algoexplorerapi.io/asset/15322902',
      //     supply: {
      //       circulating: '99989.339745',
      //       total: '100000.000000'
      //     }
      //   }
      // },
      // setAsset: (asset) => {
      //   const prevAsset = get().asset
      //   const isNew = prevAsset.id !== asset.id
      //   const orderBook = { buyOrders: [], sellOrders: [] }
      //
      //   set({
      //     asset,
      //     ...(isNew ? { orderBook } : {}) // only reset order book if asset is new
      //   })
      // },

      isSignedIn: false,
      setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
      signOut: () => set({ wallets: [], activeWallet: '', isSignedIn: false }),

      // orderBook: {
      //   buyOrders: [],
      //   sellOrders: []
      // },
      // setOrderBook: ({ buyASAOrdersInEscrow, sellASAOrdersInEscrow }) =>
      //   set({
      //     orderBook: {
      //       buyOrders: buyASAOrdersInEscrow,
      //       sellOrders: sellASAOrdersInEscrow
      //     }
      //   }),

      buyOrders: [],
      setBuyOrders: (buyOrders) => {
        console.log(buyOrders, 'buyorders here')
        set({
          buyOrders
        })
      },

      sellOrders: [],
      setSellOrders: (sellOrders) => {
        console.log(sellOrders, 'sellorders here')
        set({
          sellOrders
        })
      },

      order: {
        type: 'buy',
        price: '',
        amount: '',
        total: '0',
        execution: 'both'
      },
      setOrder: (order, asset) =>
        set((state) => {
          // Always Round order price, amount, and recalculate total
          const priceChanged = order.price !== state.order.price
          const amountChanged = order.amount !== state.order.amount
          const price = typeof order.price === 'undefined' ? state.order.price : order.price
          const amount = typeof order.amount === 'undefined' ? state.order.amount : order.amount
          order.price = priceChanged ? roundValue(price, 6) : state.order.price
          order.amount = amountChanged ? roundValue(amount, asset.decimals) : state.order.amount
          order.total =
            priceChanged || amountChanged
              ? new Big(order.price || 0)
                  .times(new Big(order.amount || 0))
                  .round(6)
                  .toString()
              : state.order.total

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
      setChartMode: (input) => set({ chartMode: input })
    })),
    'Original'
  )
)

export const getChartTimeInterval = (state) => state.chartTimeInterval

export default useStore
