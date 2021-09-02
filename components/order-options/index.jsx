import { useState } from 'react'
import PropTypes from 'prop-types'
import { BodyCopyTiny, LabelSm } from 'components/type'
import { ChevronDown } from 'react-feather'

import {
  Container,
  ExpandToggle,
  ArrowContainer,
  ExpandContainer,
  ExpandContentWrapper,
  ExpandContent,
  OptionsWrapper,
  OptionsInput,
  OptionsButton
} from './order-options.css'

function OrderOptions(props) {
  const { order, onChange, allowTaker } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const handleChange = (e) => {
    onChange(e)
  }

  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      setIsExpanded(!isExpanded)
    }
  }

  const renderMessage = () => {
    switch (order.execution) {
      case 'maker':
        return `Your order will only execute as a maker order.`

      case 'taker':
        return `Your order will only execute as a taker order.`

      case 'both':
        return `Your order may execute as a maker order or taker order.`

      default:
        return null
    }
  }

  return (
    <Container isExpanded={isExpanded} type={order.type}>
      <ExpandToggle
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={handleKeyDown}
        tabIndex="0"
      >
        <LabelSm color="gray.500">Advanced Options</LabelSm>
        <ArrowContainer>
          <ChevronDown />
        </ArrowContainer>
      </ExpandToggle>
      <ExpandContainer aria-hidden={!isExpanded} aria-expanded={isExpanded}>
        <ExpandContentWrapper>
          <ExpandContent>
            <OptionsWrapper>
              <OptionsInput
                type="checkbox"
                id="order-both"
                value="both"
                checked={order.execution === 'both'}
                onChange={handleChange}
              />
              <OptionsButton as="label" htmlFor="order-both" size="small" type={order.type}>
                Maker/Taker
              </OptionsButton>
              <OptionsInput
                type="checkbox"
                id="order-maker"
                value="maker"
                checked={order.execution === 'maker'}
                onChange={handleChange}
              />
              <OptionsButton as="label" htmlFor="order-maker" size="small" type={order.type}>
                Maker Only
              </OptionsButton>
              <OptionsInput
                type="checkbox"
                disabled={!allowTaker}
                id="order-taker"
                value="taker"
                checked={order.execution === 'taker'}
                onChange={handleChange}
              />
              <OptionsButton as="label" htmlFor="order-taker" size="small" type={order.type}>
                Taker Only
              </OptionsButton>
            </OptionsWrapper>
            <BodyCopyTiny color="gray.500" textTransform="none">
              {renderMessage()}
            </BodyCopyTiny>
          </ExpandContent>
        </ExpandContentWrapper>
      </ExpandContainer>
    </Container>
  )
}

OrderOptions.propTypes = {
  order: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  allowTaker: PropTypes.bool
}

OrderOptions.defaultProps = {
  allowTaker: true
}

export default OrderOptions
