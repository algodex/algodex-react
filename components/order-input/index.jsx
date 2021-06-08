import PropTypes from 'prop-types'
import { Container, Input, Label, Asset } from './order-input.css'

function OrderInput({ label, asset, orderType, ...props }) {
  return (
    <Container orderType={orderType}>
      <Input placeholder="0.000" {...props} />
      <Label>{label}</Label>
      <Asset>{asset}</Asset>
    </Container>
  )
}

OrderInput.propTypes = {
  label: PropTypes.string,
  asset: PropTypes.string,
  orderType: PropTypes.oneOf(['buy', 'sell'])
}

export default OrderInput
