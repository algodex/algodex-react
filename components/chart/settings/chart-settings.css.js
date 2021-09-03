import styled from 'styled-components'
import { lighten } from 'polished'
import Button from 'components/button'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1.75rem;
  height: 5rem;

  flex-direction: column;

  @media (orientation: landscape) {
    flex-direction: row;
  }

  @media (min-width: 996px) {
    flex-direction: row;
    height: 2.75rem;
  }

`

export const ToggleWrapper = styled.div`
  display: flex;
  margin-bottom: 1.5rem;

  &:not(:last-child) {
    margin-right: 2rem;
  }
`

export const ToggleInput = styled.input`
  opacity: 0;
  position: absolute;
`

// @todo: Fix Button component `size` prop instead of using custom styles
export const ToggleBtn = styled(Button)`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  background-color: ${({ theme }) => theme.colors.gray['900']};

  &:hover {
    background-color: ${({ theme }) => lighten(0.05, theme.colors.gray['900'])};
  }

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  && {
    ${ToggleInput}:checked + & {
      background-color: ${({ theme }) => theme.colors.gray['700']};
    }

    ${ToggleInput}:checked + &:hover {
      background-color: ${({ theme }) => lighten(0.05, theme.colors.gray['700'])};
    }

    ${ToggleInput}:focus + & {
      z-index: 1;
      border-radius: 3px;
      box-shadow: 0 0 0 0.2rem #4b9064;
    }

    ${ToggleInput}:disabled + & {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    && {
      ${ToggleInput}:disabled + & {
        display: flex;
        opacity: 0.3;
        pointer-events: none;
      }
    }
  }
`
