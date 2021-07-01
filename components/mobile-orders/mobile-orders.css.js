import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1 1 0%;
  width: 100%;
  @media (min-width: 767px) {
    display: none;
  }
`
export const OrderTabContainer = styled.div`
  width: 100%;
  display: grid;
  position: fixed;
  top: 4rem;
  z-index: 20;
  background-color: ${({ theme }) => theme?.colors?.gray[800]};
  left: 0;
  right: 0;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid ${({ theme }) => theme?.colors?.gray[700]};
`
export const PanelWrapper = styled.div`
  padding: 3.25rem 0 2.5rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
  flex: 1 1 0%;
  max-height: calc(100vh - 6rem);
`
export const TabItem = styled.div`
  display: flex;
  flex: 1 1 0%;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.gray[100] : theme.colors.gray[500])};

  border-bottom: ${({ theme, isActive }) =>
    isActive ? `4px solid ${theme?.colors?.green['500']}` : `4px solid transparent`};
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
  align-items: flex-start;
  flex: 1 1 0%;
  width: 100%;
`
