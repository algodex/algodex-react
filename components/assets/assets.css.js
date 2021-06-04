import styled from 'styled-components'
import { ReactSVG } from 'react-svg'
import { rgba } from 'polished'

const gridStyles = `
      grid-template-columns: repeat(8, 1fr);
      column-gap: 0.25rem;
    `

export const AssetRow = styled.div`
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

export const Header = styled.header`
  flex-shrink: 0%;
  display: grid;
  ${gridStyles}
  padding: 0 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[700]};
`

export const AssetsWrapper = styled.div`
  position: absolute;
  align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`
export const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  position: relative;
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
export const EmptyState = styled.div`
  flex: 1 1 0%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SmallButton = styled.button`
  background-color: ${({ theme, variant = 'solid' }) =>
    variant === 'solid' ? theme.colors.gray[400] : 'transparent'};
  color: ${({ theme, variant = 'solid' }) =>
    variant === 'solid' ? theme.colors.gray[900] : theme.colors.gray[400]};
  padding: 0.3rem 0.3rem;
  border: none;
  width: 95%;
  justify-self: flex-end;
  font-weight: 600;
  border-radius: 3px;
  border: ${({ variant = 'solid', theme }) =>
    variant === 'outline' ? `1px solid ${theme.colors.gray[400]}` : 'none'};
  font-size: 0.7rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.1s ease-in;
  letter-spacing: 0.03rem;

  &:hover {
    background-color: ${({ theme, variant = 'solid' }) =>
      variant === 'solid' ? theme.colors.gray[300] : rgba(theme.colors.gray['000'], 0.04)};
  }

  @media (min-width: 1536px) {
    width: 60%;
  }
`

export const CoinContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const TickerIcon = styled(ReactSVG)`
  height: auto;
  width: 1.25em;
`
