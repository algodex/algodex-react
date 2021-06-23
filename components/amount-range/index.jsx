import PropTypes from 'prop-types'
import { Input, Container, TickWrapper, InputWrapper, Tick } from './amount-range.css'

function AmountRange(props) {
  const { order, activeWallet, asset, onChange } = props

  const isBuyOrder = order.type === 'buy'
  const price = parseFloat(order.price) || 0
  const amount = parseFloat(order.amount) || 0
  const algoBalance = activeWallet.balance
  const asaBalance = activeWallet.assets[asset.id]?.balance || 0
  const currentPrice = asset.price

  const value = isBuyOrder ? (price * amount * 100) / algoBalance : (amount * 100) / asaBalance

  const rounded = Math.round(value / 5) * 5
  const fullBalance = Math.abs(100 - value) < 0.00001

  const handleChange = (e) => {
    if (isBuyOrder && !price) {
      onChange({
        price: currentPrice,
        amount: ((algoBalance * (Number(e.target.value) / 100)) / currentPrice).toFixed(6)
      })
      return
    }
    const newAmount = isBuyOrder
      ? ((algoBalance * (Number(e.target.value) / 100)) / price).toFixed(6)
      : (asaBalance * (Number(e.target.value) / 100)).toFixed(6)

    onChange({
      amount: newAmount
    })
  }

  return (
    <Container>
      <TickWrapper>
        <Tick amt={0} isActive isHighlighted={!value} />
        <Tick amt={25} isActive={rounded >= 25} isHighlighted={rounded === 25} />
        <Tick amt={50} isActive={rounded >= 50} isHighlighted={rounded === 50} />
        <Tick amt={75} isActive={rounded >= 75} isHighlighted={rounded === 75} />
        <Tick amt={100} isActive={rounded === 100} isHighlighted={fullBalance} />
      </TickWrapper>
      <InputWrapper>
        <Input
          min={0}
          max={100}
          step={5}
          value={value || 0}
          onChange={handleChange}
          orderType={order.type}
        />
      </InputWrapper>
    </Container>
  )
}

AmountRange.propTypes = {
  order: PropTypes.object.isRequired,
  activeWallet: PropTypes.object.isRequired,
  asset: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default AmountRange
