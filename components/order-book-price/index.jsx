import { ArrowDown, ArrowUp } from 'react-feather'

import { BodyCopySm } from 'components/type'
import PropTypes from 'prop-types'
import { convertFromBaseUnits } from 'services/convert'
import { floatToFixed } from 'services/display'
import styled from 'styled-components'

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

function OrderBookPrice({ price, decimals, change }) {
  const isDecrease = change < 0
  const color = isDecrease ? 'red' : 'green'

  const renderPrice = () => {
    if (!price) {
      return '--'
    }

    return floatToFixed(decimals !== 6 ? convertFromBaseUnits(price, decimals) : price)
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
