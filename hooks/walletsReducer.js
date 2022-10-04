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
          const _addrs = state.peraWallet === null ? addresses : [...addresses, state.peraWallet] // We don't want to concat peraWallet if it is null
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
    case 'disconnectWallet':
      const { type: walletType, address } = payload
      switch (walletType) {
        case 'peraWallet':
          state.peraWallet = null
          if (state.myAlgoAddresses.length > 0) {
            if (state?.activeWallet.type === address.type) {
              state.activeWallet = state.myAlgoAddresses[0]
            }
          } else {
            state.activeWallet = null
          }
          return { ...state }
        case 'myAlgo':
          //if triggering this event there must be atleast one item in the array
          if (state.myAlgoAddresses.length > 1) {
            const _remainingAddresses = state.myAlgoAddresses.filter((wallet) => {
              return wallet.address !== address.address
            })
            state.myAlgoAddresses = [..._remainingAddresses]
            state.activeWallet = { ..._remainingAddresses[0] }
            return { ...state }
          } else {
            // if there are no more algoWallets check pera
            if (state.peraWallet !== null) {
              state.activeWallet = { ...state.peraWallet }
              return { ...state }
            } else {
              state.activeWallet = null
              return { ...state }
            }
          }
      }
  }
}

// export  function useWalletsReducer(reducer =walletReducer){
//   const [currentState, dispatch] = useReducer(reducer, initialState)

//   return {currentState, dispatch}

// }
