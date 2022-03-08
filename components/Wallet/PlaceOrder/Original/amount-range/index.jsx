import Big from 'big.js'
import { Container } from './amount-range.css'
import PropTypes from 'prop-types'
import { default as Slider } from 'components/Input/Slider'

function AmountRange(props) {
  const { order, algoBalance: _algoBalance, asaBalance: _asaBalance, asset, onChange } = props

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

  const marks = [
    {
      value: 0,
      label: '0%'
    },
    {
      value: 25,
      label: '25%'
    },
    {
      value: 50,
      label: '50%'
    },
    {
      value: 75,
      label: '75%'
    },
    {
      value: 100,
      label: '100%'
    }
  ]

  return (
    <Container>
      <Slider
        type="default"
        disabled={price == 0 ? true : false}
        onChange={handleChange}
        value={value || 0}
        marks={marks}
        defaultValue={0}
        orderType={order.type}
        max={100}
      />
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
