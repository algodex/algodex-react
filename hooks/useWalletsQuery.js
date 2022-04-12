/**
 * Use Wallets Query
 * @param {Object} props The props of the parent
 * @param {Object} props.wallets A list of Wallet Addresses
 * @param {Object} [props.options] useQuery Options
 * @returns {object}
 */
import { useQuery } from 'react-query'
import WalletService from '@/services/wallet'

export default function useWalletsQuery({
  wallets,
  options = {
    enabled: typeof wallets !== 'undefined',
    refetchInterval: 3000
  }
}) {
  return useQuery('wallets', () => WalletService.fetchWallets(wallets), options)
}
