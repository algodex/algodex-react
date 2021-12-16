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
  LimitOrder,
  SellButton,
  SubmitButton,
  Tab,
  Tabs,
  ToggleInput,
  ToggleWrapper
} from './place-order.css'
import { BodyCopy, BodyCopyTiny, HeaderCaps, LabelMd, LabelSm } from 'components/type'
import { useEffect, useState } from 'react'

import AmountRange from 'components/amount-range'
import Big from 'big.js'
import Error from 'components/error'
import Icon from 'components/icon'
import { Info } from 'react-feather'
import OrderInput from 'components/order-input'
import OrderOptions from 'components/order-options'
import OrderService from 'services/order'
import PropTypes from 'prop-types'
import Spinner from '../spinner'
import { Tooltip } from 'components/tooltip'
import WalletService from 'services/wallet'
import { convertToAsaUnits } from 'services/convert'
import detectMobileDisplay from 'utils/detectMobileDisplay'
import toast from 'react-hot-toast'
import { useStore } from 'store/use-store'
import useTranslation from 'next-translate/useTranslation'
import { useWalletMinBalanceQuery } from 'hooks/useAlgodex'
import useUserStore from '../../store/use-user-state'

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

  const handleChange = (e, field) => {
    setOrder(
      {
        [field || e.target.id]: e.target.value
      },
      asset
    )
  }

  const handleRangeChange = (update) => {
    setOrder(update, asset)
  }

  const handleOptionsChange = (e) => {
    setOrder(
      {
        execution: e.target.value
      },
      asset
    )
  }

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

  const renderLimitOrder = () => {
    if (!enableOrder[order.type]) {
      // @todo: make this better, this is a placeholder
      return (
        <BodyCopy color="gray.500" textAlign="center" m={32}>
          {t('insufficient-balance')}
        </BodyCopy>
      )
    }

    return (
      <>
        <LimitOrder>
          <OrderInput
            type="number"
            pattern="\d*"
            id="price"
            name="af2Km9q"
            label={t('price')}
            asset="ALGO"
            decimals={6}
            orderType={order.type}
            value={order.price}
            onChange={handleChange}
            autocomplete="false"
            min="0"
            step="0.000001"
            inputMode="decimal"
          />
          <OrderInput
            type="number"
            pattern="\d*"
            id="amount"
            name="af2Km9q"
            label={t('amount')}
            asset={asset.name}
            decimals={asset.decimals}
            orderType={order.type}
            value={order.amount}
            onChange={handleChange}
            autocomplete="false"
            min="0"
            step={new Big(10).pow(-1 * asset.decimals).toString()}
            inputMode="decimal"
          />
          <AmountRange
            order={order}
            algoBalance={maxSpendableAlgo}
            asaBalance={asaBalance}
            asset={asset}
            // txnFee={txnFee}
            onChange={handleRangeChange}
          />
          <OrderInput
            type="number"
            id="total"
            label={t('total')}
            asset="ALGO"
            decimals={6}
            orderType={order.type}
            value={order.total}
            readOnly
            disabled
          />
          {/* <TxnFeeContainer>
            <BodyCopyTiny color="gray.500" textTransform="none">
              Algorand transaction fees: <Icon use="algoLogo" color="gray.500" size={0.5} />{' '}
              {txnFee.toFixed(3)}
            </BodyCopyTiny>
          </TxnFeeContainer> */}
          <OrderOptions
            order={order}
            onChange={handleOptionsChange}
            allowTaker={typeof asset !== 'undefined'}
            orderFilter={newOrderSizeFilter}
            setOrderFilter={setNewOrderSizeFilter}
          />
        </LimitOrder>
        {renderSubmit()}
      </>
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
          <BuyButton as="label" htmlFor="type-buy">
            {t('buy')}
          </BuyButton>
          <ToggleInput
            type="radio"
            id="type-sell"
            value="sell"
            checked={order.type === 'sell'}
            onChange={(e) => handleChange(e, 'type')}
          />
          <SellButton as="label" htmlFor="type-sell">
            {t('sell')}
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

        <Tabs orderType={order.type}>
          <Tab isActive>{t('limit')}</Tab>
        </Tabs>

        {renderLimitOrder()}
      </Form>
    )
  }
  if (isError) return <Error />
  if (isLoading) return <Spinner flex />
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
