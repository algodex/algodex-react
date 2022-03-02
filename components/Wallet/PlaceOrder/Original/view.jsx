import * as Sentry from '@sentry/browser'

import {
  AvailableBalance,
  BalanceRow,
  BuyButton,
  Container,
  Form,
  Header,
  IconButton,
  IconTextContainer,
  SellButton,
  SubmitButton,
  Tab,
  Tabs,
  ToggleInput,
  ToggleWrapper
} from './place-order.css'
import { BodyCopyTiny, HeaderCaps, LabelMd, LabelSm } from '@/components/Typography'
import { useCallback, useEffect, useState } from 'react'

import Big from 'big.js'
import Icon from '@/components/Icon'
import { Info } from 'react-feather'
import { LimitOrder } from './limit-order'
import { MarketOrder } from './market-order'
import OrderService from '@/services/order'
import PropTypes from 'prop-types'
import { Tooltip } from '@/components/Tooltip'
import WalletService from '@/services/wallet'
import { aggregateOrders } from './helpers'
import { convertToAsaUnits } from 'services/convert'
import detectMobileDisplay from 'utils/detectMobileDisplay'
import toast from 'react-hot-toast'
import { useStore } from '@/store/use-store'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'
import { useWalletMinBalanceQuery } from 'hooks/useAlgodex'

const DEFAULT_ORDER = {
  type: 'buy',
  price: '',
  amount: '',
  total: '0',
  execution: 'both'
}

function PlaceOrderView(props) {
  const { asset, wallets, activeWalletAddress, orderBook } = props
  const { t } = useTranslation('place-order')
  const [sellOrders, setSellOrders] = useState()
  const [buyOrders, setBuyOrders] = useState()
  const newOrderSizeFilter = useUserStore((state) => state.newOrderSizeFilter)
  const setNewOrderSizeFilter = useUserStore((state) => state.setNewOrderSizeFilter)

  const activeWallet = wallets.find((wallet) => wallet.address === activeWalletAddress)
  const algoBalance = activeWallet?.balance || 0
  const asaBalance = convertToAsaUnits(activeWallet?.assets?.[asset.id]?.balance, asset.decimals)
  const [maxSpendableAlgo, setMaxSpendableAlgo] = useState(algoBalance)

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false
  })
  const [orderView, setOrderView] = useState('limit')

  const LIMIT_PANEL = 'limit'
  const MARKET_PANEL = 'market'

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

  const order = useStore((state) => state.order)
  const setOrder = useStore((state) => state.setOrder)

  const {
    data: minBalance,
    isLoading: isWalletBalanceLoading,
    isError: isWalletBalanceError
  } = useWalletMinBalanceQuery({
    wallet: wallets.find((wallet) => wallet.address === activeWalletAddress)
  })

  useEffect(() => {
    if (!isWalletBalanceLoading && !isWalletBalanceError) {
      const total = new Big(algoBalance)
      const min = new Big(minBalance).div(1000000)
      const max = total.minus(min).minus(0.1).round(6, Big.roundDown).toNumber()
      setMaxSpendableAlgo(Math.max(0, max))
    }
  }, [minBalance, algoBalance, isWalletBalanceLoading, isWalletBalanceError])

  /**
   * When asset or active wallet changes, reset the form
   */
  useEffect(() => {
    setOrder(
      {
        ...DEFAULT_ORDER
      },
      asset
    )
  }, [asset, activeWalletAddress, setOrder])

  const handleChange = useCallback(
    (e, field) => {
      setOrder(
        {
          [field || e.target.id]: e.target.value
        },
        asset
      )
    },
    [asset, setOrder]
  )

  useEffect(() => {
    setSellOrders(aggregateOrders(orderBook.sellOrders, asset.decimals, 'sell'))
    setBuyOrders(aggregateOrders(orderBook.buyOrders, asset.decimals, 'buy'))
  }, [orderBook, setSellOrders, setBuyOrders, asset])

  const updateInitialState = () => {
    if (order.type === 'buy') {
      setOrder(
        {
          price: sellOrders?.length ? sellOrders[sellOrders.length - 1].price : '0.00'
        },
        asset
      )
    }

    if (order.type === 'sell') {
      setOrder(
        {
          price: buyOrders?.length ? buyOrders[0].price : '0.00'
        },
        asset
      )
    }
  }

  useEffect(() => {
    updateInitialState()
  }, [order.type, orderView, activeWalletAddress])

  const handleRangeChange = useCallback(
    (update) => {
      setOrder(update, asset)
    },
    [setOrder, asset]
  )

  const handleOptionsChange = useCallback(
    (e) => {
      setOrder(
        {
          execution: e.target.value
        },
        asset
      )
    },
    [setOrder, asset]
  )

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
    handleOptionsChange({
      target: { value: orderView === LIMIT_PANEL ? order.execution : 'market' }
    })
    console.log('order submitted')

    e.preventDefault()
    setStatus((prev) => ({ ...prev, submitting: true }))
    if (checkPopupBlocker()) {
      setStatus((prev) => ({ ...prev, submitting: false }))
      toast.error(
        'Please disable your popup blocker (likely in the top-right of your browser window)'
      )
      return
    }
    const minWalletBalance = await WalletService.getMinWalletBalance(activeWallet)
    //console.log('activeWallet', { activeWallet })
    if (activeWallet.balance * 1000000 < minWalletBalance + 500001) {
      setStatus((prev) => ({ ...prev, submitting: false }))
      toast.error('Please fund your wallet with more ALGO before placing orders!')
      return
    }
    const orderData = {
      ...order,
      execution: orderView === LIMIT_PANEL ? order.execution : 'market',
      address: activeWalletAddress,
      asset
    }

    Sentry.addBreadcrumb({
      category: 'order',
      message: `${orderData.execution} ${orderData.type} order placed`,
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

      // reset order form if it is not a market order
      if (order.execution !== 'market') {
        setOrder(
          {
            ...DEFAULT_ORDER,
            type: order.type
          },
          asset
        )
      }
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

  const renderSubmit = () => {
    const buttonProps = {
      buy: { variant: 'primary', text: `${t('buy')} ${asset.name}` },
      sell: { variant: 'danger', text: `${t('sell')} ${asset.name}` }
    }

    const isBelowMinOrderAmount = () => {
      if (order.type === 'buy') {
        return new Big(order.total).lt(0.5)
      }
      return new Big(order.total).eq(0)
    }

    const isInvalid = () => {
      return isNaN(parseFloat(order.price)) || isNaN(parseFloat(order.amount))
    }

    const isBalanceExceeded = () => {
      if (order.type === 'buy') {
        return new Big(order.price).times(order.amount).gt(maxSpendableAlgo)
      }
      return new Big(order.amount).gt(asaBalance)
    }

    const isDisabled =
      isBelowMinOrderAmount() || isInvalid() || isBalanceExceeded() || status.submitting

    return (
      <SubmitButton
        type="submit"
        variant={buttonProps[order.type].variant}
        size="large"
        block
        orderType={order.type}
        disabled={isDisabled}
      >
        {buttonProps[order.type].text}
      </SubmitButton>
    )
  }

  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmit} autocomplete="off">
        <ToggleWrapper>
          <ToggleInput
            type="radio"
            id="type-buy"
            value="buy"
            checked={order.type === 'buy'}
            onChange={(e) => handleChange(e, 'type')}
          />
          <BuyButton>
            <label htmlFor="type-buy">{t('buy')}</label>
          </BuyButton>
          <ToggleInput
            type="radio"
            id="type-sell"
            value="sell"
            checked={order.type === 'sell'}
            onChange={(e) => handleChange(e, 'type')}
          />
          <SellButton>
            <label htmlFor="type-sell">{t('sell')}</label>
          </SellButton>
        </ToggleWrapper>

        <AvailableBalance>
          <IconTextContainer style={{ marginBottom: '10px' }}>
            <BodyCopyTiny color="gray.500">{t('available-balance')}</BodyCopyTiny>
            <Tooltip
              renderButton={(setTriggerRef) => (
                <IconButton ref={setTriggerRef} type="button">
                  <Info />
                </IconButton>
              )}
            >
              <BalanceRow>
                <LabelMd color="gray.300" fontWeight="500" letterSpacing="0.2em">
                  {t('orders:available')}:
                </LabelMd>
                <IconTextContainer>
                  <LabelMd color="gray.300" fontWeight="500" letterSpacing="0.2em">
                    {maxSpendableAlgo}
                  </LabelMd>
                  <Icon use="algoLogo" size={0.625} />
                </IconTextContainer>
              </BalanceRow>
              <BalanceRow>
                <LabelMd color="gray.300" fontWeight="500" letterSpacing="0.2em">
                  {t('total')}:
                </LabelMd>
                <IconTextContainer>
                  <LabelMd color="gray.300" fontWeight="500" letterSpacing="0.2em">
                    {algoBalance}
                  </LabelMd>
                  <Icon use="algoLogo" size={0.625} />
                </IconTextContainer>
              </BalanceRow>
              <BalanceRow>
                <LabelSm
                  color="gray.300"
                  fontWeight="400"
                  textTransform="initial"
                  lineHeight="0.9rem"
                  letterSpacing="0.1em"
                >
                  &nbsp;*
                  {t('max-spend-explanation', {
                    amount: new Big(algoBalance)
                      .minus(new Big(maxSpendableAlgo))
                      .round(6)
                      .toString()
                  })}
                </LabelSm>
              </BalanceRow>
            </Tooltip>
          </IconTextContainer>
          <BalanceRow>
            <LabelMd color="gray.400" fontWeight="500">
              ALGO
            </LabelMd>
            <LabelMd color="gray.300" fontWeight="500">
              {maxSpendableAlgo}
            </LabelMd>
          </BalanceRow>
          <BalanceRow>
            <LabelMd color="gray.400" fontWeight="500">
              {asset.name}
            </LabelMd>
            <LabelMd color="gray.300" fontWeight="500">
              {asaBalance}
            </LabelMd>
          </BalanceRow>
        </AvailableBalance>

        <Tabs>
          <Tab
            orderType={order.type}
            isActive={orderView === LIMIT_PANEL}
            onClick={() => {
              setOrderView(LIMIT_PANEL)
              handleOptionsChange({ target: { value: 'both' } })
            }}
          >
            {t('limit')}
          </Tab>
          <Tab
            orderType={order.type}
            isActive={orderView === MARKET_PANEL}
            onClick={() => {
              setOrderView(MARKET_PANEL)
              handleOptionsChange({ target: { value: 'market' } })
            }}
          >
            Market
          </Tab>
        </Tabs>
        {orderView === LIMIT_PANEL ? (
          <LimitOrder
            order={order}
            handleChange={handleChange}
            asset={asset}
            maxSpendableAlgo={maxSpendableAlgo}
            asaBalance={asaBalance}
            handleRangeChange={handleRangeChange}
            enableOrder={enableOrder}
            handleOptionsChange={handleOptionsChange}
            newOrderSizeFilter={newOrderSizeFilter}
            setNewOrderSizeFilter={setNewOrderSizeFilter}
          />
        ) : (
          <MarketOrder
            order={order}
            handleChange={handleChange}
            asset={asset}
            maxSpendableAlgo={maxSpendableAlgo}
            asaBalance={asaBalance}
            handleRangeChange={handleRangeChange}
            enableOrder={enableOrder}
          />
        )}
        {renderSubmit()}
      </Form>
    )
  }

  return (
    <Container data-testid="place-order">
      <Header>
        <HeaderCaps color="gray.500" mb={1}>
          {t('place-order')}
        </HeaderCaps>
      </Header>
      {renderForm()}
    </Container>
  )
}

PlaceOrderView.propTypes = {
  asset: PropTypes.object.isRequired,
  wallets: PropTypes.array.isRequired,
  activeWalletAddress: PropTypes.string.isRequired,
  orderBook: PropTypes.object.isRequired
}

export default PlaceOrderView
