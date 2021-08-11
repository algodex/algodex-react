import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 6rem;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  pointer-events: none;
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 1.75rem;
  margin-top: 1.25rem;
  margin-bottom: 0.125rem;
`

export const TradingPair = styled.h3`
  margin-right: 1.75rem;
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fontFamilies.body};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[500]};
  white-space: nowrap;

  span {
    color: ${({ theme }) => theme.colors.gray[100]};
  }
`

export const OhlcList = styled.dl`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

export const OhlcItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.375rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.75rem;
  line-height: 1;
  white-space: nowrap;

  &:not(:last-child) {
    margin-right: 1.5rem;
  }

  dt {
    color: ${({ theme }) => theme.colors.gray[100]};
    margin-right: 0.25rem;
  }

  dd {
    color: ${({ theme, value }) =>
      parseFloat(value) < 0 ? theme.colors.red[500] : theme.colors.green[500]};
  }
`

export const BidAskSpreadContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.75rem;
  line-height: 1;
  white-space: nowrap;
  margin-left: 1.75rem;
  margin-bottom: 0.75rem;
`

const BidAskSpreadItem = styled.span`
  color: ${({ theme }) => theme.colors.gray[100]};
  padding: 0.125rem 0.5rem calc(0.125rem + 1px);
  border-radius: 2px;

  &:not(:last-child) {
    margin-right: 0.75rem;
  }
`

export const Bid = styled(BidAskSpreadItem)`
  background-color: ${({ theme }) => theme.colors.green[800]};
`

export const Ask = styled(BidAskSpreadItem)`
  background-color: ${({ theme }) => theme.colors.red[800]};
`

export const Spread = styled(BidAskSpreadItem)`
  background-color: ${({ theme }) => theme.colors.gray[900]};
  padding-left: 0.25rem;
  padding-right: 0.25rem;
`

export const VolumeContainer = styled.dl`
  display: flex;
  align-items: center;
  margin-left: 1.75rem;
`

export const Volume = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.75rem;
  line-height: 1;
  white-space: nowrap;

  dt {
    color: ${({ theme }) => theme.colors.gray[100]};
    margin-right: 0.25rem;
  }

  dd {
    color: ${({ theme }) => theme.colors.gray[100]};
  }
`
