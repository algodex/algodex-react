import styled from 'styled-components'
import { lighten } from 'polished'
import Button from 'components/button'
import { Tab as _Tab, Header as _Tabs } from 'components/orders/orders.css'

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
`

export const Tabs = styled(_Tabs)`
  padding: 0;
  margin-bottom: 1rem;

  ${Tab} {
    border-bottom-color: ${({ orderType, theme }) =>
      orderType === 'sell' ? theme.colors.red['500'] : theme.colors.green['500']};
  }
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
