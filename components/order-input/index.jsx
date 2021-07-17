import PropTypes from 'prop-types'
import Big from 'big.js'
import { Container, Input, Label, Asset } from './order-input.css'

function OrderInput({ label, asset, decimals, orderType, ...props }) {
  const placeholder = new Big('0').toFixed(Math.min(3, decimals)).toString()

  return (
    <Container orderType={orderType}>
      <Input placeholder={placeholder} {...props} />
      <Label>{label}</Label>
      <Asset>{asset}</Asset>
    </Container>
  )
}

OrderInput.propTypes = {
  label: PropTypes.string,
  asset: PropTypes.string,
  decimals: PropTypes.number,
  orderType: PropTypes.oneOf(['buy', 'sell'])
}

export default OrderInput
