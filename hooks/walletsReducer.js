export const initialState = {
  addresses: [],
  activeWallet: null,
  signedIn: false,
  peraWallet: null,
  myAlgoAddresses: []
}
export function walletReducer(state, { action, payload }) {
  switch (action) {
    case 'setActiveWallet':
      if (!state.signedIn) state.signedIn = true
      return { ...state, activeWallet: payload }
    case 'setAddresses':
      const { type, addresses } = payload
      switch (type) {
        case 'myAlgo':
          const _addrs = state.peraWallet === null ? addresses : [...addresses, peraWallet] // We don't want to concat peraWallet if it is null
          // arranged so myAlgoAddresses are first in address array since it triggered the event.
          return { ...state, addresses: [..._addrs] }

        case 'peraWallet':
          return { ...state, addresses: [...addresses, ...state.myAlgoAddresses] }
        // arrange it so peraWallet is first in the array since it triggered the event
      }
    // const _arr = (type === 'myAlgo && state.peraWallet !== null)' ? [...addresses, state.peraWallet] :
    // return { ...state, addresses: [...payload] }
    case 'setPeraWallet':
      return { ...state, peraWallet: payload }
    case 'setMyAlgoAddresses':
      return { ...state, myAlgoAddresses: [...payload] }
  }
}

// export  function useWalletsReducer(reducer =walletReducer){
//   const [currentState, dispatch] = useReducer(reducer, initialState)

//   return {currentState, dispatch}

// }
