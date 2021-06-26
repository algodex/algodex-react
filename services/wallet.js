import { convertAmount } from './convert'
import { truncateAddress } from './display'

const WalletService = {
  setWalletData: (accountInfo) => {
    return {
      address: accountInfo.address,
      name: truncateAddress(accountInfo.address),
      balance: convertAmount(accountInfo.amount),
      assets: accountInfo.assets.reduce(
        (result, asset) => ({
          ...result,
          [asset['asset-id']]: {
            balance: convertAmount(asset.amount)
          }
        }),
        {}
      )
    }
  }
}

export default WalletService
