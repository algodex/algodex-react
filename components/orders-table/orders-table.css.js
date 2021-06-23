import styled from 'styled-components'
import { rgba } from 'polished'
import Icon from 'components/icon'

export const SortIcon = styled(Icon)`
  position: relative;
  top: -1px;
  margin-left: 0.25rem;
`

export const Container = styled.div`
  table {
    position: relative;
    border-spacing: 0;
    border: none;
    width: 100%;

    tr {
      &:hover {
        cursor: pointer;
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
      padding: 0.5rem 0;
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
          top: 0;
          padding: 0.75rem 0;
          background-color: ${({ theme }) => theme.colors.gray['800']};
          color: ${({ theme }) => theme.colors.gray['500']};
          text-align: left;
          text-transform: uppercase;
          font-weight: 500;
          user-select: none;
        }
      }
    }
  }
`
