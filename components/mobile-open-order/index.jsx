import PropTypes from 'prop-types'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {
  Container,
  Pair,
  Date,
  Type,
  Amount,
  PriceLabel,
  AmountLabel,
  Price,
  OrderInformation,
  CancelButton,
  Role,
  RoleLabel,
  FilledContainer
} from './mobile-open-order.css'
import ProgressBar from 'components/progress-bar'
import { BodyCopyTiny, BodyCopySm } from 'components/type'

function MobileOpenOrder({ pair, amount, price, type, filled, role, date, total }) {
  return (
    <Container>
      <Pair>
        <BodyCopySm color="gray.100">{pair}</BodyCopySm>
      </Pair>
      <Date>
        <BodyCopyTiny color="gray.500">{date}</BodyCopyTiny>
      </Date>
      <Type>
        <BodyCopySm color={type === 'BUY' ? 'green.500' : 'red.500'}>{type}</BodyCopySm>
      </Type>
      <OrderInformation>
        <AmountLabel>
          <BodyCopyTiny color="gray.500" mr={2}>
            Amount:
          </BodyCopyTiny>
        </AmountLabel>
        <Amount>
          <BodyCopyTiny color="gray.100">{amount}</BodyCopyTiny>
        </Amount>
        <PriceLabel>
          <BodyCopyTiny color="gray.500" mr={2}>
            Price (ALGO):
          </BodyCopyTiny>
        </PriceLabel>
        <Price>
          <BodyCopyTiny color="gray.100">{price}</BodyCopyTiny>
        </Price>
        <RoleLabel>
          <BodyCopyTiny color="gray.500" mr={2}>
            Role:
          </BodyCopyTiny>
        </RoleLabel>
        <Role>
          <BodyCopyTiny color="gray.100">{role}</BodyCopyTiny>
        </Role>
      </OrderInformation>
      <CancelButton>Cancel</CancelButton>
      <ProgressBar value={filled} max={total} type={type} />
    </Container>
  )
}

export default MobileOpenOrder

MobileOpenOrder.propTypes = {}
MobileOpenOrder.defaultProps = {}
