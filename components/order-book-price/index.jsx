import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ArrowUp, ArrowDown } from 'react-feather'
import { floatToFixed } from 'services/display'
import { BodyCopySm } from 'components/type'

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

function OrderBookPrice(props) {
  const { price, change } = props

  const isDecrease = change < 0
  const color = isDecrease ? 'red' : 'green'

  const renderPrice = () => {
    if (!price) {
      return '--'
    }
    return floatToFixed(price)
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

export default OrderBookPrice
