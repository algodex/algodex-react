import PropTypes from 'prop-types'
import OrderBookPrice from 'components/order-book-price'
import { BodyCopyTiny } from 'components/type'

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
  const { assetName, currentPrice, priceChange, sellData, buyData } = props

  const renderSellOrders = () =>
    sellData.map((row) => (
      <BookRow key={`sell-${row.price}`} data-testid="order-book-sell-row">
        <BodyCopyTiny color="red.500" m={0}>
          {row.price}
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.000" m={0}>
          {row.amount}
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.000" textAlign="right" m={0}>
          {row.total}
        </BodyCopyTiny>
      </BookRow>
    ))

  const renderBuyOrders = () =>
    buyData.map((row) => (
      <BookRow key={`buy-${row.price}`} data-testid="order-book-buy-row">
        <BodyCopyTiny color="green.500" m={0}>
          {row.price}
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.000" m={0}>
          {row.amount}
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.000" textAlign="right" m={0}>
          {row.total}
        </BodyCopyTiny>
      </BookRow>
    ))

  return (
    <Container>
      <Header>
        <BodyCopyTiny color="gray.500" m={0}>
          Price (ALGO)
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" m={0}>{`Amount (${assetName})`}</BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textAlign="right" m={0}>
          {`Total (${assetName})`}
        </BodyCopyTiny>
      </Header>

      <SellOrders>
        <OrdersWrapper>{renderSellOrders()}</OrdersWrapper>
      </SellOrders>

      <CurrentPrice>
        <OrderBookPrice price={currentPrice} change={priceChange} />
      </CurrentPrice>

      <BuyOrders>
        <OrdersWrapper>{renderBuyOrders()}</OrdersWrapper>
      </BuyOrders>
    </Container>
  )
}

OrderBookView.propTypes = {
  assetName: PropTypes.string.isRequired,
  currentPrice: PropTypes.number.isRequired,
  priceChange: PropTypes.number.isRequired,
  sellData: PropTypes.array,
  buyData: PropTypes.array
}

OrderBookView.defaultProps = {
  sellData: [],
  buyData: []
}

export default OrderBookView
