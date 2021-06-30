import styled from 'styled-components'

export const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[100]};
  padding: 1rem 0;
  transition: all 0.1s ease-in;
  cursor: pointer;
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

export const Header = styled.div`
  display: flex;
  padding: 0 1.125rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[700]};

  & > *:not(:last-child) {
    margin-right: 6rem;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`
