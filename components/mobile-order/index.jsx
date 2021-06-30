import PropTypes from 'prop-types'
import {
  Container,
  LeftColumn,
  RightColumn,
  Detail,
  ProgressBarContainer,
  ColumnContainer,
  CancelButton
} from './mobile-order.css'
import { BodyCopySm, BodyCopyTiny } from 'components/type'
import ProgressBar from 'components/progress-bar'

function MobileOrder({ order: { pair, date, type, price, amount, total, role, filled }, status }) {
  return (
    <Container className="order-row">
      <ColumnContainer>
        <LeftColumn>
          <BodyCopySm color="gray.100" textTransform="uppercase" mb={1} data-testid="pair">
            {`${pair[0]}/${pair[1]}`}
          </BodyCopySm>
          <BodyCopyTiny color="gray.500" textTransform="uppercase" mb={2} data-testid="date">
            {date}
          </BodyCopyTiny>
          <Detail>
            <BodyCopyTiny color="gray.500" textTransform="uppercase" mr={1}>
              Amount ({pair[0]}):
            </BodyCopyTiny>
            <BodyCopyTiny color="gray.100" data-testid="amount">
              {amount}
            </BodyCopyTiny>
          </Detail>
          <Detail>
            <BodyCopyTiny color="gray.500" textTransform="uppercase" mr={1}>
              Value (ALGO):
            </BodyCopyTiny>
            <BodyCopyTiny color="gray.100" data-testid="total">
              {total}
            </BodyCopyTiny>
          </Detail>
          <Detail>
            <BodyCopyTiny color="gray.500" textTransform="uppercase" mr={1}>
              Role:
            </BodyCopyTiny>
            <BodyCopyTiny color="gray.100" data-testid="role">
              {role}
            </BodyCopyTiny>
          </Detail>
        </LeftColumn>
        <RightColumn>
          <BodyCopySm
            color={type === 'BUY' ? 'green.500' : 'red.500'}
            textTransform="uppercase"
            data-testid="type"
          >
            {type}
          </BodyCopySm>
          <BodyCopyTiny color="gray.500" textTransform="uppercase" mt={2} mb={1}>
            Price ({pair[1]}):
          </BodyCopyTiny>
          <BodyCopySm color="gray.100" data-testid="price">
            {price}
          </BodyCopySm>
          {status === 'OPEN' && <CancelButton>Cancel</CancelButton>}
        </RightColumn>
      </ColumnContainer>
      <ProgressBarContainer>
        <BodyCopyTiny color="gray.500">Filled:</BodyCopyTiny>
        <ProgressBar value={filled} max={amount} type={type} />
      </ProgressBarContainer>
    </Container>
  )
}

export default MobileOrder

MobileOrder.propTypes = {
  order: PropTypes.shape({
    date: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    pair: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    filled: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }),
  status: PropTypes.string
}

MobileOrder.defaultProps = {
  status: 'CLOSED'
}
