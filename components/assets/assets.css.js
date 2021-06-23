import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  position: relative;
`

export const StatusContainer = styled.div`
  position: absolute;
  inset: 6.25rem 1.125rem 2rem;
`

export const TableWrapper = styled.div`
  padding: 0;
  position: absolute;
  inset: 0;
  overflow: hidden scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const AssetCoin = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const AssetName = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const AssetTotal = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`

export const AssetAvailable = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const AssetInOrder = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const AssetAlgoValue = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
