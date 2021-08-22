import PropTypes from 'prop-types'
import { Container, Input, Label, Asset } from './order-input.css'

function OrderInput({ label, asset, orderType, ...props }) {
  const condenseAssetName = asset?.length > 5

  return (
    <Container orderType={orderType}>
      <Input placeholder="0.00" {...props} />
      <Label>{label}</Label>
      <Asset isCondensed={condenseAssetName}>{asset}</Asset>
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
