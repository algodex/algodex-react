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

function MobileOrder({ pair, date, type, price, amount, total, role, filled, status }) {
  return (
    <Container>
      <ColumnContainer>
        <LeftColumn>
          <BodyCopySm color="gray.100" textTransform="uppercase" mb={1}>
            {`${pair[0]}/${pair[1]}`}
          </BodyCopySm>
          <BodyCopyTiny color="gray.500" textTransform="uppercase" mb={2}>
            {date}
          </BodyCopyTiny>
          <Detail>
            <BodyCopyTiny color="gray.500" textTransform="uppercase" mr={1}>
              Amount ({pair[0]}):
            </BodyCopyTiny>
            <BodyCopyTiny color="gray.100">{amount}</BodyCopyTiny>
          </Detail>
          <Detail>
            <BodyCopyTiny color="gray.500" textTransform="uppercase" mr={1}>
              Value (ALGO):
            </BodyCopyTiny>
            <BodyCopyTiny color="gray.100">{total}</BodyCopyTiny>
          </Detail>
          <Detail>
            <BodyCopyTiny color="gray.500" textTransform="uppercase" mr={1}>
              Role:
            </BodyCopyTiny>
            <BodyCopyTiny color="gray.100">{role}</BodyCopyTiny>
          </Detail>
        </LeftColumn>
        <RightColumn>
          <BodyCopySm color={type === 'BUY' ? 'green.500' : 'red.500'} textTransform="uppercase">
            {type}
          </BodyCopySm>
          <BodyCopyTiny color="gray.500" textTransform="uppercase" mt={2} mb={1}>
            Price ({pair[1]}):
          </BodyCopyTiny>
          <BodyCopySm color="gray.100">{price}</BodyCopySm>
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

MobileOrder.propTypes = {}
MobileOrder.defaultProps = {}
