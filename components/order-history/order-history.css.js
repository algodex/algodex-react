import styled from 'styled-components'

export const OrderHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  position: relative;
`

export const StatusContainer = styled.div`
  position: absolute;
  inset: 6.25rem 1.125rem 2rem;
`

export const TableWrapper = styled.div`
  padding: 0;
  position: absolute;
  inset: 0;
  overflow: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const OrderDate = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const OrderPrice = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const OrderPair = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const OrderSide = styled.span`
  color: ${({ theme, value }) =>
    ('' + value).toUpperCase() === 'BUY' ? theme.colors.green[500] : theme.colors.red[500]};
`
export const OrderAmount = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
