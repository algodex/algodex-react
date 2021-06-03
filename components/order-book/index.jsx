import PropTypes from 'prop-types'
import OrderBookPrice from 'components/order-book-price'
import { LabelSm, BodyCopyTiny } from 'components/type'

import {
  Container,
  Header,
  BookRow,
  OrdersWrapper,
  SellOrders,
  BuyOrders,
  CurrentPrice
} from './order-book.css'

function OrderBook(props) {
  const { assetName, currentPrice, priceChange, sellData, buyData } = props

  const renderSellOrders = () =>
    sellData
      .sort((a, b) => b.price - a.price)
      .map((row) => (
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
    buyData
      .sort((a, b) => b.price - a.price)
      .map((row) => (
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
        <LabelSm color="gray.500">Price (ALGO)</LabelSm>
        <LabelSm color="gray.500">{`Amount (${assetName})`}</LabelSm>
        <LabelSm color="gray.500" textAlign="right">
          Total
        </LabelSm>
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

OrderBook.propTypes = {
  assetName: PropTypes.string.isRequired,
  currentPrice: PropTypes.number.isRequired,
  priceChange: PropTypes.number.isRequired,
  sellData: PropTypes.array.isRequired,
  buyData: PropTypes.array.isRequired
}

export default OrderBook
