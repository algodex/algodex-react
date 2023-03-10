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
          const _addrs =
            state.peraWallet === null // now there is walletConnect need to query for that as well ****
              ? state.myAlgoAddresses
              : [...state.myAlgoAddresses, state.peraWallet] // We don't want to concat peraWallet if it is null
          // arranged so myAlgoAddresses are first in address array since it triggered the event.
          return { ...state, addresses: [..._addrs] }

        case 'peraWallet':
          return { ...state, addresses: [...addresses, ...state.myAlgoAddresses] }
        // arrange it so peraWallet is first in the array since it triggered the event

        case 'walletConnect':
          return { ...state, addresses: [...addresses, ...state.myAlgoAddresses] }
        // You may need to update this since now there is peraWallet and Wallet Connect ****
      }
    // const _arr = (type === 'myAlgo && state.peraWallet !== null)' ? [...addresses, state.peraWallet] :
    // return { ...state, addresses: [...payload] }
    case 'setPeraWallet':
      localStorage.setItem('peraWallet', JSON.stringify(payload))
      return { ...state, peraWallet: payload }

    case 'setWalletConnect':
      localStorage.setItem('walletConnectWallet', JSON.stringify(payload))
      return { ...state, walletConnect: payload }

    case 'setMyAlgoAddresses':
      localStorage.setItem('myAlgoAddresses', JSON.stringify(payload))

      return { ...state, myAlgoAddresses: [...payload] }
    case 'disconnectWallet':
      const { type: walletType, address } = payload
      switch (
        walletType //Now we have three wallets we need to refavtor this too
      ) {
        case 'walletConnect':
          state.walletConnect = null
          localStorage.removeItem('walletConnectWallet')
          if (state.myAlgoAddresses.length > 0) {
            if (state?.activeWallet.type === address.type) {
              state.activeWallet = state.myAlgoAddresses[0]
            }
          } else {
            state.activeWallet = null
          }
          return { ...state }
        case 'peraWallet':
          state.peraWallet = null
          localStorage.removeItem('peraWallet')
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
          if (state.myAlgoAddresses.length >= 1) {
            const _remainingAddresses = state.myAlgoAddresses.filter((wallet) => {
              return wallet.address !== address.address
            })
            state.myAlgoAddresses = [..._remainingAddresses]
            state.activeWallet = { ..._remainingAddresses[0] }
            localStorage.setItem('myAlgoAddresses', JSON.stringify(_remainingAddresses))
            return { ...state }
          } else {
            // if there are no more algoWallets check pera
            if (state.peraWallet !== null) {
              state.activeWallet = { ...state.peraWallet }
              state.myAlgoAddresses = []
              localStorage.setItem('myAlgoAddresses', JSON.stringify([]))

              return { ...state }
            } else {
              state.activeWallet = null
              state.myAlgoAddresses = []
              localStorage.setItem('myAlgoAddresses', JSON.stringify([]))

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
