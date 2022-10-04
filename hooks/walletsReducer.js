import { useAlgodex } from '@algodex/algodex-hooks'

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
      // const { setWallet } = useAlgodex()
      // useAlgodex.setWallet(payload)
      // setWallet(payload)
      if (!state.signedIn) state.signedIn = true

      return { ...state, activeWallet: payload }
    case 'setAddresses':
      // if (state.activeWallet === null) {
      //   state.activeWallet = payload[0]
      //   state.signedIn = true
      // }
      return { ...state, addresses: [...payload] }
  }
}

// export  function useWalletsReducer(reducer =walletReducer){
//   const [currentState, dispatch] = useReducer(reducer, initialState)

//   return {currentState, dispatch}

// }