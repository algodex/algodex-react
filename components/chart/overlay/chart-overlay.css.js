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
  margin-right: 1.5em;
  margin-bottom: 0.375em;
  font-family: ${({ theme }) => theme.fontFamilies.body};
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[500]};
  white-space: nowrap;

  span {
    color: ${({ theme }) => theme.colors.gray[100]};
  }

  display: flex;
  align-items: center;

  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`

export const IconButton = styled.button`
  cursor: pointer;
  pointer-events: all;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.gray[100]};
  margin-left: 0.125rem;
  padding: 0;

  svg {
    height: 16px;
    position: relative;
    left: -2px;
    top: -5px;
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
  margin-bottom: 0.5em;
  font-family: ${({ theme }) => theme.fontFamilies.monospace};
  font-size: 0.6875rem;
  line-height: 1;
  white-space: nowrap;

  &:not(:last-child) {
    margin-right: 2em;
  }

  dt {
    color: ${({ theme }) => theme.colors.gray[100]};
    margin-right: 0.375em;
  }

  dd {
    color: ${({ theme, value }) =>
      parseFloat(value) < 0 ? theme.colors.red[500] : theme.colors.green[500]};
  }

  @media (min-width: 1024px) {
    font-size: 0.75rem;
  }
`

export const BidAskSpreadContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fontFamilies.monospace};
  font-size: 0.6875rem;
  line-height: 1;
  white-space: nowrap;
  margin-left: 1.75rem;
  margin-bottom: 0.875em;

  @media (min-width: 1024px) {
    font-size: 0.75rem;
  }
`

const BidAskSpreadItem = styled.span`
  color: ${({ theme }) => theme.colors.gray[100]};
  padding: 0.25em 0.625em;
  border-radius: 2px;

  &:not(:last-child) {
    margin-right: 1em;
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
  padding-left: 0.375em;
  padding-right: 0.375em;
`

export const VolumeContainer = styled.dl`
  display: flex;
  align-items: center;
  margin-left: 1.75rem;
`

export const Volume = styled.div`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fontFamilies.monospace};
  font-size: 0.6875rem;
  line-height: 1;
  white-space: nowrap;

  dt {
    color: ${({ theme }) => theme.colors.gray[100]};
    margin-right: 0.375em;
  }

  dd {
    color: ${({ theme }) => theme.colors.gray[100]};
  }

  @media (min-width: 1024px) {
    font-size: 0.75rem;
  }
`
