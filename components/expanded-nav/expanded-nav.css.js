import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.gray[800]};
  z-index: 20;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  transition: 0.1s ease-in all;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    visibility: 'hidden';
    opacity: 0;
  }
`

export const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 95%;
  padding: 0;
  justify-content: space-between;
  align-items: flex-start;
  height: 30%;
  margin: auto;
`
