import algodex from '@algodex/algodex-sdk'
import { convertFromBaseUnits } from './convert'
import { getAlgodexEnvironment } from './environment'
import { truncateAddress } from './display'

const WalletService = {
  getMinWalletBalance: async (accountInfo) => {
    return await algodex.getMinWalletBalance(accountInfo)
  },

  fetchWallets: async (addresses) => {
    if (addresses.length === 0) {
      return {}
    }

    const algodex_environment = getAlgodexEnvironment()
    algodex.initIndexer(algodex_environment)
    const getEmptyAccountInfo = (address) => {
      return {
                "address":address,
                "amount":0,"amount-without-pending-rewards":0,"apps-local-state":[],
                "apps-total-schema":{"num-byte-slice":0,"num-uint":0},"assets":[],
                "created-apps":[],"created-assets":[],"pending-rewards":0,
                "reward-base":0,"rewards":0,"round":-1,"status":"Offline"
            }
    }

    const promises = addresses.map(async (address) => {
      try {
        const accountInfo = await algodex.getAccountInfo(address)
        if (accountInfo) {
          return WalletService.setWalletData(accountInfo)
        } else {
          const emptyAccountInfo = getEmptyAccountInfo(address)
          return WalletService.setWalletData(emptyAccountInfo)
        }
      } catch (e) {
        const emptyAccountInfo = getEmptyAccountInfo(address)
        return WalletService.setWalletData(emptyAccountInfo)
      }
    })

    const wallets = await Promise.all(promises)

    return {
      wallets
    }

  },

  setWalletData: (accountInfo) => {
    if (accountInfo.assets === undefined) {
      accountInfo.assets = []
    }
    return {
      address: accountInfo.address,
      name: truncateAddress(accountInfo.address),
      balance: convertFromBaseUnits(accountInfo.amount),
      assets: accountInfo.assets.reduce(
        (result, asset) => ({
          ...result,
          [asset['asset-id']]: {
            balance: convertFromBaseUnits(asset.amount)
          }
        }),
        {}
      )
    }
  }
}

export default WalletService
