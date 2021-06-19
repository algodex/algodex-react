import styled from 'styled-components'
import { rgba } from 'polished'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  position: relative;
`

export const CancelButton = styled.button`
  border: none;
  outline: none;
  text-align: right;
  color: ${({ theme }) => theme.colors.red[700]};
  text-transform: uppercase;
  background-color: transparent;
  padding: 0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.1s ease-in;
  &:hover {
    color: ${({ theme }) => theme.colors.red[500]};
  }
`

const gridStyles = `
      grid-template-columns: repeat(8, 1fr);
      column-gap: 0.25rem;
    `

export const Header = styled.header`
  flex-shrink: 0%;
  display: grid;
  ${gridStyles}
  padding: 0 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[700]};

  p {
    margin: 1em 0;
  }
`

export const OrderWrapper = styled.div`
  position: absolute;
  align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

export const WrapperContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
  position: relative;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray[700]};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[600]};
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #${({ theme }) => theme.colors.gray[500]};
  }
  ::-webkit-scrollbar-corner {
    background: ${({ theme }) => theme.colors.gray[700]};
  }
`
export const SmallButton = styled.button`
  background-color: ${({ theme, variant = 'solid' }) =>
    variant === 'solid' ? theme.colors.gray[500] : 'transparent'};
  color: ${({ theme, variant = 'solid' }) =>
    variant === 'solid' ? theme.colors.gray[100] : theme.colors.gray[500]};
  padding: 0.3rem 0.3rem;
  border: none;
  width: 75%;
  justify-self: flex-end;
  font-weight: 600;
  border-radius: 3px;
  border: ${({ variant = 'solid', theme }) =>
    variant === 'outline' ? `1px solid ${theme.colors.gray[500]}` : 'none'};
  font-size: 0.7rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.1s ease-in;
  letter-spacing: 0.03rem;

  &:hover {
    background-color: ${({ theme, variant = 'solid' }) =>
      variant === 'solid' ? theme.colors.red[400] : rgba(theme.colors.red['000'], 0.04)};
    border: ${({ variant = 'solid', theme }) =>
      variant === 'outline' ? `1px solid ${theme.colors.red[500]}` : 'none'};
    color: ${({ theme, variant = 'solid' }) =>
      variant === 'solid' ? theme.colors.red[100] : theme.colors.red[500]};
  }

  @media (min-width: 1536px) {
    width: 60%;
  }
`

export const OrderRow = styled.div`
  display: grid;
  align-items: center;
  ${gridStyles}
  padding: .3rem 2rem;
  transition: background-color 150ms ease-out;
  cursor: pointer;
  transition: all 0.1s ease-in;

  &:hover {
    background-color: ${({ theme }) => rgba(theme.colors.gray['000'], 0.04)};
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex: 1 1 0%;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[400]};
  line-height: 1.5;
  font-size: 0.9rem;
`

export const SecondaryToken = styled.span`
  color: ${({ theme }) => theme.colors.gray[500]};
`

export const DateContainer = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
`

export const ColumnHead = styled.span`
  display: flex;
  justify-content: start;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  width: 100%;
  height: 100%;
`

export const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  border-bottom: ${({ theme }) => theme.colors.gray[700]} 1px solid;
  background-color: ${({ theme }) => theme.colors.gray[900]};

  & > *:not(:last-child) {
    margin-right: 0;
  }

  @media (min-width: 1024px) {
    justify-content: flex-start;
    & > *:not(:last-child) {
      margin-right: 6rem;
    }
  }
`
