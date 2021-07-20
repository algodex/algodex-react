import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import Big from 'big.js'
import * as Sentry from '@sentry/browser'
import { HeaderCaps, LabelMd, BodyCopy, BodyCopyTiny } from 'components/type'
import OrderInput from 'components/order-input'
import AmountRange from 'components/amount-range'
import OrderOptions from 'components/order-options'
// import Icon from 'components/icon'
import OrderService from 'services/order'
import { convertToAsaUnits } from 'services/convert'

import {
  Container,
  Header,
  Form,
  ToggleWrapper,
  ToggleInput,
  BuyButton,
  SellButton,
  AvailableBalance,
  BalanceRow,
  Tab,
  Tabs,
  LimitOrder,
  // TxnFeeContainer,
  SubmitButton
} from './place-order.css'

const DEFAULT_ORDER = {
  type: 'buy',
  price: '',
  amount: '',
  total: '0',
  execution: 'both'
}

function PlaceOrderView(props) {
  const { asset, wallets, activeWalletAddress, isSignedIn, orderBook, refetchWallets } = props

  const activeWallet = wallets.find((wallet) => wallet.address === activeWalletAddress)
  const algoBalance = activeWallet?.balance
  const asaBalance = convertToAsaUnits(activeWallet?.assets?.[asset.id]?.balance, asset.decimals)

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false
  })

  // @todo: calculate transaction fees in total
  // const isAsaOptedIn = !!activeWallet?.assets?.[asset.id]
  // const txnFee = isAsaOptedIn ? 0.002 : 0.003

  const [enableOrder, setEnableOrder] = useState({ buy: false, sell: false })

  /**
   * Buy orders are enabled if active wallet has an ALGO balance > 0
   * Sell orders are enabled if active wallet has an ASA balance > 0
   */
  useEffect(() => {
    const buy = algoBalance > 0
    const sell = asaBalance > 0

    setEnableOrder({ buy, sell })
  }, [algoBalance, asaBalance])

  const [order, setOrder] = useState(DEFAULT_ORDER)

  /**
   * When order price or amount changes, automatically calculate total (in ALGO)
   */
  useEffect(() => {
    const price = new Big(order.price || 0)
    const amount = new Big(order.amount || 0)

    // @todo: calculate transaction fees in total
    // let totalAmount = price * amount
    // if (totalAmount > 0) {
    //   if (order.type === 'buy') {
    //     totalAmount += txnFee
    //   } else {
    //     totalAmount -= txnFee
    //   }
    // }

    // const total = totalAmount.toFixed(6)

    const total = price.times(amount).round(6).toString()

    if (total !== order.total) {
      setOrder({
        ...order,
        total
      })
    }
  }, [order])

  /**
   * When asset or active wallet changes, reset the form
   */
  useEffect(() => {
    setOrder({
      ...DEFAULT_ORDER
    })
  }, [asset, activeWalletAddress])

  const handleChange = (e, field) => {
    setOrder((prev) => ({
      ...prev,
      [field || e.target.id]: e.target.value
    }))
  }

  const handleRangeChange = (update) => {
    setOrder((prev) => ({
      ...prev,
      ...update
    }))
  }

  const handleOptionsChange = (e) => {
    const isChecked = e.target.checked
    setOrder((prev) => ({
      ...prev,
      execution: isChecked ? e.target.value : 'both'
    }))
  }

  const placeOrder = (orderData) => {
    return OrderService.placeOrder(orderData, orderBook)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
      loading: 'Awaiting confirmation...',
      success: 'Order successfully placed',
      error: 'Error placing order'
    })

    try {
      const result = await orderPromise
      console.log('Order successfully placed', result)

      setStatus({ submitted: true, submitting: false })

      // update wallet balances
      refetchWallets()

      // reset order form
      setOrder({
        ...DEFAULT_ORDER,
        type: order.type
      })
    } catch (err) {
      setStatus({ submitted: false, submitting: false })
      Sentry.captureException(err)
      console.error(err)
    }
  }

  const renderSubmit = () => {
    const buttonProps = {
      buy: { variant: 'primary', text: `Buy ${asset.name}` },
      sell: { variant: 'danger', text: `Sell ${asset.name}` }
    }

    const isInvalid = () => {
      return isNaN(parseFloat(order.price)) || isNaN(parseFloat(order.amount))
    }

    const isBalanceExceeded = () => {
      if (order.type === 'buy') {
        return new Big(order.price).times(order.amount).gt(algoBalance)
      }
      return new Big(order.amount).gt(asaBalance)
    }

    const isDisabled =
      order.total === '0' || isInvalid() || isBalanceExceeded() || status.submitting

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
          Insufficient balance
        </BodyCopy>
      )
    }

    // round input value to asset's `decimals` value
    const roundValue = (field) => {
      if (order[field] === '' || order[field].slice(-1) === '0') {
        return order[field]
      }
      const decimals = field === 'amount' ? asset.decimals : 6
      return new Big(order[field]).round(decimals).toString()
    }

    return (
      <>
        <LimitOrder>
          <OrderInput
            type="number"
            id="price"
            name="af2Km9q"
            label="Price"
            asset="ALGO"
            decimals={6}
            orderType={order.type}
            value={roundValue('price')}
            onChange={handleChange}
            autocomplete="false"
            min="0"
            step="0.000001"
          />
          <OrderInput
            type="number"
            id="amount"
            name="af2Km9q"
            label="Amount"
            asset={asset.name}
            decimals={asset.decimals}
            orderType={order.type}
            value={roundValue('amount')}
            onChange={handleChange}
            autocomplete="false"
            min="0"
            step={new Big(10).pow(-1 * asset.decimals).toString()}
          />
          <AmountRange
            order={order}
            algoBalance={algoBalance}
            asaBalance={asaBalance}
            asset={asset}
            // txnFee={txnFee}
            onChange={handleRangeChange}
          />
          <OrderInput
            type="number"
            id="total"
            label="Total"
            asset="ALGO"
            decimals={6}
            orderType={order.type}
            value={roundValue('total')}
            readOnly
            disabled
          />
          {/* <TxnFeeContainer>
            <BodyCopyTiny color="gray.500" textTransform="none">
              Algorand transaction fees: <Icon use="algoLogo" color="gray.500" size={0.5} />{' '}
              {txnFee.toFixed(3)}
            </BodyCopyTiny>
          </TxnFeeContainer> */}
          <OrderOptions order={order} onChange={handleOptionsChange} />
        </LimitOrder>
        {renderSubmit()}
      </>
    )
  }

  const renderForm = () => {
    if (!isSignedIn) {
      // @todo: make this better, this is a placeholder
      return (
        <BodyCopy color="gray.500" textAlign="center" m={16}>
          Not signed in
        </BodyCopy>
      )
    }

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
            Buy
          </BuyButton>
          <ToggleInput
            type="radio"
            id="type-sell"
            value="sell"
            checked={order.type === 'sell'}
            onChange={(e) => handleChange(e, 'type')}
          />
          <SellButton as="label" htmlFor="type-sell">
            Sell
          </SellButton>
        </ToggleWrapper>

        <AvailableBalance>
          <BodyCopyTiny color="gray.500" mb={10}>
            Available Balance
          </BodyCopyTiny>
          <BalanceRow>
            <LabelMd color="gray.400" fontWeight="500">
              ALGO
            </LabelMd>
            <LabelMd color="gray.300" fontWeight="500">
              {algoBalance.toFixed(6)}
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
          <Tab isActive>Limit</Tab>
        </Tabs>

        {renderLimitOrder()}
      </Form>
    )
  }

  return (
    <Container data-testid="place-order">
      <Header>
        <HeaderCaps color="gray.500" mb={1}>
          Place Order
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
  isSignedIn: PropTypes.bool.isRequired,
  orderBook: PropTypes.object.isRequired,
  refetchWallets: PropTypes.func.isRequired
}

export default PlaceOrderView
