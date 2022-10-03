export const initialState = {
  addresses: [],
  activeWallet: null,
  signedIn: false
}
export function walletReducer(state, { action, payload }) {
  switch (action) {
    case 'getActiveWallet':
      return activeWallet
    case 'setActiveWallet':
      return { ...state, activeWallet: payload }
    case 'setAddresses':
      if (state.activeWallet === null) {
        state.activeWallet = payload[0]
        state.signedIn = true
      }
      return { ...state, addresses: [...payload] }
  }
}

// export  function useWalletsReducer(reducer =walletReducer){
//   const [currentState, dispatch] = useReducer(reducer, initialState)

//   return {currentState, dispatch}

// }
