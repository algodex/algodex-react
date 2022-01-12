import {
  BookRow,
  BuyOrders,
  Container,
  CurrentPrice,
  Header,
  OrdersWrapper,
  SellOrders
} from './order-book.css'

import Big from 'big.js'
import { BodyCopyTiny, HeaderCaps } from 'components/type'
import OrderBookPrice from 'components/order-book-price'
import PriceHeader from 'components/price-header'
import PropTypes from 'prop-types'
import Spinner from '../spinner'
import { floatToFixed } from 'services/display'
import { useAssetPriceQuery } from 'hooks/useAlgodex'
import { useEventDispatch } from '../../hooks/useEvents'
import { useStore } from 'store/use-store'
import useTranslation from 'next-translate/useTranslation'
import { WebOnly } from 'components/main-layout/main-layout.css'

function OrderBookView({ asset, sellData, buyData }) {
  const { t } = useTranslation('common')
  const { decimals } = asset
  const setOrder = useStore((state) => state.setOrder)
  const dispatcher = useEventDispatch()
  const { data, isLoading } = useAssetPriceQuery({
    asset
  })
  const renderOrders = (data, type) => {
    const color = type === 'buy' ? 'green' : 'red'

    return data.map((row) => {
      const amount = new Big(row.amount)
      const total = new Big(row.total)

      const handleSelectOrder = () => {
        dispatcher('clicked', 'order')
        setOrder(
          {
            price: row.price,
            type: type === 'buy' ? 'sell' : 'buy'
          },
          asset
        )
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
      <HeaderCaps color="gray.500" mb={1}>
        <WebOnly> {t('order-book')}</WebOnly>
      </HeaderCaps>
      <br></br>
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
