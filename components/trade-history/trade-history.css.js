import styled from 'styled-components'

export const Container = styled.div`
  flex: 1 1 0%;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  background-color: ${({ theme }) => theme.colors.background.dark};
`

const gridColumns = `
  grid-template-columns: repeat(3, 1fr);
`

export const Header = styled.header`
  display: grid;
  ${gridColumns}
  padding: 0.5rem 0.75rem 0.625rem;
`

export const HistoryWrapper = styled.div`
  overflow: hidden;
`

export const HistoryRow = styled.div`
  display: grid;
  ${gridColumns}
  padding: 0 0.75rem;
  transition: background-color 150ms ease-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray['700']};
  }
`
