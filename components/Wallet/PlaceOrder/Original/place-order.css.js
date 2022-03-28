import styled from '@emotion/styled'
import { lighten } from 'polished'
import Button from '@/components/Button'
export const _Tabs = styled.div`
  display: flex;
  padding: 0 1.125rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[700]};

  & > * {
    margin: 0 1rem;
  }

  justify-content: space-between;
  @media (min-width: 996px) {
    justify-content: flex-start;
    & > * {
      margin-left: 0;
      margin-right: 6rem;
    }
  }
`
export const _Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray[100]};
  padding: 1rem 0;
  transition: all 0.1s ease-in;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 600;
  line-height: 1.25;

  border-bottom: ${({ isActive, theme }) =>
    isActive ? `6px inset ${theme.colors.green[500]}` : `6px inset transparent`};

  &:hover {
    color: ${({ theme }) => theme.colors.gray[100]};
  }

  &:active {
    color: ${({ theme }) => theme.colors.gray[100]};
  }

  @media (min-width: 1024px) {
    color: ${({ isActive, theme }) => (isActive ? theme.colors.gray[100] : theme.colors.gray[500])};
  }
`
export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.dark};
  overflow: hidden scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Header = styled.header`
  padding: 1.125rem;
`

export const Form = styled.form`
  flex: 1 1 0%;
  padding: 0 1.125rem 1.125rem;
`

export const ToggleWrapper = styled.div`
  display: flex;
  padding: 0 0 1.5rem;
`

export const ToggleInput = styled.input`
  opacity: 0;
  position: absolute;
`

const ToggleBtn = styled(Button)`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  margin: 0;
  line-height: 1.25;
  background-color: ${({ theme }) => theme.colors.gray['700']};

  &:hover {
    background-color: ${({ theme }) => lighten(0.05, theme.colors.gray['700'])};
  }
  label {
    cursor: pointer;
    width: 100%;
  }
  && {
    ${ToggleInput}:focus + & {
      z-index: 1;
      border-radius: 3px;
    }
  }
`

export const BuyButton = styled(ToggleBtn)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  && {
    ${ToggleInput}:checked + & {
      background-color: ${({ theme }) => theme.colors.green['500']};
    }

    ${ToggleInput}:checked + &:hover {
      background-color: ${({ theme }) => lighten(0.05, theme.colors.green['500'])};
    }

    ${ToggleInput}:focus + & {
      box-shadow: 0 0 0 0.2rem #4b9064;
    }
  }
`

export const SellButton = styled(ToggleBtn)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  && {
    ${ToggleInput}:checked + & {
      background-color: ${({ theme }) => theme.colors.red['500']};
    }

    ${ToggleInput}:checked + &:hover {
      background-color: ${({ theme }) => lighten(0.05, theme.colors.red['500'])};
    }

    ${ToggleInput}:focus + & {
      box-shadow: 0 0 0 0.2rem #b23639;
    }
  }
`

export const AvailableBalance = styled.div`
  margin-bottom: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
`

export const IconTextContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray['300']};
`

export const BalanceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`

export const Tab = styled(_Tab)`
  font-size: 0.875rem;
  padding: 0.625rem 0;
  letter-spacing: 0.12rem;
  border-bottom-width: 4px;
  margin-right: 1rem;

  border-bottom-color: ${({ orderType, isActive, theme }) =>
    isActive && (orderType === 'sell' ? theme.colors.red['500'] : theme.colors.green['500'])};
}
`

export const Tabs = styled(_Tabs)`
  padding: 0;
  margin-bottom: 1rem;
  justify-content: flex-start;
`

export const LimitOrder = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

// export const TxnFeeContainer = styled.div`
//   margin-bottom: 0.75rem;
//   text-align: right;

//   svg {
//     margin-left: 0.25rem;
//   }
// `

export const SubmitButton = styled(Button)`
  &:focus {
    box-shadow: 0 0 0 0.2rem ${({ orderType }) => (orderType === 'sell' ? '#b23639' : '#4b9064')};
  }
`

export const IconButton = styled.button`
  cursor: pointer;
  pointer-events: all;
  border: none;
  background: transparent;
  margin-left: 0.125rem;
  padding: 0;
  height: 15px;

  svg {
    height: 15px;
    fill: ${({ theme }) => theme.colors.gray[500]};
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`
