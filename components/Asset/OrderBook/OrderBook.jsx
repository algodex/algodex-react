import { useState } from 'react'
import useStore from 'store/use-store'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from 'components/Spinner'
import Error from 'components/Error'
import { useAssetOrdersQuery, useAssetPriceQuery } from 'hooks/useAlgodex'
import styled from 'styled-components'
import { rgba } from 'polished'
import useTranslation from 'next-translate/useTranslation'
import { useEventDispatch } from 'hooks/useEvents'
import Big from 'big.js'
import { BodyCopySm, BodyCopyTiny, HeaderCaps, HeaderSm } from 'components/Typography'
import { floatToFixed } from 'services/display'
import TablePriceHeader from 'components/Table/PriceHeader'
import { calculateAsaBuyAmount, convertFromAsaUnits } from 'services/convert'
import { ArrowDown, ArrowUp } from 'react-feather'
import SvgImage from 'components/SvgImage'
import { Section } from '@/components/Layout/Section'
export const AssetOrderBookSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%
  border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  @media (min-width: 1024px) and (orientation: landscape) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }
  // display: ${({ active }) => (active ? 'flex' : 'none')};
  @media (min-width: 996px) {
    grid-area: book;
    display: flex;
  }
`
export const FirstOrderContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: 0.875rem 0 1rem;
`

const EmptyState = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1.125rem;
  text-align: center;
`

const Arrow = styled.div`
  display: none;
  position: absolute;
  top: 50%;
  right: 2.5rem;
  transform: translateY(4.5rem);

  svg {
    transform: scale(-1) scaleY(-1) rotate(-115deg);
  }

  @media (min-width: 1024px) {
    display: block;
  }

  @media (min-width: 1024px) and (orientation: portrait) {
    display: none;
  }

  @media (min-width: 1536px) {
    display: block;
  }
`

const PairSlash = styled.span`
  letter-spacing: 0.125rem;
`
function FirstOrderMsg(props) {
  const { asset, isSignedIn } = props

  const renderMessage = () => {
    if (isSignedIn) {
      return (
        <BodyCopySm color="gray.500" m={0}>
          Place a maker buy/sell order to add liquidity for this trading&nbsp;pair
        </BodyCopySm>
      )
    }
    return (
      <BodyCopySm color="gray.500" m={0}>
        Connect your wallet and place an order to add liquidity for this trading&nbsp;pair
      </BodyCopySm>
    )
  }

  return (
    <FirstOrderContainer>
      <EmptyState>
        {isSignedIn && (
          <Arrow>
            <SvgImage use="walletArrow" h={4} color="gray.600" />
          </Arrow>
        )}
        <HeaderSm color="gray.100" m={0} mb={16}>
          Place the first limit order for {asset.name}
          {` `}
          <PairSlash>{`/`}</PairSlash>ALGO
        </HeaderSm>
        {renderMessage()}
      </EmptyState>
    </FirstOrderContainer>
  )
}

FirstOrderMsg.propTypes = {
  asset: PropTypes.object,
  isSignedIn: PropTypes.bool
}

export const aggregateOrders = (orders, asaDecimals, type) => {
  const isBuyOrder = type === 'buy'
  let total = 0

  const sortOrdersToAggregate = (a, b) => {
    if (isBuyOrder) {
      return b.asaPrice - a.asaPrice
    }
    return a.asaPrice - b.asaPrice
  }

  const reduceAggregateData = (result, order) => {
    const price = floatToFixed(order.formattedPrice)

    const orderAmount = isBuyOrder ? order.algoAmount : order.asaAmount

    const amount = isBuyOrder
      ? calculateAsaBuyAmount(price, orderAmount)
      : parseFloat(order.formattedASAAmount)

    total += amount

    const index = result.findIndex((obj) => obj.price === price)

    if (index !== -1) {
      result[index].amount += amount
      result[index].total += amount
      return result
    }

    result.push({
      price,
      amount,
      total
    })
    return result
  }

  const sortRowsByPrice = (a, b) => {
    return b.price - a.price
  }

  return orders.sort(sortOrdersToAggregate).reduce(reduceAggregateData, []).sort(sortRowsByPrice)
}

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
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 12px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme, color = 'gray', gradient = 600 }) => theme.colors[color][gradient]};
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme, color = 'gray', gradient = 400 }) => theme.colors[color][gradient]};
  }
`

export const BuyOrders = styled.div`
  flex: 1 1 0%;
  position: relative;
  overflow: hidden scroll;

  ${OrdersWrapper} {
    right: 0;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 12px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme, color = 'gray', gradient = 600 }) => theme.colors[color][gradient]};
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme, color = 'gray', gradient = 400 }) => theme.colors[color][gradient]};
  }
`

export const CurrentPrice = styled.div`
  padding: 1rem 0;
`
const Price = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme, color }) => theme.colors[color]['500']};
  margin: 0;

  svg {
    margin-right: 0.5rem;
  }

  span {
    margin-top: 0.125rem;
    margin-left: 0.75rem;
  }
`

/**
 * @param price
 * @param decimals
 * @param change
 * @returns {JSX.Element}
 * @constructor
 */
function OrderBookPrice({ price, decimals, change }) {
  const isDecrease = change < 0
  const color = isDecrease ? 'red' : 'green'

  const renderPrice = () => {
    if (!price) {
      return '--'
    }

    return floatToFixed(decimals !== 6 ? convertFromAsaUnits(price, decimals) : price)
  }

  const renderChange = () => {
    if (!change) {
      return <BodyCopySm as="span">0.00%</BodyCopySm>
    }
    return <BodyCopySm as="span">{`${floatToFixed(change, 2)}%`}</BodyCopySm>
  }

  return (
    <Price color={color} data-testid="order-book-price">
      {isDecrease ? <ArrowDown data-testid="arrow-down" /> : <ArrowUp data-testid="arrow-up" />}
      {renderPrice()}
      {renderChange()}
    </Price>
  )
}

OrderBookPrice.propTypes = {
  price: PropTypes.number,
  change: PropTypes.number,
  decimals: PropTypes.number
}

OrderBookPrice.defaultProps = {
  decimals: 3
}

/**
 * # Recipe: Orderbook Component
 *
 * @todo Refactor to Orderbook withAssetOrdersQuery
 * @param asset
 * @param sellData
 * @param buyData
 * @returns {JSX.Element}
 * @constructor
 */
export function OrderBookView({ asset, sellData, buyData }) {
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
    <Section area="topLeft">
      <Container>
        <HeaderCaps color="gray.500" mb={1}>
          {t('order-book')}
        </HeaderCaps>
        <br></br>
        <Header>
          <TablePriceHeader />
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
          {isLoading && <OrderBookPrice price={false} decimals={6} change={0} />}
          {!isLoading && (
            <OrderBookPrice price={data.price} decimals={decimals} change={data.price24Change} />
          )}
        </CurrentPrice>

        <BuyOrders>
          <OrdersWrapper>{renderOrders(buyData, 'buy')}</OrdersWrapper>
        </BuyOrders>
      </Container>
    </Section>
  )
}

OrderBookView.propTypes = {
  asset: PropTypes.object.isRequired,
  sellData: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired
    })
  ),
  buyData: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired
    })
  )
}

OrderBookView.defaultProps = {
  sellData: [],
  buyData: []
}

/**
 * @todo move into OrderbookView
 * @deprecated
 * @param asset
 * @returns {JSX.Element}
 * @constructor
 */
export default function OrderBook({ asset /* onClicked, onChange */ }) {
  const [sellOrders, setSellOrders] = useState()
  const [buyOrders, setBuyOrders] = useState()
  const isSignedIn = useStore((state) => state.isSignedIn)

  // Orderbook Query
  const { data, isLoading, isError } = useAssetOrdersQuery({ asset })

  // Massage Orders
  useEffect(() => {
    if (
      data &&
      !isLoading &&
      typeof data.sellASAOrdersInEscrow !== 'undefined' &&
      typeof data.buyASAOrdersInEscrow !== 'undefined'
    ) {
      setSellOrders(aggregateOrders(data.sellASAOrdersInEscrow, asset.decimals, 'sell'))
      setBuyOrders(aggregateOrders(data.buyASAOrdersInEscrow, asset.decimals, 'buy'))
    }
  }, [isLoading, data, setSellOrders, setBuyOrders, asset])

  // Invalid
  if (!asset?.id || isLoading) {
    return <Spinner flex />
  }

  // Is in error
  if (isError || (!asset?.id && !isLoading)) {
    return <Error message={'Issue fetching Orderbook'} />
  }

  // Has no orders
  if (typeof sellOrders !== 'undefined' && typeof buyOrders !== 'undefined') {
    if (sellOrders.length === 0 && buyOrders.length === 0) {
      return <FirstOrderMsg asset={asset} isSignedIn={isSignedIn} />
    }
  }

  // Return OrderBook
  return <OrderBookView asset={asset} buyData={buyOrders} sellData={sellOrders} />
}
OrderBook.propTypes = {
  asset: PropTypes.object.isRequired,
  onClicked: PropTypes.func,
  onChange: PropTypes.func
}
