import Big from 'big.js'
import { BodyCopyTiny, HeaderCaps } from 'components/Typography'

import PropTypes from 'prop-types'
import Spinner from 'components/Spinner'
import { floatToFixed } from 'services/display'
import { useAssetPriceQuery } from 'hooks/useAlgodex'
import { useEventDispatch } from 'hooks/useEvents'
import { useStore } from 'store/use-store'
import useTranslation from 'next-translate/useTranslation'
import styled from 'styled-components'
import { rgba } from 'polished'
import OrderBookPrice from './order-book-price'
import PriceHeader from './price-header'

export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: 0.3rem;

  @media (min-width: 996px) {
    padding: 0.75rem 0.625rem 1rem;
    overflow: hidden;
  }
`

const gridStyles = `
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.25rem;
`

export const Header = styled.header`
  flex-shrink: 0%;
  display: grid;
  ${gridStyles}
  padding: 0 0.5rem 0.75rem;
`

export const BookRow = styled.div`
  display: grid;
  ${gridStyles}
  padding: 0 0.5rem;
  transition: background-color 150ms ease-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, type }) => {
      const color = type === 'buy' ? 'green' : 'red'
      return rgba(theme.colors[color]['500'], 0.15)
    }};

    p {
      &:not(:first-child) {
        color: ${({ theme }) => theme.colors.gray['000']};
      }
    }
  }
`

export const OrdersWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  overflow: visible;
`

export const SellOrders = styled.div`
  flex: 1 1 0%;
  position: relative;
  overflow: hidden scroll;
  display: flex;
  flex-direction: column-reverse;
`

export const BuyOrders = styled.div`
  flex: 1 1 0%;
  position: relative;
  overflow: hidden scroll;

  ${OrdersWrapper} {
    right: 0;
  }
`

export const CurrentPrice = styled.div`
  padding: 1rem 0;
`

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
        {t('order-book')}
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
