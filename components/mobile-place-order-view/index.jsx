import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
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
} from './mobile-place-order-view.css'
import OrderInput from 'components/order-input'
import AmountRange from 'components/amount-range'
import OrderOptions from 'components/order-options'
import toast from 'react-hot-toast'
import OrderService from 'services/order'
import { HeaderCaps, LabelMd, BodyCopy, BodyCopyTiny } from 'components/type'

const DEFAULT_ORDER = {
  type: 'buy',
  price: '',
  amount: '',
  total: '',
  execution: 'maker'
}

function MobilePlaceOrderView({ asset, wallets, activeWalletAddress, isSignedIn, refetchWallets }) {
  const activeWallet = wallets.find((wallet) => wallet.address === activeWalletAddress)
  const algoBalance = activeWallet?.balance
  const asaBalance = activeWallet?.assets?.[asset.id]?.balance || 0

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
    const price = Number(order.price)
    const amount = Number(order.amount)

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

    const total = (price * amount).toFixed(6)

    if (total !== order.total) {
      setOrder({
        ...order,
        total
      })
    }
  }, [order])

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

  const placeOrder = (orderData) => {
    return OrderService.placeOrder(orderData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus((prev) => ({ ...prev, submitting: true }))

    const orderData = {
      ...order,
      address: activeWalletAddress,
      asset
    }

    const orderPromise = placeOrder(orderData)
      .then(() => {
        setStatus({ submitted: true, submitting: false })

        // update wallet balances
        refetchWallets()

        // reset order form
        setOrder({
          ...DEFAULT_ORDER,
          type: order.type
        })
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        setStatus({ submitted: false, submitting: false })
      })

    toast.promise(orderPromise, {
      loading: 'Awaiting confirmation...',
      success: 'Order successfully placed',
      error: 'Error placing order'
    })
  }

  const renderSubmit = () => {
    const buttonProps = {
      buy: { variant: 'primary', text: `Buy ${asset.name}` },
      sell: { variant: 'danger', text: `Sell ${asset.name}` }
    }

    // disable submit button if insufficient balance
    const isDisabled = {
      buy: parseFloat((Number(order.price) * Number(order.amount)).toFixed(6)) > algoBalance,
      sell: Number(order.amount) > asaBalance
    }

    return (
      <SubmitButton
        type="submit"
        variant={buttonProps[order.type].variant}
        size="large"
        block
        orderType={order.type}
        disabled={isDisabled[order.type] || status.submitting}
      >
        {buttonProps[order.type].text}
      </SubmitButton>
    )
  }

  const demoWallet = {
    address: 'X5RS35DM4FDQZQ5GRGIOSM33DQGL7PSE222NIFIBS4NR3J36WS4P74LTAQ',
    name: 'X5RS...LTAQ',
    balance: 10.391179,
    assets: {
      15322902: {
        balance: 6.217775
      }
    }
  }

  const renderLimitOrder = () => {
    // if (!enableOrder[order.type]) {
    //   // @todo: make this better, this is a placeholder
    //   return (
    //     <BodyCopy color="gray.500" textAlign="center" m={32}>
    //       Insufficient balance
    //     </BodyCopy>
    //   )
    // }

    return (
      <>
        <LimitOrder>
          <OrderInput
            type="number"
            id="price"
            name="af2Km9q"
            label="Price"
            asset="ALGO"
            orderType={order.type}
            value={order.price}
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
            orderType={order.type}
            value={order.amount}
            onChange={handleChange}
            autocomplete="false"
            min="0"
            step="0.000001"
          />
          <AmountRange
            order={order}
            activeWallet={demoWallet}
            asset={asset}
            // txnFee={txnFee}
            onChange={handleRangeChange}
          />
          <OrderInput
            type="number"
            id="total"
            label="Total"
            asset="ALGO"
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
          <OrderOptions order={order} onChange={handleChange} />
        </LimitOrder>
        {renderSubmit()}
      </>
    )
  }

  const renderForm = () => {
    // if (!isSignedIn) {
    //   // @todo: make this better, this is a placeholder
    //   return (
    //     <BodyCopy color="gray.500" textAlign="center" m={16}>
    //       Not signed in
    //     </BodyCopy>
    //   )
    // }

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
              {algoBalance?.toFixed(6)}
            </LabelMd>
          </BalanceRow>
          <BalanceRow>
            <LabelMd color="gray.400" fontWeight="500">
              {asset.name}
            </LabelMd>
            <LabelMd color="gray.300" fontWeight="500">
              {asaBalance.toFixed(6)}
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
  return <Container>{renderForm()}</Container>
}

export default MobilePlaceOrderView

MobilePlaceOrderView.propTypes = {
  asset: PropTypes.obj,
  wallets: PropTypes.arrayOf(PropTypes.object),
  isSignedIn: PropTypes.boolean,
  activeWalletAddress: PropTypes.string,
  refetchWallets: PropTypes.func
}
