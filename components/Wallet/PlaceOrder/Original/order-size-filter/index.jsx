import { Container, Input, InputWrapper, Tick, TickWrapper } from './order-size-filter.css'

import PropTypes from 'prop-types'
import { default as Slider } from 'components/Input/Slider'
import { useState } from 'react'

function OrderSizeFilter(props) {
  const { onChange, value } = props
  const [isMouseDown, setIsMouseDown] = useState(false)

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
      {/* <TickWrapper>
        <Tick amt={0} isActive isHighlighted={!value} />
        <Tick amt={20} isActive={value >= 20} isHighlighted={value === 20} />
        <Tick amt={40} isActive={value >= 40} isHighlighted={value === 40} />
        <Tick amt={60} isActive={value >= 60} isHighlighted={value === 60} />
        <Tick amt={80} isActive={value >= 80} isHighlighted={value === 80} />
        <Tick amt={100} isActive={value === 100} isHighlighted={value === 100} />
      </TickWrapper>
      <InputWrapper>
        <Input
          min={0}
          max={100}
          step={5}
          value={value || 0}
          onChange={(e) => onChange(e.target.value)}
          //   orderType={order.type}
          onMouseDown={() => setIsMouseDown(true)}
          onMouseUp={() => setIsMouseDown(false)}
          isMouseDown={isMouseDown}
        />
      </InputWrapper> */}
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
