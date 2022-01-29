import {
  fetchAssetChart,
  fetchAssetOrders,
  fetchAssetPrice,
  fetchAssetTradeHistory,
  fetchWalletAssets,
  fetchWalletOrders,
  fetchWalletTradeHistory,
  searchAssets
} from 'services/algodex'

import WalletService from 'services/wallet'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useRouteQueryError } from './useRouteQueryError'

const refetchInterval = 3000

/**
 * Use Search Results Query
 * @param {Object} props The props of the parent
 * @param {string} props.query Search Query
 * @param {Object} [props.options] useQuery Options
 * @returns {Object} Query Response
 */
export const useSearchResultsQuery = ({
  query = '',
  options = {
    refetchInterval: query === '' ? refetchInterval : 20000
  }
} = {}) => {
  const router = useRouter()
  const { data, isError, error, ...rest } = useQuery(
    ['searchResults', { query }],
    () => searchAssets(query),
    options
  )
  useRouteQueryError({ isError, error, router })
  return { data, isError, error, ...rest }
}

/**
 * Use Asset Price Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @todo: Consolidate with Search
 * @returns {Object} Query Response
 */
export const useAssetPriceQuery = ({
  asset: { id },
  options = {
    refetchInterval,
    enabled: typeof id !== 'undefined'
  }
} = {}) => {
  const router = useRouter()
  const { data, isError, error, ...rest } = useQuery(
    ['assetPrice', { id }],
    () => fetchAssetPrice(id),
    options
  )
  useRouteQueryError({ isError, error, router })
  return { data, isError, error, ...rest }
}

/**
 * Use Asset Chart Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {string} props.chartInterval Interval to aggregate chart by
 * @param {Object} [props.options] useQuery Options
 * @returns {Object} Query Response
 */
export const useAssetChartQuery = ({
  chartInterval,
  asset: { id },
  options = {
    refetchInterval,
    enabled: typeof id !== 'undefined'
  }
}) => {
  const router = useRouter()
  const { data, isError, error, ...rest } = useQuery(
    ['assetChart', { id }],
    () => fetchAssetChart(id, chartInterval),
    options
  )
  useRouteQueryError({ isError, error, router })
  return { data, isError, error, ...rest }
}

/**
 * Use Asset Orders Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @returns {Object} Query Response
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
 * @returns {Object} Query Response
 */
export const useAssetTradeHistoryQuery = ({
  asset: { id },
  options = {
    enabled: typeof id !== 'undefined',
    // enabled: false,
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
 * @returns {Object} Query Response
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
 * @todo: Use Notes to get Orders
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @returns {Object} Query Response
 */
export const useWalletOrdersQuery = ({
  wallet: { address },
  options = { enabled: typeof address !== 'undefined', refetchInterval }
}) => useQuery(['walletOrders', { address }], () => fetchWalletOrders(address), options)

/**
 * Use Wallet Trade History
 *
 * @todo: Use Notes to get Trade History
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @returns {Object} Query Response
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
 * @returns {Object} Query Response
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
 * @returns {Object} Query Response
 */
export const useWalletsQuery = ({
  wallets,
  options = {
    enabled: typeof wallets !== 'undefined',
    refetchInterval
  }
}) => {
  const router = useRouter()
  const { data, isError, error, ...rest } = useQuery(
    'wallets',
    () => WalletService.fetchWallets(wallets),
    options
  )
  useRouteQueryError({ isError, error, router })
  return { data, isError, error, ...rest }
}
