import PropTypes from 'prop-types'
import Big from 'big.js'
import OrderBookPrice from 'components/order-book-price'
import { BodyCopyTiny } from 'components/type'
import PriceHeader from 'components/price-header'
import { floatToFixed } from 'services/display'
import { useStore } from 'store/use-store'

import {
  Container,
  Header,
  BookRow,
  OrdersWrapper,
  SellOrders,
  BuyOrders,
  CurrentPrice
} from './order-book.css'
import useTranslation from 'next-translate/useTranslation'
import { useAssetPrice } from '../../hooks/Algodex'
import Spinner from '../spinner'

function OrderBookView({ asset: { id, decimals }, sellData, buyData }) {
  const { t } = useTranslation('common')

  const setOrder = useStore((state) => state.setOrder)

  const { data, isLoading } = useAssetPrice({
    id,
    options: {
      refetchInterval: 3000,
      enabled: typeof id !== 'undefined'
    }
  })
  const renderOrders = (data, type) => {
    const color = type === 'buy' ? 'green' : 'red'

    return data.map((row) => {
      const amount = new Big(row.amount)
      const total = new Big(row.total)

      const handleSelectOrder = () => {
        setOrder({
          price: row.price
        })
      }

      return (
        <BookRow
          onClick={handleSelectOrder}
          key={`sell-${row.price}`}
          type={type}
          data-testid={`order-book-${type}-row`}
        >
          <BodyCopyTiny
            fontFamily="'Roboto Mono', monospace"
            color={`${color}.500`}
            title={row.price}
            m={0}
          >
            {floatToFixed(row.price)}
          </BodyCopyTiny>
          <BodyCopyTiny
            fontFamily="'Roboto Mono', monospace"
            color="gray.400"
            textAlign="right"
            title={amount.toFixed(decimals).toString()}
            m={0}
          >
            {amount.toFixed(Math.min(3, decimals))}
          </BodyCopyTiny>
          <BodyCopyTiny
            fontFamily="'Roboto Mono', monospace"
            color="gray.400"
            textAlign="right"
            title={total.toFixed(decimals).toString()}
            m={0}
          >
            {total.toFixed(Math.min(3, decimals))}
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
          {t('amount')}
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textAlign="right" m={0}>
          {t('total')}
        </BodyCopyTiny>
      </Header>

      <SellOrders>
        <OrdersWrapper>{renderOrders(sellData, 'sell')}</OrdersWrapper>
      </SellOrders>

      <CurrentPrice>
        {isLoading && <Spinner flex />}
        {!isLoading && (
          <OrderBookPrice price={data.price} decimals={decimals} change={data.price24Change} />
        )}
      </CurrentPrice>

      <BuyOrders>
        <OrdersWrapper>{renderOrders(buyData, 'buy')}</OrdersWrapper>
      </BuyOrders>
    </Container>
  )
}

OrderBookView.propTypes = {
  asset: PropTypes.object.isRequired,
  sellData: PropTypes.array,
  buyData: PropTypes.array
}

OrderBookView.defaultProps = {
  sellData: [],
  buyData: []
}

export default OrderBookView
