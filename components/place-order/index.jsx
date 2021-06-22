import { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { HeaderCaps, LabelMd, BodyCopy } from 'components/type'
// import Icon from 'components/icon'
import OrderInput from 'components/order-input'
import AmountRange from 'components/amount-range'
import useStore from 'store/use-store'

import {
  Container,
  Header,
  Form,
  ToggleWrapper,
  ToggleInput,
  BuyButton,
  SellButton,
  ActiveWallet,
  Tab,
  Tabs,
  LimitOrder,
  SubmitButton
} from './place-order.css'

import { WalletRow, Balance } from 'components/wallet/wallet.css'

export default function PlaceOrder() {
  const asset = useStore((state) => state.asset)
  const wallets = useStore((state) => state.wallets)
  const activeWalletAddress = useStore((state) => state.activeWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)

  const activeWallet = wallets.find((wallet) => wallet.address === activeWalletAddress)

  const [order, setOrder] = useState({
    type: 'buy',
    price: '',
    amount: '',
    total: '',
    asset: asset.name
  })

  const handleChange = (e, field) => {
    setOrder((prev) => ({
      ...prev,
      [field || e.target.id]: e.target.value
    }))
  }

  const handleRangeChange = (e) => {
    setOrder((prev) => ({
      ...prev,
      amount: (activeWallet.balance * (Number(e.target.value) / 100)).toFixed(4)
    }))
  }

  useEffect(() => {
    const price = Number(order.price)
    const amount = Number(order.amount)

    const total = (price * amount).toFixed(4)

    if (total !== order.total) {
      setOrder({
        ...order,
        total
      })
    }
  }, [order])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const renderSubmit = () => {
    const buttonProps = {
      buy: { variant: 'primary', text: `Buy ${asset.name}` },
      sell: { variant: 'danger', text: `Sell ${asset.name}` }
    }
    return (
      <SubmitButton
        type="submit"
        variant={buttonProps[order.type].variant}
        size="large"
        block
        orderType={order.type}
      >
        {buttonProps[order.type].text}
      </SubmitButton>
    )
  }

  const renderBalance = (bal) => {
    const split = (bal + '').split('.')

    return (
      <Balance>
        <LabelMd fontWeight="500">
          {`${split[0]}.`}
          <span>{split[1]}</span>
        </LabelMd>
      </Balance>
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

        <ActiveWallet>
          <LabelMd color="gray.500" letterSpacing="0.1em" fontWeight="600">
            Balances
          </LabelMd>
          <WalletRow>
            <LabelMd fontWeight="500">ALGO</LabelMd>
            {renderBalance(activeWallet.balance.toFixed(6))}
          </WalletRow>
          <WalletRow>
            <LabelMd fontWeight="500">{asset.name}</LabelMd>
            {renderBalance(activeWallet.assets[asset.id].balance.toFixed(6))}
          </WalletRow>
        </ActiveWallet>

        <Tabs orderType={order.type}>
          <Tab isActive>Limit</Tab>
        </Tabs>

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
          />
          <AmountRange
            amount={order.amount}
            balance={activeWallet.balance}
            onChange={handleRangeChange}
            orderType={order.type}
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
        </LimitOrder>

        {renderSubmit()}
      </Form>
    )
  }

  const renderNotConnected = () => {
    // @todo: make this better, this is a placeholder
    return (
      <BodyCopy color="gray.500" textAlign="center" m={16}>
        Not signed in
      </BodyCopy>
    )
  }

  return (
    <Container data-testid="place-order">
      <Header>
        <HeaderCaps color="gray.500" m={0}>
          Place Order
        </HeaderCaps>
      </Header>
      {isSignedIn ? renderForm() : renderNotConnected()}
    </Container>
  )
}
