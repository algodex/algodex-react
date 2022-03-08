import { Container } from './order-size-filter.css'
import PropTypes from 'prop-types'
import { default as Slider } from 'components/Input/Slider'

function OrderSizeFilter(props) {
  const { onChange, value } = props

  const marks = [
    {
      value: 0
    },
    {
      value: 25
    },
    {
      value: 50
    },
    {
      value: 75
    },
    {
      value: 100
    }
  ]

  return (
    <Container>
      <Slider
        type="line-marks"
        onChange={(e) => onChange(e.target.value)}
        value={value || 0}
        marks={marks}
        defaultValue={0}
        step={null}
        max={100}
      />
    </Container>
  )
}

OrderSizeFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any
}

export default OrderSizeFilter
