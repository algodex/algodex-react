import styled, { css } from 'styled-components'
import { rgba } from 'polished'
const trackHeight = '0.125rem'

export const TrackCSS = css`
  box-sizing: border-box;
  border: none;
  height: ${trackHeight};
  background: ${({ theme }) => rgba(theme.colors.gray['000'], 0.25)};
  border-radius: ${trackHeight};
`

export const TrackFillCSS = css`
  ${TrackCSS};
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

export const FillCSS = css`
  height: ${trackHeight};
  background: ${({ theme }) => theme.colors.gray['700']};
  border-radius: ${trackHeight};
`

export const FocusCSS = css`
  transition: box-shadow 120ms;
  box-shadow: ${({ orderType, isMouseDown }) =>
    orderType === 'sell'
      ? `0 0 0 ${isMouseDown ? '0.175rem' : '0.2rem'} #b23639`
      : `0 0 0 ${isMouseDown ? '0.175rem' : '0.2rem'} #4b9064`};
`

export const TickWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
