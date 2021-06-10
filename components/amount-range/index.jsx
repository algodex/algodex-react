import PropTypes from 'prop-types'
import { Input, Container, TickWrapper, InputWrapper, Tick } from './amount-range.css'

function AmountRange(props) {
  const { onChange, amount, balance, orderType } = props

  const value = (Number(amount) * 100) / balance
  const rounded = Math.round(value / 5) * 5
  const fullBalance = Math.abs(100 - value) < 0.00001

  return (
    <Container>
      <TickWrapper>
        <Tick amt={0} isActive isHighlighted={!value} />
        <Tick amt={25} isActive={rounded >= 25} isHighlighted={rounded === 25} />
        <Tick amt={50} isActive={rounded >= 50} isHighlighted={rounded === 50} />
        <Tick amt={75} isActive={rounded >= 75} isHighlighted={rounded === 75} />
        <Tick amt={100} isActive={value === balance} isHighlighted={fullBalance} />
      </TickWrapper>
      <InputWrapper>
        <Input min={0} max={100} step={5} value={value} onChange={onChange} orderType={orderType} />
      </InputWrapper>
    </Container>
  )
}

AmountRange.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  amount: PropTypes.string,
  balance: PropTypes.number.isRequired,
  orderType: PropTypes.oneOf(['buy', 'sell']).isRequired
}

AmountRange.defaultProps = {
  value: 0
}

export default AmountRange
