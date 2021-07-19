import PropTypes from 'prop-types'
import Big from 'big.js'
import OrderBookPrice from 'components/order-book-price'
import { BodyCopyTiny } from 'components/type'
import PriceHeader from 'components/price-header'
import { displayPrice } from 'services/display'

import {
  Container,
  Header,
  BookRow,
  OrdersWrapper,
  SellOrders,
  BuyOrders,
  CurrentPrice
} from './order-book.css'

function OrderBookView(props) {
  const { asset, priceChange, sellData, buyData } = props

  const renderOrders = (data, type) => {
    const color = type === 'buy' ? 'green' : 'red'

    return data.map((row) => {
      const amount = new Big(row.amount)
      const total = new Big(row.total)

      return (
        <BookRow key={`sell-${row.price}`} type={type} data-testid={`order-book-${type}-row`}>
          <BodyCopyTiny
            fontFamily="'Roboto Mono', monospace"
            color={`${color}.500`}
            title={row.price}
            m={0}
          >
            {displayPrice(row.price)}
          </BodyCopyTiny>
          <BodyCopyTiny
            fontFamily="'Roboto Mono', monospace"
            color="gray.400"
            textAlign="right"
            title={amount.toFixed(asset.decimals).toString()}
            m={0}
          >
            {amount.toFixed(Math.min(3, asset.decimals))}
          </BodyCopyTiny>
          <BodyCopyTiny
            fontFamily="'Roboto Mono', monospace"
            color="gray.400"
            textAlign="right"
            title={total.toFixed(asset.decimals).toString()}
            m={0}
          >
            {total.toFixed(Math.min(3, asset.decimals))}
          </BodyCopyTiny>
        </BookRow>
      )
    })
  }

  return (
    <Container>
      <Header>
        <PriceHeader />
        <BodyCopyTiny color="gray.500" textAlign="right" m={0}>
          Amount
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textAlign="right" m={0}>
          Total
        </BodyCopyTiny>
      </Header>

      <SellOrders>
        <OrdersWrapper>{renderOrders(sellData, 'sell')}</OrdersWrapper>
      </SellOrders>

      <CurrentPrice>
        <OrderBookPrice price={asset.price} decimals={asset.decimals} change={priceChange} />
      </CurrentPrice>

      <BuyOrders>
        <OrdersWrapper>{renderOrders(buyData, 'buy')}</OrdersWrapper>
      </BuyOrders>
    </Container>
  )
}

OrderBookView.propTypes = {
  asset: PropTypes.object.isRequired,
  priceChange: PropTypes.number.isRequired,
  sellData: PropTypes.array,
  buyData: PropTypes.array
}

OrderBookView.defaultProps = {
  sellData: [],
  buyData: []
}

export default OrderBookView
