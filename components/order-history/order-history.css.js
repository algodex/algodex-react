import styled from 'styled-components'
import { rgba } from 'polished'

const gridStyles = `
      grid-template-columns: repeat(7, 1fr);
      column-gap: 0.25rem;
    `

export const DateContainer = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
`

export const PrimaryToken = styled.span`
  color: ${({ theme }) => theme.colors.gray[500]};
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
    & > button {
      color: ${({ theme }) => theme.colors.red[500]};
    }
  }
`

export const Header = styled.header`
  flex-shrink: 0%;
  display: grid;
  ${gridStyles}
  padding: 0 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[700]};
`

export const OrderWrapper = styled.div`
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
