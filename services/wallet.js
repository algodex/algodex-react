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

    try {
      const algodex_environment = getAlgodexEnvironment()
      const AlgodClient = new algodex.initAlgodClient(algodex_environment)

      const promises = addresses.map(async (address) => {
        const accountInfo = await AlgodClient.accountInformation(address).do()

        return WalletService.setWalletData(accountInfo)
      })

      const wallets = await Promise.all(promises)

      return {
        wallets
      }
    } catch (e) {
      console.error(e)
    }
  },

  setWalletData: (accountInfo) => {
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
