import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { HeaderCaps, LabelMd } from 'components/type'
import Icon from 'components/icon'
import OrderInput from 'components/order-input'
import AmountRange from 'components/amount-range'

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

function PlaceOrder(props) {
  const { activeWallet, asset } = props

  const [order, setOrder] = useState({
    type: 'buy',
    price: '',
    amount: '',
    total: '',
    asset
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

    if (price && amount) {
      const total = (price * amount).toFixed(4)

      if (total !== order.total) {
        setOrder({
          ...order,
          total
        })
      }
    }
  }, [order])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const renderSubmit = () => {
    const buttonProps = {
      buy: { variant: 'primary', text: `Buy ${asset}` },
      sell: { variant: 'danger', text: `Sell ${asset}` }
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

  return (
    <Container data-testid="place-order">
      <Header>
        <HeaderCaps color="gray.500" m={0}>
          Place Order
        </HeaderCaps>
      </Header>
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
            Active Wallet
          </LabelMd>
          <WalletRow isActive>
            <LabelMd fontWeight="500">
              <Icon use="wallet" size={0.75} />
              {activeWallet.name}
            </LabelMd>
            {renderBalance(activeWallet.balance)}
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
            asset="FAME"
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
    </Container>
  )
}

PlaceOrder.propTypes = {
  activeWallet: PropTypes.object.isRequired,
  asset: PropTypes.string.isRequired
}

export default PlaceOrder
