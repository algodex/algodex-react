import PropTypes from 'prop-types'
import {
  Container,
  BuyOrders,
  SellOrders,
  Header,
  OrdersWrapper,
  BookRow,
  CurrentPrice
} from './mobile-order-book-view.css'
import PriceHeader from 'components/price-header'
import OrderBookPrice from 'components/order-book-price'
import { BodyCopyTiny } from 'components/type'

function MobileOrderBookView({ asset, buyData, sellData, priceChange }) {
  const renderOrders = (data, type) => {
    const color = type === 'buy' ? 'green' : 'red'

    return data.map((row) => (
      <BookRow key={`sell-${row.price}`} type={type} data-testid={`order-book-${type}-row`}>
        <BodyCopyTiny
          fontFamily="'Roboto Mono', monospace"
          color={`${color}.500`}
          title={row.price.toFixed(6)}
          m={0}
        >
          {row.price.toFixed(3)}
        </BodyCopyTiny>
        <BodyCopyTiny
          fontFamily="'Roboto Mono', monospace"
          color="gray.400"
          textAlign="right"
          title={row.amount.toFixed(asset.decimals)}
          m={0}
        >
          {row.amount.toFixed(3)}
        </BodyCopyTiny>
        <BodyCopyTiny
          fontFamily="'Roboto Mono', monospace"
          color="gray.400"
          textAlign="right"
          title={row.total.toFixed(asset.decimals)}
          m={0}
        >
          {row.total.toFixed(3)}
        </BodyCopyTiny>
      </BookRow>
    ))
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
        <OrderBookPrice price={asset.price} change={priceChange} />
      </CurrentPrice>

      <BuyOrders>
        <OrdersWrapper>{renderOrders(buyData, 'buy')}</OrdersWrapper>
      </BuyOrders>
    </Container>
  )
}

export default MobileOrderBookView

MobileOrderBookView.propTypes = {
  asset: PropTypes.object,
  buyData: PropTypes.arrayOf(PropTypes.object),
  sellData: PropTypes.arrayOf(PropTypes.object),
  priceChange: PropTypes.number
}
