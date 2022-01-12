import styled from 'styled-components'

export const Tab = styled.div`
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
  @media (max-width: 992px) {
    font-size: 0.7rem;
  }
`

export const Header = styled.div`
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`
