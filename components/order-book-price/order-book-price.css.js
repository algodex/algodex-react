import styled from 'styled-components'
import Icon from 'components/icon'
import { BodyCopySm } from 'components/type'

export const Price = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  margin-left: 0.5rem;
`
export const PriceIcon = styled(Icon)`
  margin-right: 0.25rem;
`
export const PercentChange = styled(BodyCopySm)`
  color: ${({ theme, color }) => theme.colors[color]['500']};
  margin: 0.125rem 0rem 0rem 0.75rem;
`
