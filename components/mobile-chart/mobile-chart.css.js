import styled from 'styled-components'
import { TrendingUp, StatsChart } from 'react-ionicons'

export const TrendingUpIcon = styled(TrendingUp)``

export const StatsChartIcon = styled(StatsChart)``

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 11fr;
  flex: 1 1 0%;
  width: 100%;
  height: 100%;

  @media (min-width: 767px) {
    display: none;
  }
`

export const AssetSearchPlaceholder = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 4fr 3fr 3fr;
  padding: 0.75rem 1rem 1.25rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[700]};
`

export const ChartWrapper = styled.div`
  flex: 1 1 0%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const TradingPair = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  font-weight: 600;
  font-size: 1.2rem;
  align-items: flex-end;

  & span:first-child {
    color: ${({ theme }) => theme.colors.gray[100]};
  }

  & span:nth-child(2) {
    color: ${({ theme }) => theme.colors.gray[500]};
  }
`

export const DailyChange = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-end;
  color: ${({ theme, isPositive }) =>
    isPositive ? theme.colors.green[500] : theme.colors.red[500]};
`

export const PriceContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
  justify-content: flex-end;
`
export const Price = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray['100']};
  margin-left: 0.25rem;
`
export const AssetInfo = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0.5rem;
  left: 0.5rem;
  width: 70%;
  z-index: 10;
`
export const OHLC = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
export const InfoPair = styled.div`
  display: flex;
`
const chartButtonStyles = `
cursor: pointer;
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  letter-spacing: 0.1rem;
  font-weight: 500;
`

export const ChartModeButton = styled.button`
  background: none;
  ${chartButtonStyles}
  color: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  padding: 0.3rem;
  margin: 0.5rem 0 0 0;
  transition: background-color 0.1s ease-in;
  width: 1.75rem;
  & > span {
    height: 16px;
  }
`
export const CandleStickChart = styled.div`
  flex: 1 1 0%;
  width: 100%;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  height: 100%;
`
export const AreaSeriesChart = styled.div`
  flex: 1 1 0%;
  width: 100%;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  height: 100%;
`
export const Volume = styled.div`
  display: flex;
  margin-top: 0.5rem;
`
export const CurrentPrice = styled.div`
  display: flex;
  margin-top: 0.5rem;
`

const bidAskStyles = `
font-size: .6rem;
width: 4rem;
display: flex;
justify-content: center;
align-items: center;
`

export const Bid = styled.span`
  padding: 0.2rem 0.75rem;
  line-height: 1.25;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.green['500']};
  color: ${({ theme }) => theme.colors.green['500']};
  ${bidAskStyles}
`

export const Ask = styled.span`
  padding: 0.2rem 0.75rem;
  line-height: 1.25;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.red['500']};
  color: ${({ theme }) => theme.colors.red['500']};
  ${bidAskStyles}
`

export const Spread = styled.span`
  padding: 0.1rem 0.75rem;
  color: ${({ theme }) => theme.colors.gray['100']};
  ${bidAskStyles}
`
