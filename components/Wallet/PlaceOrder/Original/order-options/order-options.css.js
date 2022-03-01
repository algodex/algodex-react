import styled from '@emotion/styled'
import { lighten } from 'polished'
import Button from 'components/button'

export const ExpandToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 3px;
  padding: 0.25rem 0.25rem;
  position: relative;
  left: -0.25rem;
  width: calc(100% + 0.5rem);
`
ExpandToggle.defaultProps = {
  execution: 'button'
}
export const ArrowContainer = styled.div`
  line-height: 0;
  transition: transform 200ms ease 0s;

  svg {
    color: ${({ theme }) => theme.colors.gray['500']};
    width: 1rem;
    height: 1rem;
    transition: transform 200ms ease-in-out;
  }
`

export const ExpandContainer = styled.div`
  z-index: 1;
  transition: height 200ms ease-in-out;
  position: relative;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${ExpandToggle} {
    &:focus {
      outline: 0;
      box-shadow: ${({ theme, type }) => {
        const color = type === 'buy' ? 'green' : 'red'
        return `0 0 0 0.2rem ${theme.colors.focus[color]}`
      }};
    }
  }

  ${ArrowContainer} {
    transform: ${({ isExpanded }) => (isExpanded ? 'scaleY(-1)' : 'scaleY(1)')};
  }

  ${ExpandContainer} {
    height: ${({ isExpanded }) => (isExpanded ? 'auto' : '0')};
    overflow: ${({ isExpanded }) => (isExpanded ? 'visible' : 'auto')};
  }
`

export const ExpandContentWrapper = styled.div`
  inset: -0.5rem;
  padding: 0.5rem 0;
`

export const ExpandContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const OptionsWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 0;
`

export const OptionsInput = styled.input`
  opacity: 0;
  position: absolute;
`

export const OptionsButton = styled(Button)`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  margin: 0;
  line-height: 1.25;
  border-radius: 0;
  padding: 0.375rem;
  font-size: 0.625rem;
  text-align: center;
  text-transform: none;
  margin-right: 1px;
  background-color: ${({ theme }) => theme.colors.gray['700']};

  &:hover {
    background-color: ${({ theme }) => lighten(0.05, theme.colors.gray['700'])};
  }

  &:nth-child(2) {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  &:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    margin-right: 0;
  }

  && {
    ${OptionsInput}:checked + & {
      background-color: ${({ theme, type }) => {
        const color = type === 'buy' ? 'green' : 'red'
        return theme.colors[color]['500']
      }};
    }

    ${OptionsInput}:checked + &:hover {
      background-color: ${({ theme, type }) => {
        const color = type === 'buy' ? 'green' : 'red'
        return lighten(0.05, theme.colors[color]['500'])
      }};
    }

    ${OptionsInput}:focus + & {
      box-shadow: ${({ theme, type }) => {
        const color = type === 'buy' ? 'green' : 'red'
        return `0 0 0 0.2rem ${theme.colors.focus[color]}`
      }};
    }

    ${OptionsInput}:disabled + & {
      opacity: 0.25;
      pointer-events: none;
      cursor: default;
    }
  }

  && {
    ${OptionsInput}:focus + & {
      z-index: 1;
      border-radius: 3px;
    }
  }
`
