import * as Sentry from '@sentry/browser'
import styled from 'styled-components'
import useStore, { useStorePersisted } from 'store/use-store'
import PropTypes from 'prop-types'
import { useAssetOrdersQuery, useWalletMinBalanceQuery } from 'hooks/useAlgodex'
import Spinner from 'components/Spinner'
import Error from 'components/Error'
import { useEffect, useMemo, useState } from 'react'
import { BodyCopy, HeaderCaps} from 'components/Typography'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from 'store/use-user-state'
import { convertToAsaUnits } from 'services/convert'
import Big from 'big.js'
import OrderService from 'services/order'
import toast from 'react-hot-toast'
import WalletService from 'services/wallet'

import detectMobileDisplay from 'utils/detectMobileDisplay'
import { PlaceOrderForm } from './PlaceOrderForm'

const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.dark};
  overflow: hidden scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Header = styled.header`
  padding: 1.125rem;
`

const PlaceOrderSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  display: ${({ active }) => (active ? 'block' : 'none')};
  overflow: hidden scroll;
  @media (min-width: 996px) {
    grid-area: trade;
    display: flex;
  }
`
const DEFAULT_ORDER = {
  type: 'buy',
  price: '',
  amount: '',
  total: '0',
  execution: 'both'
}

/**
 *
 * @param asset
 * @param wallets
 * @param activeWalletAddress
 * @param orderBook
 * @returns {JSX.Element}
 * @constructor
 */
export function PlaceOrderView({ asset, wallet }) {
  const { t } = useTranslation('place-order')

  const wallets = useStorePersisted((state) => state.wallets)
  const newOrderSizeFilter = useUserStore((state) => state.newOrderSizeFilter)
  const setNewOrderSizeFilter = useUserStore((state) => state.setNewOrderSizeFilter)

  const activeWallet = wallets.find((w) => w.address === wallet.address)
  const algoBalance = activeWallet?.balance || 0
  const asaBalance = convertToAsaUnits(activeWallet?.assets?.[asset.id]?.balance, asset.decimals)
  const [maxSpendableAlgo, setMaxSpendableAlgo] = useState(algoBalance)

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false
  })

  // @todo: calculate transaction fees in total
  // const isAsaOptedIn = !!activeWallet?.assets?.[asset.id]
  // const txnFee = isAsaOptedIn ? 0.002 : 0.003

  /**
   * Buy orders are enabled if active wallet has an ALGO balance > 0
   * Sell orders are enabled if active wallet has an ASA balance > 0
   */
  const enableOrder = {
    buy: maxSpendableAlgo > 0,
    sell: asaBalance > 0
  }
  // const [order, setOrder] = useState()
  const order = useStore((state) => state.order)
  const setOrder = useStore((state) => state.setOrder)

  const {
    data: minBalance,
    isLoading,
    isError
  } = useWalletMinBalanceQuery({
    wallet: wallets.find((wallet) => wallet.address === activeWalletAddress)
  })

  useEffect(() => {
    if (!isLoading && !isError) {
      const total = new Big(algoBalance)
      const min = new Big(minBalance).div(1000000)
      const max = total.minus(min).minus(0.1).round(6, Big.roundDown).toNumber()
      setMaxSpendableAlgo(Math.max(0, max))
    }
  }, [minBalance, algoBalance, isLoading, isError])


  const placeOrder = (orderData) => {
    // Filter buy and sell orders to only include orders with a microalgo amount greater than the set filter amount
    let filteredOrderBook = {
      buyOrders: orderBook.buyOrders.filter((order) =>
        new Big(order.algoAmount).gte(new Big(newOrderSizeFilter).times(1000000))
      ),
      sellOrders: orderBook.sellOrders.filter((order) => {
        const equivAlgoAmount = new Big(order.formattedASAAmount).times(order.formattedPrice)
        return equivAlgoAmount.gte(new Big(newOrderSizeFilter))
      })
    }
    return OrderService.placeOrder(orderData, filteredOrderBook)
  }

  const checkPopupBlocker = () => {
    return ('' + window.open).indexOf('[native code]') === -1
  }

  const handleSubmit = async (e) => {
    console.log('order submitted')

    e.preventDefault()
    if (checkPopupBlocker()) {
      toast.error(
        'Please disable your popup blocker (likely in the top-right of your browser window)'
      )
      return
    }
    const minWalletBalance = await WalletService.getMinWalletBalance(activeWallet)
    console.log({ activeWallet })
    if (activeWallet.balance * 1000000 < minWalletBalance + 500001) {
      toast.error('Please fund your wallet with more ALGO before placing orders!')
      return
    }
    console.log({ minWalletBalance })

    setStatus((prev) => ({ ...prev, submitting: true }))

    const orderData = {
      ...order,
      address: activeWalletAddress,
      asset
    }

    Sentry.addBreadcrumb({
      category: 'order',
      message: `${order.execution} ${order.type} order placed`,
      data: {
        order: orderData
      },
      level: Sentry.Severity.Info
    })

    const orderPromise = placeOrder(orderData)

    toast.promise(orderPromise, {
      loading: t('awaiting-confirmation'),
      success: t('order-success'),
      error: (err) => {
        if (/PopupOpenError|blocked/.test(err)) {
          return detectMobileDisplay() ? t('disable-popup-mobile') : t('disable-popup')
        }

        if (/Operation cancelled/i.test(err)) {
          return t('order-cancelled')
        }

        return t('error-placing-order')
      }
    })

    try {
      const result = await orderPromise
      console.log('Order successfully placed', result)

      setStatus({ submitted: true, submitting: false })

      // reset order form
      setOrder(
        {
          ...DEFAULT_ORDER,
          type: order.type
        },
        asset
      )
    } catch (err) {
      setStatus({ submitted: false, submitting: false })
      console.error(err)

      if (/PopupOpenError|blocked/.test(err)) {
        return
      }

      // ALG-417 Don't capture user initiated cancels
      if (/Operation cancelled/i.test(err)) {
        return
      }

      Sentry.captureException(err)
    }
  }

  console.log()
  return (
    <Container data-testid="place-order">
      <Header>
        <HeaderCaps color="gray.500" mb={1}>
          {t('place-order')}
        </HeaderCaps>
      </Header>
      {children}
    </Container>
  )
}

PlaceOrderView.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.number.isRequired,
    decimals: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    address: PropTypes.string.isRequired
  }).isRequired
}

export function MissingWallet() {
  const { t } = useTranslation('place-order')
  return (
    <Container data-testid="missing-wallet">
      <Header>
        <HeaderCaps color="gray.500" mb={1}>
          {t('place-order')}
        </HeaderCaps>
      </Header>
      <BodyCopy color="gray.500" textAlign="center" m={16}>
        {t('not-signed-in')}
      </BodyCopy>
    </Container>
  )
}
export function MissingAsset() {
  const { t } = useTranslation('place-order')
  return (
    <Container data-testid="missing-asset">
      <Header>
        <HeaderCaps color="gray.500" mb={1}>
          {t('place-order')}
        </HeaderCaps>
      </Header>
      <BodyCopy color="gray.500" textAlign="center" m={16}>
        {t('not-signed-in')}
      </BodyCopy>
    </Container>
  )
}
/**
 *
 * @param {object} props Component Properties
 * @param {object} props.asset Algorand Asset
 * @param {object} props.wallet Algodex Wallet
 * @returns {JSX.Element}
 * @constructor
 */
export function PlaceOrder({ asset, onSubmit }) {
    const { t } = useTranslation('place-order')
    const wallets = useStorePersisted((state) => state.wallets)
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  // const isSignedIn = typeof wallet !== 'undefined' && wallet.isSignedIn
  const isSignedIn = useStore((state) => state.isSignedIn)
  const activeWallet = wallets.find((w) => w.address === activeWalletAddress)
  const { data: ordersResponse, isLoading, isError } = useAssetOrdersQuery({ asset })
  const wallet = {
    address: activeWalletAddress
  }
  const orders = useMemo(
    () => ({
      buyOrders: ordersResponse?.buyASAOrdersInEscrow || [],
      sellOrders: ordersResponse?.sellASAOrdersInEscrow || []
    }),
    [ordersResponse]
  )
  if (typeof asset === 'undefined') {
    return (
      <PlaceOrderSection>
        <MissingAsset />
      </PlaceOrderSection>
    )
  }
  if (!isSignedIn) {
    return (
      <PlaceOrderSection>
        <MissingWallet />
      </PlaceOrderSection>
    )
  }
  if (isLoading) {
    return <Spinner flex />
  }
  if (isError) {
    return <Error />
  }

  return (
    <PlaceOrderSection>
        <Container data-testid="place-order">
            <Header>
                <HeaderCaps color="gray.500" mb={1}>
                    {t('place-order')}
                </HeaderCaps>
            </Header>
            <PlaceOrderForm asset={asset} wallet={activeWallet} />
        </Container>
      {/*<PlaceOrderView asset={asset} wallet={wallet} orders={orders}>*/}

      {/*</PlaceOrderView>*/}
    </PlaceOrderSection>
  )
}

PlaceOrder.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.number.isRequired,
    decimals: PropTypes.number.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    address: PropTypes.string.isRequired
  }),
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      buy: PropTypes.arrayOf(PropTypes.shape({}))
    })
  )
}

PlaceOrder.defaultProps = {
  order: {}
}

export default PlaceOrder
