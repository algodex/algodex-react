import { useState } from 'react'
import PropTypes from 'prop-types'
import Big from 'big.js'
import styled, { css } from 'styled-components'
import {
  TrackFillCSS,
  TrackCSS,
  FillCSS,
  TickWrapper,
  FocusCSS
} from 'components/Input/Range/Slider'
import { InputWrapper } from 'components/Input'

const trackHeight = '0.125rem'
const thumbDiameter = '0.75rem'

const thumb = css`
  box-sizing: border-box;
  border: none;
  width: ${thumbDiameter};
  height: ${thumbDiameter};
  border-radius: 50%;
  background: white;
  transition: transform 120ms;
  transform: ${({ isMouseDown }) => (isMouseDown ? 'scale(1.1375)' : 'scale(1)')};
`

const disabled = css`
  background: grey;
`

export const Input = styled.input.attrs({ type: 'range' })`
  &,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  --range: ${({ max, min }) => `calc(${max} - ${min})`};
  --ratio: ${({ value, min }) => `calc((${value} - ${min}) / var(--range))`};
  --sx: calc(0.5 * ${thumbDiameter} + var(--ratio) * (100% - ${thumbDiameter}));

  margin: 0;
  padding: 0;
  height: calc(${thumbDiameter} + ${trackHeight});
  background: transparent;
  width: 100%;

  &::-webkit-slider-runnable-track {
    ${TrackFillCSS};
  }

  &::-moz-range-track {
    ${TrackCSS};
  }

  &::-ms-track {
    ${TrackCSS};
  }

  &::-moz-range-progress {
    ${FillCSS};
  }

  &::-ms-fill-lower {
    ${FillCSS};
  }

  &::-webkit-slider-thumb {
    margin-top: calc(0.5 * (${trackHeight} - ${thumbDiameter}));
    ${thumb};
  }

  &::-moz-range-thumb {
    ${thumb};
  }

  &::-ms-thumb {
    margin-top: 0;
    ${thumb};
  }

  &::-ms-tooltip {
    display: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &:focus {
    outline: none;
  }

  &:focus::-webkit-slider-thumb {
    outline: 0;
    ${FocusCSS}
  }

  &:focus::-moz-range-thumb {
    outline: 0;
    ${FocusCSS}
  }

  &:focus::-ms-thumb {
    outline: 0;
    ${FocusCSS}
  }

  &:disabled::-moz-range-track,
  &:disabled::-ms-track {
    ${disabled};
  }

  &:disabled::-webkit-slider-thumb {
    outline: 0;
    ${disabled}
  }

  &:disabled::-moz-range-thumb {
    outline: 0;
    ${disabled}
  }

  &:disabled::-ms-thumb {
    outline: 0;
    ${disabled}
  }
  &:disabled {
    opacity: 1;
  }
`

export const Container = styled.div`
  position: relative;
  margin: 1rem 0;
  height: 1.25rem;
`

export const Tick = styled.div`
  position: relative;
  top: -0.125rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.gray['000'] : theme.colors.gray['700']};

  &::after {
    content: ${({ amt }) => `"${amt}%"`};
    position: absolute;
    top: -250%;
    left: 50%;
    transform: translateX(-50%);
    color: ${({ theme, isHighlighted }) =>
      isHighlighted ? theme.colors.gray['000'] : theme.colors.gray['500']};
    font-size: 0.625rem;
    font-weight: 600;
  }
  &.disabled {
    ${disabled}
    &::after {
      color: gray;
    }
  }
  &:first-child {
    transform: translateX(1px);
    &::after {
      left: 0;
      transform: translateX(0);
    }
  }

  &:last-child {
    &::after {
      transform: translateX(calc(-100% + 0.375rem));
    }
  }
`

/**
 * Amount Range Slider
 *
 * Used to select a Price from a Range
 *
 * @TODO: Make this abstract and not dependant on our system, should be <InputRangeSlider min={} max={} onChange={}>
 *
 * @param {object} props Component Properties
 * @param {object} props.order Order Parameters
 * @param {number} props.algoBalance Asset Balance
 * @param {number} props.asaBalance Asset Balance
 * @param {object} props.asset The Asset Parameters
 * @param {function} props.onChange A change handler
 * @returns {JSX.Element}
 * @deprecated
 * @constructor
 */
function AmountSliderInput({
  order,
  algoBalance: _algoBalance,
  asaBalance: _asaBalance,
  asset,
  onChange
}) {
  const [isMouseDown, setIsMouseDown] = useState(false)

  /**
   * @deprecated
   * @type {boolean}
   */
  const isBuyOrder = order.type === 'buy'
  /**
   * @deprecated
   * @type {string}
   */
  const price = new Big(order.price || 0).toString()
  /**
   * @deprecated
   * @type {string}
   */
  const amount = new Big(order.amount || 0).toString()
  /**
   * @deprecated
   * @type {string}
   */
  const algoBalance = new Big(_algoBalance).toString()
  /**
   * @deprecated
   * @type {string}
   */
  const asaBalance = new Big(_asaBalance).toString()
  /**
   * @deprecated
   * @type {string}
   */
  const currentPrice = new Big(asset.price || 0).toString()

  // @todo: calculate txn fees
  // const value = isBuyOrder
  //   ? ((price * amount + txnFee) * 100) / algoBalance
  //   : (amount * 100) / asaBalance

  /**
   * Calculate some value?
   * @returns {number}
   */
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

  /**
   * Handle slider changes
   *
   * @todo Pass this in as a property of the component, do not mutate data
   * @param e
   */
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
        <Tick className={price == 0 && 'disabled'} amt={0} isActive isHighlighted={!value} />
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
          disabled={price == 0 ? true : false}
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

AmountSliderInput.propTypes = {
  order: PropTypes.object.isRequired,
  algoBalance: PropTypes.number.isRequired,
  asaBalance: PropTypes.number.isRequired,
  asset: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default AmountSliderInput
