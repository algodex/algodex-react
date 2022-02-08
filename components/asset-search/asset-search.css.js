import Icon from 'components/icon'
import { rgba } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.background.dark};
  position: relative;
  overflow: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  height: 51px;

  @media (min-width: 1536px) {
    flex-direction: column;
    height: auto;
  }
`

export const SearchContainer = styled.div`
  padding: 0.5rem 1.125rem;
  width: 319px;

  @media (min-width: 1536px) {
    display: none;
  }
`

export const SearchTableHeader = styled.th`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
`

export const AssetsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: ${({ gridHeight }) => `${gridHeight}px`};
  background-color: ${({ theme }) => theme.colors.gray['800']};
  box-shadow: 3px 64px 3px 3px ${({ theme }) => rgba(theme.colors.gray['900'], 0.25)};
  z-index: 1000;

  @media (min-width: 1536px) {
    position: static;
    display: block;
    flex: 1 1 0%;
    position: relative;
    width: auto;
    height: auto;
    background-color: transparent;
    box-shadow: none;
  }
`

export const StatusContainer = styled.div`
  position: absolute;
  inset: 6.25rem 1.125rem 2rem;
`

export const TableWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden scroll;
  scrollbar-width: none;
  top: 51px;

  @media (max-width: 996px) {
    top: 51px;
    margin-bottom: 3rem;
  }

  @media (min-width: 996px) {
    top: 51px;
  }

  @media (min-width: 1536px) {
    top: 35px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

export const NameVerifiedWrapper = styled.span`
  white-space: nowrap;
`

export const AssetNameBlock = styled.p`
  color: ${({ theme }) => theme.colors.gray['500']};

  ${NameVerifiedWrapper} {
    svg {
      position: relative;
      top: -0.125rem;
      margin-left: 0.375rem;
    }
  }
`

export const AssetName = styled.strong`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray['000']};
  margin-right: 0.125rem;
  letter-spacing: 0.025rem;
`

export const PairSlash = styled.span`
  letter-spacing: 0.125rem;
`

export const AssetId = styled.span`
  color: ${({ theme }) => rgba(theme.colors.gray['000'], 0.3)};
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
`

export const AssetPrice = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`

export const AssetChange = styled.span`
  color: ${({ theme, value }) => {
    if (value === null || value === '--') {
      return theme.colors.gray['400']
    }
    return value < 0 ? theme.colors.red['500'] : theme.colors.green['500']
  }};
`

export const SortIcon = styled(Icon)``

export const TableHeader = styled.th`
  border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  top: ${({ searchHeight }) => (searchHeight ? `${searchHeight}px` : '51px')};
`

export const TableContainer = styled.div`
  table {
    position: relative;
    border-spacing: 0;
    border: none;
    width: 100%;

    tr {
      &:hover {
        cursor: pointer;
      }

      &:focus {
        outline: 0;
        box-shadow: inset 0 0 0 0.2rem rgba(121, 255, 156, 0.5);
        border-radius: 3px;
      }

      &:nth-child(odd) {
        td {
          background-color: ${({ theme }) => rgba(theme.colors.gray['000'], 0.01)};
        }
      }

      &:nth-child(odd),
      &:nth-child(even) {
        &:hover {
          td {
            background-color: ${({ theme }) => rgba(theme.colors.gray['000'], 0.04)};
          }
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      color: ${({ theme }) => theme.colors.gray['600']};
      font-size: 0.75rem;
      line-height: 1.25;

      &:first-child {
        padding-left: 1.125rem;
      }
    }

    thead {
      tr {
        th {
          position: sticky;
          padding: 0.75rem 0.5rem;
          background-color: ${({ theme }) => theme.colors.gray['800']};
        }

        &:first-child {
          th {
            top: 0;
            padding: 0.5rem -1rem;
            border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};

            &::before {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 1px;
              background-color: ${({ theme }) => theme.colors.gray['800']};
            }

            &::after {
              content: '';
              position: absolute;
              bottom: -1px;
              left: 0;
              right: 0;
              height: 1px;
              background-color: ${({ theme }) => theme.colors.gray['700']};
            }
          }
        }

        &:last-child {
          ${TableHeader} {
            color: ${({ theme }) => theme.colors.gray['500']};
            text-align: left;
            text-transform: uppercase;
            font-weight: 500;
            user-select: none;
            word-break: break-all;

            ${SortIcon} {
              position: relative;
              top: -1px;
              margin-left: 0.25rem;
            }
          }
        }
      }
    }
  }
`

export const TableData = styled.td`
  border-right: solid 1px #2d3747;
  // width: 9rem;
  // max-width: 9rem;
`
