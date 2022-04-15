import { ArrowDown, ArrowUp } from 'react-feather'
// import { Typography, Typography, Typography, Typography } from '@/components/Typography'
import { useAlgodex, withAssetOrderbookQuery, withAssetPriceQuery } from '@algodex/algodex-hooks'
import Typography from '@mui/material/Typography'
import Big from 'big.js'
import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Section } from '@/components/Layout/Section'
import ServiceError from '@/components/ServiceError'
import SvgImage from '@/components/SvgImage'
import TablePriceHeader from '@/components/Table/PriceHeader'
import convertFromAsaUnits from '@algodex/algodex-sdk/lib/utils/units/fromAsaUnits'
import floatToFixed from '@algodex/algodex-sdk/lib/utils/format/floatToFixed'
import { isUndefined } from 'lodash/lang'
import { rgba } from 'polished'
import styled from '@emotion/styled'
import { useEventDispatch } from '@/hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'

const FirstOrderContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.background.dark};
  padding: 0.875rem 0 1rem;
`

const EmptyState = styled.div`
  position: relative;
  flex: 1 1 0;
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
export function FirstOrderMsg(props) {
  const { asset, isSignedIn } = props

  const renderMessage = () => {
    if (isSignedIn) {
      return (
        <Typography color="gray.500" m={0}>
          Place a maker buy/sell order to add liquidity for this trading&nbsp;pair
        </Typography>
      )
    }
    return (
      <Typography color="gray.500" m={0}>
        Connect your wallet and place an order to add liquidity for this trading&nbsp;pair
      </Typography>
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
        <Typography color="gray.100" m={0} mb={16}>
          Place the first limit order for {asset.name}
          {` `}
          <PairSlash>{`/`}</PairSlash>ALGO
        </Typography>
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
  flex: 1 1 0;
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.palette.background.dark};
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
  flex-shrink: 0;
  display: grid;
  padding: 0 0.5rem 0.75rem;
  ${gridStyles}
`

const BookRow = styled.div`
  display: grid;
  padding: 0 0.5rem;
  transition: background-color 150ms ease-out;
  cursor: pointer;
  ${gridStyles}
  &:hover {
    background-color: ${({ theme, type }) => {
      const color = type === 'buy' ? 'green' : 'red'
      return rgba(theme.palette[color]['500'], 0.15)
    }};

    p {
      &:not(:first-of-type) {
        color: ${({ theme }) => theme.palette.gray['000']};
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
  flex: 1 1 0;
  position: relative;
  overflow: hidden scroll;
  display: flex;
  flex-direction: column-reverse;
  /* width */

  ::-webkit-scrollbar {
    width: 0;
    display: none;
  }
`

const BuyOrders = styled.div`
  flex: 1 1 0;
  position: relative;
  overflow: hidden scroll;

  ${OrdersWrapper} {
    right: 0;
  }

  /* width */

  ::-webkit-scrollbar {
    width: 0;
    display: none;
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
  color: ${({ theme, color }) => theme.palette[color]['500']};
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
 * @returns {JSX.Element}
 * @constructor
 */
export function OrderBookPrice({ asset }) {
  // console.log(`OrderBookPrice(`, arguments[0], `)`)
  const isDecrease = asset?.price_info?.price24Change < 0
  const color = isDecrease ? 'red' : 'green'

  function NoPriceInfo() {
    return (
      <Fragment>
        --
        <Typography data-testid="no-price-info" as="span">
          0.00%
        </Typography>
      </Fragment>
    )
  }

  function PriceInfo() {
    return (
      <Fragment>
        {floatToFixed(convertFromAsaUnits(asset?.price_info?.price, asset.decimals))}
        <Typography data-testid="has-price-info" as="span">
          {(asset?.price_info?.price24Change &&
            `${floatToFixed(asset?.price_info?.price24Change, 2)}%`) ||
            '0.00%'}
        </Typography>
      </Fragment>
    )
  }
  return (
    <Price color={color} data-testid="order-book-price">
      {!isUndefined(asset.price_info) && isDecrease ? (
        <ArrowDown data-testid="arrow-down" />
      ) : (
        <ArrowUp data-testid="arrow-up" />
      )}
      {isUndefined(asset.price_info) ? (
        <NoPriceInfo />
      ) : (
        <PriceInfo price_info={asset.price_info} />
      )}
    </Price>
  )
}

OrderBookPrice.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.number.isRequired,
    decimals: PropTypes.number.isRequired,
    price_info: PropTypes.shape({
      price: PropTypes.number.isRequired,
      price24Change: PropTypes.number.isRequired
    })
  }).isRequired
}

OrderBookPrice.defaultProps = {
  asset: {
    price24Change: 0,
    price: false
  }
}

const DefaultOrderBookPrice = withAssetPriceQuery(OrderBookPrice, {
  components: {
    Loading: OrderBookPrice,
    ServiceError: ServiceError
  }
})
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
export function OrderBook({ asset, orders, components }) {
  const { PriceDisplay } = components
  const { t } = useTranslation('common')
  const { decimals } = asset
  const { setOrder, isConnected } = useAlgodex()
  const isSignedIn = isConnected

  const dispatcher = useEventDispatch()

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
          <Typography
            fontFamily="'Roboto Mono', monospace"
            color={`${color}.500`}
            title={row.price}
            m={0}
          >
            {row.price}
          </Typography>
          <Typography
            fontFamily="'Roboto Mono', monospace"
            color="gray.400"
            textAlign="right"
            title={amount.toFixed(decimals).toString()}
            m={0}
          >
            {amount.toFixed(Math.min(3, decimals))}
          </Typography>
          <Typography
            fontFamily="'Roboto Mono', monospace"
            color="gray.400"
            textAlign="right"
            title={total.toFixed(decimals).toString()}
            m={0}
          >
            {total.toFixed(Math.min(3, decimals))}
          </Typography>
        </BookRow>
      )
    })
  }
  if (typeof orders.sell !== 'undefined' && typeof orders.buy !== 'undefined') {
    if (orders.sell.length === 0 && orders.buy.length === 0) {
      return <FirstOrderMsg asset={asset} isSignedIn={isSignedIn} />
    }
  }
  return (
    <Section area="topLeft" data-testid="asset-orderbook">
      <Container>
        <Typography color="gray.500" mb={1}>
          {t('order-book')}
        </Typography>
        <br></br>
        <Header>
          <TablePriceHeader />
          <Typography color="gray.500" textAlign="right" m={0}>
            {t('amount')}
          </Typography>
          <Typography color="gray.500" textAlign="right" m={0}>
            {t('total')}
          </Typography>
        </Header>

        <SellOrders>
          <OrdersWrapper>{renderOrders(orders.sell, 'sell')}</OrdersWrapper>
        </SellOrders>

        <CurrentPrice>
          <PriceDisplay asset={asset} />
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
        price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        total: PropTypes.number.isRequired
      })
    ),
    /**
     * Buy Orders
     */
    buy: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        total: PropTypes.number.isRequired
      })
    )
  }),
  components: PropTypes.shape({
    PriceDisplay: PropTypes.elementType.isRequired
  })
}

OrderBook.defaultProps = {
  orders: { sell: [], buy: [] },
  components: {
    PriceDisplay: DefaultOrderBookPrice
  }
}

export default withAssetOrderbookQuery(OrderBook)
