import styled from 'styled-components'

export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  position: relative;
`
export const ChartLabel = styled.div`
  position: absolute;
  left: 2rem;
  z-index: 99;
`

export const AssetName = styled.div`
  display: flex;
  position: absolute;
  z-index: 99;
`

export const Price = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 3.8rem;
  height: auto;
  font-size: 0.9rem;
`
export const Bid = styled.span`
  padding: 0.2rem 0.75rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.green['500']};
  color: ${({ theme }) => theme.colors.green['500']};
`

export const Ask = styled.span`
  padding: 0.2rem 0.75rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.red['500']};
  color: ${({ theme }) => theme.colors.red['500']};
`

export const Spread = styled.span`
  padding: 0.75rem 2rem;
  color: ${({ theme }) => theme.colors.gray['100']};
`
