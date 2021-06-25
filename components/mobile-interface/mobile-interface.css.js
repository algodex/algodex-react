import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

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
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')}
`
export const BookContainer = styled.div`
  ${pageContainerStyles}
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')}
`
export const TradeContainer = styled.div`
  ${pageContainerStyles}
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')}
`
export const OrdersContainer = styled.div`
  ${pageContainerStyles}
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')}
`
export const HistoryContainer = styled.div`
  ${pageContainerStyles}
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')}
`
