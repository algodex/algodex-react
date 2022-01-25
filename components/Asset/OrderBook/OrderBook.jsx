import useStore from 'store/use-store'
import { ArrowDown, ArrowUp } from 'react-feather'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'
import useTranslation from 'next-translate/useTranslation'
import Big from 'big.js'

import { BodyCopySm, BodyCopyTiny, HeaderCaps, HeaderSm } from '@/components/Typography'
import TablePriceHeader from '@/components/Table/PriceHeader'
import SvgImage from '@/components/SvgImage'
import { Section } from '@/components/Layout/Section'

import { floatToFixed } from '@/services/display'
import { convertFromAsaUnits } from '@/services/convert'

import { withAssetOrdersQuery } from '@/hooks/withAlgodex'
import { useAssetPriceQuery } from '@/hooks/useAlgodex'
import { useEventDispatch } from '@/hooks/useEvents'

const FirstOrderContainer = styled.div`
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

const Container = styled.div`
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

const Header = styled.header`
  flex-shrink: 0%;
  display: grid;
  ${gridStyles}
  padding: 0 0.5rem 0.75rem;
`

const BookRow = styled.div`
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

const OrdersWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  overflow: visible;
`

const SellOrders = styled.div`
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

const BuyOrders = styled.div`
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

const CurrentPrice = styled.div`
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
 * Recipe: Orderbook Component
 *
 * @todo: Return Orderbook Summary from API in two parts, Sell and Buy
 *
 * @param {object} props Component Properties
 * @param {object} props.asset Algorand Asset Information
 * @param {object} props.orders Algodex Asset Orders, A unmodified list of raw orders
 * @returns {JSX.Element}
 * @constructor
 */
export function OrderBook({ asset, orders }) {
  const { t } = useTranslation('common')
  const { decimals } = asset
  const setOrder = useStore((state) => state.setOrder)
  const dispatcher = useEventDispatch()
  const {
    data: { price: dexAsset },
    isLoading
  } = useAssetPriceQuery({
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
          <OrdersWrapper>{renderOrders(orders.sell, 'sell')}</OrdersWrapper>
        </SellOrders>

        <CurrentPrice>
          {isLoading && <OrderBookPrice price={false} decimals={6} change={0} />}
          {!isLoading && (
            <OrderBookPrice
              price={dexAsset.price}
              decimals={decimals}
              change={dexAsset.price24Change}
            />
          )}
        </CurrentPrice>

        <BuyOrders>
          <OrdersWrapper>{renderOrders(orders.buy, 'buy')}</OrdersWrapper>
        </BuyOrders>
      </Container>
    </Section>
  )
}

OrderBook.propTypes = {
  /**
   * Algorand Asset Information
   */
  asset: PropTypes.object.isRequired,
  /**
   * Algodex Orders
   */
  orders: PropTypes.shape({
    /**
     * Sell Orders
     */
    sell: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired
      })
    ),
    /**
     * Buy Orders
     */
    buy: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired
      })
    )
  })
}

OrderBook.defaultProps = {
  orders: { sell: [], buy: [] }
}

export default withAssetOrdersQuery(OrderBook)
