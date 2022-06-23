import { css } from '@emotion/react'
import { rgba } from 'polished'
import styled from '@emotion/styled'

const trackHeight = '0.125rem'
const thumbDiameter = '0.75rem'

// const track = css`
//   box-sizing: border-box;
//   border: none;
//   height: ${trackHeight};
//   background: ${({ theme }) => rgba(theme.colors.gray['000'], 0.25)};
//   border-radius: ${trackHeight};
// `

const track = css({
  boxSizing: 'border-box',
  border: 'none',
  height: trackHeight,
  background: (theme) => rgba(theme.colors.gray['000'], 0.25),
  borderRadius: trackHeight
})

// const trackFill = css`
//   ${track};
//   height: ${trackHeight};
//   background-color: transparent;
//   background-image: ${({ theme }) => {
//     const white = theme.colors.gray['000']
//     const gray = theme.colors.gray['700']
//     return `linear-gradient(${white}, ${white}), linear-gradient(${gray}, ${gray})`
//   }};
//   background-size: var(--sx) 0.375rem, calc(100% - var(--sx)) 0.25rem;
//   background-position: left center, right center;
//   background-repeat: no-repeat;
// `

const trackFill = css({
  ...track,
  height: trackHeight,
  backgroundColor: 'transparent',
  backgroundImage: (theme) => {
    const white = theme.colors.gray['000']
    const gray = theme.colors.gray['700']
    return `linear-gradient(${white}, ${white}), linear-gradient(${gray}, ${gray})`
  },
  backgroundSize: 'var(--sx) 0.375rem, calc(100% - var(--sx)) 0.25rem',
  backgroundPosition: 'left center, right center',
  backgroundRepeat: 'no-repeat'
})

// const fill = css`
//   height: ${trackHeight};
//   background: ${({ theme }) => theme.colors.gray['700']};
//   border-radius: ${trackHeight};
// `

const fill = css({
  height: trackHeight,
  background: (theme) => theme.colors.gray['700'],
  borderRadius: trackHeight
})

// const thumb = css`
//   box-sizing: border-box;
//   border: none;
//   width: ${thumbDiameter};
//   height: ${thumbDiameter};
//   border-radius: 50%;
//   background: white;
//   transition: transform 120ms;
//   transform: ${({ isMouseDown }) => (isMouseDown ? 'scale(1.1375)' : 'scale(1)')};
// `

const thumb = css({
  boxSizing: 'border-box',
  border: 'none',
  width: thumbDiameter,
  height: thumbDiameter,
  borderRadius: '50%',
  background: 'white',
  transition: 'transform 120ms',
  transform: (isMouseDown) => (isMouseDown ? 'scale(1.1375)' : 'scale(1)')
})

// const focus = css`
//   transition: box-shadow 120ms;
//   box-shadow: ${({ orderType, isMouseDown }) =>
//     orderType === 'sell'
//       ? `0 0 0 ${isMouseDown ? '0.175rem' : '0.2rem'} #b23639`
//       : `0 0 0 ${isMouseDown ? '0.175rem' : '0.2rem'} #4b9064`};
// `

const focus = css({
  transition: 'box-shadow 120ms',
  boShadow: (orderType, isMouseDown) =>
    orderType === 'sell'
      ? `0 0 0 ${isMouseDown ? '0.175rem' : '0.2rem'} #b23639`
      : `0 0 0 ${isMouseDown ? '0.175rem' : '0.2rem'} #4b9064`
})

const disabled = css`
  background: grey;
`

export const Input = styled.input`
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
    ${trackFill};
  }

  &::-moz-range-track {
    ${track};
  }

  &::-ms-track {
    ${track};
  }

  &::-moz-range-progress {
    ${fill};
  }

  &::-ms-fill-lower {
    ${fill};
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
    ${focus}
  }

  &:focus::-moz-range-thumb {
    outline: 0;
    ${focus}
  }

  &:focus::-ms-thumb {
    outline: 0;
    ${focus}
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
Input.defaultProps = {
  type: 'range'
}
export const Container = styled.div`
  position: relative;
  margin: 1rem 1rem;
  height: 1.25rem;
`

export const TickWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const InputWrapper = styled.div`
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
`
