import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`

export const PlaceOrderTabs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray[700]}`};
  width: 100%;
  padding: 0 1rem;
`

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 4rem;
  // for demo
  border: 1px dotted rgba(255, 255, 255, 0.125);

  @media (min-width: 768px) {
    display: none;
  }
`

const pageContainerStyles = `
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const ChartContainer = styled.div`
  ${pageContainerStyles}
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
`
export const BookContainer = styled.div`
  ${pageContainerStyles}
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
`
export const TradeContainer = styled.div`
  ${pageContainerStyles}
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
`
export const OrdersContainer = styled.div`
  ${pageContainerStyles}
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
`
export const HistoryContainer = styled.div`
  ${pageContainerStyles}
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
`
export const TabItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.8rem 0;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.gray[100] : theme.colors.gray[500])};
  border-bottom: ${({ theme, isActive }) =>
    isActive ? `4px solid ${theme.colors.green[500]}` : '4px solid transparent'};
  cursor: pointer;
`
