import { useQuery } from 'react-query'
import {
  searchAssets,
  fetchAssetPrice,
  fetchAssetChart,
  fetchAssetOrders,
  fetchAssetTradeHistory,
  fetchWalletAssets,
  fetchWalletOrders,
  fetchWalletTradeHistory
} from 'services/algodex'
import WalletService from 'services/wallet'

const refetchInterval = 3000

/**
 * Use Search Results Query
 * @param {Object} props The props of the parent
 * @param {string} props.query Search Query
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<{assets: *}, unknown>}
 */
export const useSearchResultsQuery = ({
  query = '',
  options = {
    refetchInterval: query === '' ? refetchInterval : 20000
  }
} = {}) => useQuery(['searchResults', { query }], () => searchAssets(query), options)

/**
 * Use Asset Price Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @todo: Consolidate with Search
 * @returns {UseQueryResult<*, unknown>}
 */
export const useAssetPriceQuery = ({
  asset: { id },
  options = {
    refetchInterval,
    enabled: typeof id !== 'undefined'
  }
} = {}) => useQuery(['assetPrice', { id }], () => fetchAssetPrice(id), options)

/**
 * Use Asset Chart Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {string} props.chartInterval Interval to aggregate chart by
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<Object, unknown>}
 */
export const useAssetChartQuery = ({
  chartInterval,
  asset: { id },
  options = {
    refetchInterval,
    enabled: typeof id !== 'undefined'
  }
}) => useQuery(['assetChart', { id }], () => fetchAssetChart(id, chartInterval), options)

/**
 * Use Asset Orders Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<Object, unknown>}
 */
export const useAssetOrdersQuery = ({
  asset: { id },
  options = {
    refetchInterval,
    enabled: typeof id !== 'undefined'
  }
}) => useQuery(['assetOrders', { id }], () => fetchAssetOrders(id), options)

/**
 * Use Asset Trade History Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<Object, unknown>}
 */
export const useAssetTradeHistoryQuery = ({
  asset: { id },
  options = {
    enabled: typeof id !== 'undefined',
    refetchInterval: 5000,
    staleTime: 3000
  }
}) => useQuery(['assetTradeHistory', { id }], () => fetchAssetTradeHistory(id), options)

/**
 * Use Wallet Assets Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @todo: Fetch Wallet Assets from on-chain
 * @returns {UseQueryResult<T, unknown>}
 */
export const useWalletAssetsQuery = ({
  wallet: { address },
  options = {
    enabled: typeof address !== 'undefined',
    refetchInterval
  }
}) => useQuery(['walletAssets', { address }], () => fetchWalletAssets(address), options)

/**
 * Use Wallet Orders Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<Object, unknown>}
 */
export const useWalletOrdersQuery = ({
  wallet: { address },
  options = { enabled: typeof address !== 'undefined', refetchInterval }
}) => useQuery(['walletOrders', { address }], () => fetchWalletOrders(address), options)

/**
 * Use Wallet Trade History
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<Object, unknown>}
 */
export const useWalletTradeHistory = ({
  wallet: { address },
  options = {
    enabled: typeof address !== 'undefined',
    refetchInterval
  }
}) => useQuery(['walletTradeHistory', { address }], () => fetchWalletTradeHistory(address), options)

/**
 * Use Wallet Minimum Balance Query
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<*, unknown>}
 */
export const useWalletMinBalanceQuery = ({
  wallet,
  options = {
    enabled: typeof wallet !== 'undefined' && typeof wallet.address !== 'undefined'
  }
}) =>
  useQuery(
    ['walletMinBalance', { address: wallet?.address }],
    async () => await WalletService.getMinWalletBalance(wallet),
    options
  )

/**
 * Use Wallets Query
 * @param {Object} props The props of the parent
 * @param {Object} props.wallets A list of Wallet Addresses
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<{}|{wallets: unknown[]}|undefined, unknown>}
 */
export const useWalletsQuery = ({
  wallets,
  options = {
    enabled: typeof wallets !== 'undefined'
  }
}) => useQuery('wallets', () => WalletService.fetchWallets(wallets), options)
