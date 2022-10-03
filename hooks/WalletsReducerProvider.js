import { createContext, useReducer } from 'react'
import { walletReducer, initialState } from './walletsReducer'

export const WalletReducerContext = createContext()

export const WalletsReducerProvider = ({ children }) => {
  const [walletState, dispatch] = useReducer(walletReducer, initialState)

  const value = {
    addressesNew: walletState.addresses,
    signedIn: walletState.signedIn,
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
