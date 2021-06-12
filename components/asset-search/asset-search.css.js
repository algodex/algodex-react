import styled from 'styled-components'
import { rgba } from 'polished'
import Icon from 'components/icon'

export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.background.dark};

  @media (min-width: 1536px) {
    flex-direction: column;
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
  display: none;

  @media (min-width: 1536px) {
    display: block;
    flex: 1 1 0%;
    position: relative;
  }
`

export const TableWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const AssetName = styled.strong`
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray['000']};
  margin-right: 0.125rem;
`

export const PairSlash = styled.span`
  letter-spacing: 0.125rem;
`

export const AssetPrice = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`

export const AssetChange = styled.span`
  color: ${({ theme, value }) => (value < 0 ? theme.colors.red['500'] : theme.colors.green['500'])};
`

export const SortIcon = styled(Icon)``

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
            padding: 0.5rem 1.125rem;
          }
        }

        &:last-child {
          th {
            top: 51px;
            border-top: 1px solid ${({ theme }) => theme.colors.gray['700']};
            color: ${({ theme }) => theme.colors.gray['500']};
            text-align: left;
            text-transform: uppercase;
            font-weight: 500;
            user-select: none;

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
