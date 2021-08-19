import { useState } from 'react'
import PropTypes from 'prop-types'
import Big from 'big.js'
import { Input, Container, TickWrapper, InputWrapper, Tick } from './amount-range.css'

function AmountRange(props) {
  const { order, algoBalance: _algoBalance, asaBalance: _asaBalance, asset, onChange } = props

  const [isMouseDown, setIsMouseDown] = useState(false)

  const isBuyOrder = order.type === 'buy'
  const price = new Big(order.price || 0).toString()
  const amount = new Big(order.amount || 0).toString()
  const algoBalance = new Big(_algoBalance).toString()
  const asaBalance = new Big(_asaBalance).toString()
  const currentPrice = new Big(asset.price || 0).toString()

  // @todo: calculate txn fees
  // const value = isBuyOrder
  //   ? ((price * amount + txnFee) * 100) / algoBalance
  //   : (amount * 100) / asaBalance

  const calculateValue = () => {
    if (isBuyOrder) {
      if (_algoBalance === 0) {
        return 0
      }
      return new Big(price).times(amount).times(100).div(algoBalance).toNumber()
    } else {
      if (_asaBalance === 0) {
        return 0
      }
      return new Big(amount).times(100).div(asaBalance).toNumber()
    }
  }

  const value = calculateValue()

  const rounded = new Big(value).div(5).round().times(5).toNumber()

  // @todo: calculate txn fees
  // const handleChange = (e) => {
  //   const adjustAlgoBalance = algoBalance - txnFee

  //   if (isBuyOrder && !price) {
  //     onChange({
  //       price: currentPrice,
  //       amount: ((adjustAlgoBalance * (Number(e.target.value) / 100)) / currentPrice).toFixed(6)
  //     })
  //     return
  //   }

  //   const newAmount = isBuyOrder
  //     ? ((adjustAlgoBalance * (Number(e.target.value) / 100)) / price).toFixed(6)
  //     : (asaBalance * (Number(e.target.value) / 100)).toFixed(6)

  //   onChange({
  //     amount: newAmount
  //   })
  // }

  const handleChange = (e) => {
    if (isBuyOrder && price === '0') {
      onChange({
        price: currentPrice,
        amount: new Big(e.target.value).div(100).times(algoBalance).div(currentPrice).toString()
      })
      return
    }

    const newAmount = isBuyOrder
      ? new Big(e.target.value).div(100).times(algoBalance).div(price).toString()
      : new Big(e.target.value).div(100).times(asaBalance).toString()

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
        <Tick amt={100} isActive={rounded === 100} isHighlighted={rounded === 100} />
      </TickWrapper>
      <InputWrapper>
        <Input
          min={0}
          max={100}
          step={5}
          value={value || 0}
          onChange={handleChange}
          orderType={order.type}
          onMouseDown={() => setIsMouseDown(true)}
          onMouseUp={() => setIsMouseDown(false)}
          isMouseDown={isMouseDown}
        />
      </InputWrapper>
    </Container>
  )
}

AmountRange.propTypes = {
  order: PropTypes.object.isRequired,
  algoBalance: PropTypes.number.isRequired,
  asaBalance: PropTypes.number.isRequired,
  asset: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default AmountRange
