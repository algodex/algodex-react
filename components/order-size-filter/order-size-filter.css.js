import styled, { css } from 'styled-components'
import { rgba } from 'polished'

const trackHeight = '0.125rem'
const thumbDiameter = '0.75rem'
const tickWidth = '0.125rem'

const track = css`
  box-sizing: border-box;
  border: none;
  height: ${trackHeight};
  background: ${({ theme }) => rgba(theme.colors.gray['000'], 0.25)};
  border-radius: ${trackHeight};
`

const trackFill = css`
  ${track};
  height: ${trackHeight};
  background-color: transparent;
  background-image: ${({ theme }) => {
    const white = theme.colors.gray['000']
    const gray = theme.colors.gray['700']
    return `linear-gradient(${white}, ${white}), linear-gradient(${gray}, ${gray})`
  }};
  background-size: var(--sx) 0.375rem, calc(100% - var(--sx)) 0.25rem;
  background-position: left center, right center;
  background-repeat: no-repeat;
`

const fill = css`
  height: ${trackHeight};
  background: ${({ theme }) => theme.colors.gray['700']};
  border-radius: ${trackHeight};
`

const thumb = css`
  box-sizing: border-box;
  border: none;
  width: ${thumbDiameter};
  height: ${thumbDiameter};
  border-radius: 50%;
  background: white;
  transition: transform 120ms;
  transform: ${({ isMouseDown }) => (isMouseDown ? 'scale(1.1375)' : 'scale(1)')};
  position: relative;
  left: ${({ value, min, max }) =>
    `calc(${thumbDiameter} * (-0.5 + ${(value - min) / (max - min)}))`};
`

const focus = css`
  transition: box-shadow 120ms;
  box-shadow: ${({ orderType, isMouseDown }) =>
    orderType === 'sell'
      ? `0 0 0 ${isMouseDown ? '0.175rem' : '0.2rem'} #b23639`
      : `0 0 0 ${isMouseDown ? '0.175rem' : '0.2rem'} #4b9064`};
`

export const Input = styled.input.attrs({ type: 'range' })`
  &,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
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
`

export const Container = styled.div`
  position: relative;
  margin: 1rem 4px;
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
  width: ${tickWidth};
  height: 1rem;
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.gray['000'] : theme.colors.gray['700']};

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
