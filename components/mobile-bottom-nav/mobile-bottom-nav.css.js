import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0;
`

export const Container = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  height: 7vh;
  border-top: 1px solid ${({ theme }) => theme.colors.gray['700']};
`

export const NavItem = styled.div`
  display: flex;
  flex: 1 1 0%;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.background.dark};

  border: ${({ theme }) => `1px solid ${theme.colors.gray['700']}`};
  border-bottom: none;
`
