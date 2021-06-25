import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 11fr;
  flex: 1 1 0%;
  width: 100%;
  height: 100%;

  @media (min-width: 767px) {
    display: none;
  }
`
export const OrderTabContainer = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[700]};
`
export const PanelWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`
export const TabItem = styled.div`
  display: flex;
  flex: 1 1 0%;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  border-bottom: ${({ theme, isActive }) =>
    isActive ? `4px solid ${theme.colors.green['500']}` : `4px solid transparent`};
`
export const OrderHistoryContainer = styled.div`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  flex: 1 1 0%;
  width: 100%;
`
export const OpenOrdersContainer = styled.div`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  flex: 1 1 0%;
  width: 100%;
`
export const AssetsContainer = styled.div`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  flex: 1 1 0%;
  width: 100%;
`
