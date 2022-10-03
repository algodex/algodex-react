import { createContext, useReducer } from 'react'
import { walletReducer, initialState } from './walletsReducer'

export const WalletReducerContext = createContext()

export function mergeAddresses(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new TypeError('Must be an array of addresses!')
  }
  const map = new Map()
  a.forEach((wallet) => map.set(wallet.address, wallet))
  b.forEach((wallet) => map.set(wallet.address, { ...map.get(wallet.address), ...wallet }))
  return Array.from(map.values())
}

export const WalletsReducerProvider = ({ children }) => {
  const [walletState, dispatch] = useReducer(walletReducer, initialState)

  const value = {
    addressesNew: walletState.addresses,
    signedIn: walletState.signedIn,
    activeWallet: walletState.activeWallet,
    setActiveWallet: (address) => {
      dispatch({ action: 'setActiveWallet', payload: address })
    },
    setAddressesNew: (addresses) => {
      dispatch({ action: 'setAddresses', payload: addresses })
    },
    signIn: () => {
      dispatch({ action: 'signIn' })
    }

    // removeTodoItem: (todoItemId) => {
    //   dispatch({ type: actions.REMOVE_TODO_ITEM, todoItemId })
    // },
    // markAsCompleted: (todoItemId) => {
    //   dispatch({ type: actions.TOGGLE_COMPLETED, todoItemId })
    // }
  }

  return <WalletReducerContext.Provider value={value}>{children}</WalletReducerContext.Provider>
}
