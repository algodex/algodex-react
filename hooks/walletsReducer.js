export const initialState = {
  addresses: [],
  activeWallet: null,
  signedIn: false,
  peraWallet: null,
  deflyWallet: null,
  walletConnect: null,
  myAlgoAddresses: []
}
export function walletReducer(state, { action, payload }) {
  switch (action) {
    case 'setActiveWallet':
      if (!state.signedIn) state.signedIn = true
      return { ...state, activeWallet: payload }
    case 'setAddresses':
      const { type, addresses } = payload
      const _addresses = []
      switch (type) {
        case 'myAlgo':
          _addresses.push(...state.myAlgoAddresses)
          if (state.peraWallet) _addresses.push(state.peraWallet)
          if (state.deflyWallet) _addresses.push(state.deflyWallet)
          if (state.walletConnect) _addresses.push(state.walletConnect)

          return { ...state, addresses: [..._addresses] }

        case 'peraWallet':
          // return { ...state, addresses: [...addresses, ...state.myAlgoAddresses] }
          // return { ...state, addresses: [...state.addresses, ...addresses] }
          // const _addresses = []
          // arrange it so peraWallet is first in the array since it triggered the event
          if (state.peraWallet) _addresses.push(state.peraWallet)
          if (state.deflyWallet) _addresses.push(state.deflyWallet)
          _addresses.push(...state.myAlgoAddresses)
          if (state.walletConnect) _addresses.push(state.walletConnect)

          return { ...state, addresses: [..._addresses] }
        case 'deflyWallet':
          if (state.deflyWallet) _addresses.push(state.deflyWallet)
          _addresses.push(...state.myAlgoAddresses)
          if (state.peraWallet) _addresses.push(state.peraWallet)
          if (state.walletConnect) _addresses.push(state.walletConnect)

          return { ...state, addresses: [..._addresses] }
        case 'walletConnect':
          if (state.walletConnect) _addresses.push(state.walletConnect)
          _addresses.push(...state.myAlgoAddresses)
          if (state.peraWallet) _addresses.push(state.peraWallet)
          if (state.deflyWallet) _addresses.push(state.deflyWallet)
          return { ...state, addresses: [..._addresses] }

        // return { ...state, addresses: [...state.addresses, ...addresses] }
        // You may need to update this since now there is peraWallet and Wallet Connect ****
      }
    // const _arr = (type === 'myAlgo && state.peraWallet !== null)' ? [...addresses, state.peraWallet] :
    // return { ...state, addresses: [...payload] }
    case 'setPeraWallet':
      localStorage.setItem('peraWallet', JSON.stringify(payload))
      return { ...state, peraWallet: payload }
    case 'setDeflyWallet':
      localStorage.setItem('deflyWallet', JSON.stringify(payload))
      return { ...state, deflyWallet: payload }
    case 'setWalletConnect':
      localStorage.setItem('walletConnectWallet', JSON.stringify(payload))
      return { ...state, walletConnect: payload }

    case 'setMyAlgoAddresses':
      localStorage.setItem('myAlgoAddresses', JSON.stringify(payload))

      return { ...state, myAlgoAddresses: [...payload] }
    case 'disconnectWallet':
      const { type: walletType, address } = payload

      if (state.addresses.map((_address) => _address.address).includes(address.address) === false)
        return state

      const _remainingAddresses = state.addresses.filter((wallet) => {
        return wallet.address !== address.address
      })

      const _state = { ...state }

      switch (
        walletType //Now we have three wallets we need to refavtor this too
      ) {
        case 'walletConnect':
          _state.walletConnect = null
          localStorage.removeItem('walletConnectWallet')

        case 'deflyWallet':
          _state.deflyWallet = null
          localStorage.removeItem('deflyWallet')
        case 'peraWallet':
          _state.peraWallet = null
          localStorage.removeItem('peraWallet')
        case 'myAlgo':
          const _remainingAlgoAddresses = state.myAlgoAddresses.filter((wallet) => {
            return wallet.address !== address.address
          })

          _state.myAlgoAddresses = [..._remainingAlgoAddresses]
          localStorage.setItem('myAlgoAddresses', JSON.stringify(_remainingAlgoAddresses))
      }
      // state.addresses = [..._remainingAddresses]

      _state.activeWallet = _remainingAddresses.length > 0 ? { ..._remainingAddresses[0] } : null

      return {
        ...state,
        ..._state
      }
  }
}

// export  function useWalletsReducer(reducer =walletReducer){
//   const [currentState, dispatch] = useReducer(reducer, initialState)

//   return {currentState, dispatch}

// }
