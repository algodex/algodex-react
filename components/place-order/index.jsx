import { useState, useEffect } from 'react'
import { HeaderCaps, LabelMd, BodyCopy, BodyCopyTiny } from 'components/type'
import OrderInput from 'components/order-input'
import AmountRange from 'components/amount-range'
import OrderOptions from 'components/order-options'
import useStore from 'store/use-store'

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
  SubmitButton
} from './place-order.css'

export default function PlaceOrder() {
  const asset = useStore((state) => state.asset)
  const wallets = useStore((state) => state.wallets)
  const activeWalletAddress = useStore((state) => state.activeWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)

  const activeWallet = wallets.find((wallet) => wallet.address === activeWalletAddress)
  const algoBalance = activeWallet?.balance
  const asaBalance = activeWallet?.assets[asset.id]?.balance || 0

  const [enableOrder, setEnableOrder] = useState({ buy: false, sell: false })

  useEffect(() => {
    const buy = algoBalance > 0
    const sell = asaBalance > 0

    setEnableOrder({ buy, sell })
  }, [algoBalance, asaBalance])

  const [order, setOrder] = useState({
    type: 'buy',
    price: '',
    amount: '',
    total: '',
    execution: 'maker',
    asset: asset.name
  })

  useEffect(() => {
    const price = Number(order.price)
    const amount = Number(order.amount)

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

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const renderSubmit = () => {
    const buttonProps = {
      buy: { variant: 'primary', text: `Buy ${asset.name}` },
      sell: { variant: 'danger', text: `Sell ${asset.name}` }
    }

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
        disabled={isDisabled[order.type]}
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
            activeWallet={activeWallet}
            asset={asset}
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
          <OrderOptions order={order} onChange={handleChange} />
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
