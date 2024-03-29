/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// import { InputWrapper } from 'components/Input'
import PropTypes from 'prop-types'
import Slider from '@mui/material/Slider'
import styled from '@emotion/styled'

// import { useState } from 'react'

// const trackHeight = '0.125rem'
// const thumbDiameter = '0.75rem'
// const tickWidth = '0.125rem'

// const thumb = css`
//   box-sizing: border-box;
//   border: none;
//   width: ${thumbDiameter};
//   height: ${thumbDiameter};
//   border-radius: 50%;
//   background: white;
//   transition: transform 120ms;
//   transform: ${({ isMouseDown }) => (isMouseDown ? 'scale(1.1375)' : 'scale(1)')};
//   position: relative;
//   left: ${({ value, min, max }) =>
//     `calc(${thumbDiameter} * (-0.5 + ${(value - min) / (max - min)}))`};
// `

// const Input = styled.input.attrs({ type: 'range' })`
//   &,
//   &::-webkit-slider-thumb {
//     -webkit-appearance: none;
//   }
//
//   &:focus {
//     outline: none;
//   }
//
//   &:focus::-webkit-slider-thumb {
//     outline: 0;
//     ${FocusCSS}
//   }
//
//   &:focus::-moz-range-thumb {
//     outline: 0;
//     ${FocusCSS}
//   }
//
//   &:focus::-ms-thumb {
//     outline: 0;
//     ${FocusCSS}
//   }
//
//   --range: ${({ max, min }) => `calc(${max} - ${min})`};
//   --ratio: ${({ value, min }) => `calc((${value} - ${min}) / var(--range))`};
//   --sx: calc(0.5 * ${thumbDiameter} + var(--ratio) * (100% - ${thumbDiameter}));
//
//   margin: 0;
//   padding: 0;
//   height: calc(${thumbDiameter} + ${trackHeight});
//   background: transparent;
//   width: 100%;
//
//   &::-webkit-slider-runnable-track {
//     ${TrackFillCSS};
//   }
//
//   &::-moz-range-track {
//     ${TrackCSS};
//   }
//
//   &::-ms-track {
//     ${TrackCSS};
//   }
//
//   &::-moz-range-progress {
//     ${FillCSS};
//   }
//
//   &::-ms-fill-lower {
//     ${FillCSS};
//   }
//
//   &::-webkit-slider-thumb {
//     margin-top: calc(0.5 * (${trackHeight} - ${thumbDiameter}));
//     ${thumb};
//   }
//
//   &::-moz-range-thumb {
//     ${thumb};
//   }
//
//   &::-ms-thumb {
//     margin-top: 0;
//     ${thumb};
//   }
//
//   &::-ms-tooltip {
//     display: none;
//   }
//
//   &::-moz-focus-outer {
//     border: 0;
//   }
// `

const Container = styled.div`
  position: relative;
  margin: 1rem 4px;
  height: 1.25rem;
`

// const Tick = styled.div`
//   position: relative;
//   top: -0.125rem;
//   width: ${tickWidth};
//   height: 1rem;
//   background: ${({ theme, isActive }) =>
//     isActive ? theme.palette.gray['000'] : theme.palette.gray['700']};
//
//   &:first-child {
//     transform: translateX(1px);
//     &::after {
//       left: 0;
//       transform: translateX(0);
//     }
//   }
//
//   &:last-child {
//     &::after {
//       transform: translateX(calc(-100% + 0.375rem));
//     }
//   }
// `

/**
 * @param {object} props
 * @param {function} props.onChange
 * @param {string|number} props.value
 * @returns {JSX.Element}
 * @constructor
 */
export function SliderInput({ onChange, value, marks, step, min, max }) {
  // const [isMouseDown, setIsMouseDown] = useState(false)

  return (
    <Container>
      <Slider
        aria-label="Slider Input"
        valueLabelDisplay="auto"
        defaultValue={value}
        value={value}
        onChange={onChange}
        marks={marks}
        step={step}
        min={min}
        max={max}
      />
    </Container>
  )
}

SliderInput.propTypes = {
  defaultValue: PropTypes.number,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  marks: PropTypes.bool.isRequired,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number
}

SliderInput.defaultProps = {
  value: 0,
  onChange: () => console.log('No value passed'),
  marks: false
}

export default SliderInput
