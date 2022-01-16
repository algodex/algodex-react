import styled from 'styled-components'
import { rgba } from 'polished'

export const NameVerifiedWrapper = styled.span`
  white-space: nowrap;
`
export const AssetName = styled.strong`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray['000']};
  margin-right: 0.125rem;
  letter-spacing: 0.025rem;
`

export const AssetId = styled.span`
  color: ${({ theme }) => rgba(theme.colors.gray['000'], 0.3)};
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
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
