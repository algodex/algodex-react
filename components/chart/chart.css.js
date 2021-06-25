import styled from 'styled-components'
import { ChevronDown } from 'react-feather'
import { TrendingUp, StatsChart } from 'react-ionicons'

export const Container = styled.div`
  flex: 1 1 0%;
  position: relative;
  display: none;

  @media (min-width: 767px) {
    display: flex;
  }
`
export const LoadingContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray[900]};
`

export const ChartLabel = styled.div`
  position: absolute;
  left: 1.75rem;
  z-index: 99;
`

export const AssetName = styled.div`
  display: flex;
  margin-right: 1rem;
`

export const Price = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 3rem;
  left: -1rem;
  height: auto;
  font-size: 0.7rem;

  @media (min-width: 768px) {
    top: 3rem;
    left: -1.25rem;
  }

  @media (min-width: 1344px) {
    top: 3rem;
    left: -0.5rem;
  }

  @media (min-width: 1920px) {
    top: 3rem;
    left: 0;
  }
`
const bidAskStyles = `
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

export const VolumeContainer = styled.div`
  position: absolute;
  top: 4.5rem;
  left: -0.9rem;
  display: flex;

  @media (min-width: 768px) {
    top: 4.75rem;
    left: -1.2rem;
  }

  @media (min-width: 1344px) {
    top: 4.75rem;
    left: -0.5rem;
  }

  @media (min-width: 1920px) {
    top: 4.9rem;
    left: 0;
  }
`

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  z-index: 99;

  @media (min-width: 768px) {
    top: 1.25rem;
    left: -1.25rem;
  }

  @media (min-width: 1344px) {
    top: 1rem;
    left: -0.5rem;
  }

  @media (min-width: 1920px) {
    top: 1rem;
    left: 0rem;
  }
`

export const DailyChange = styled.div`
  color: ${({ theme, dailyChange }) =>
    dailyChange > 0 ? theme.colors.green[500] : theme.colors.red[500]};
`
export const IntervalWrapper = styled.div`
  position: relative;
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

export const IntervalSelector = styled.select`
  color: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  background: none;
  ${chartButtonStyles}
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 3.75rem;
  height: 1.75rem;
  font-size: 0.7rem;
  font-weight: 700;
  margin-left: 0;
`

export const OHLC = styled.div`
  display: flex;
  top: -1.25rem;
  left: -0.2rem;
  align-items: flex-end;
  margin-bottom: 0.1rem;
  position: absolute;

  @media (min-width: 768px) {
    top: -1.25rem;
    left: -0.2rem;
  }

  @media (min-width: 1344px) {
    top: 0;
    left: 0;
    margin-left: 1rem;
    position: relative;
    margin-bottom: 0;
  }

  @media (min-width: 1920px) {
    top: 0rem;
    left: 0rem;
  }
`

const ohlcStyles = `
display: flex;
  align-items: flex-end;
  margin-right: .5rem;
`

export const Open = styled.div`
  ${ohlcStyles}
`
export const High = styled.div`
  ${ohlcStyles}
`
export const Low = styled.div`
  ${ohlcStyles}
`
export const Close = styled.div`
  ${ohlcStyles}
`
export const AssetLabelContainer = styled.div`
  display: flex;
  align-items: flex-end;
`
export const Interval = styled.option``

export const Chevron = styled(ChevronDown)`
  position: absolute;
  color: ${({ theme }) => theme.colors.gray[100]};
  top: 0.1rem;
  right: 0.35rem;
  width: 1rem;
  pointer-events: none;
`
export const ChartModeButton = styled.button`
  background: none;
  ${chartButtonStyles}
  color: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  padding: 0.3rem;
  margin-left: 0.5rem;
  transition: background-color 0.1s ease-in;

  & > span {
    height: 16px;
  }
`

export const TrendingUpIcon = styled(TrendingUp)``

export const StatsChartIcon = styled(StatsChart)``

export const AreaSeriesChart = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  visibility: ${({ isVisible }) => (isVisible === true ? 'visible' : 'hidden')};
`
export const CandleStickChart = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`
export const ChartOptions = styled.div`
  display: flex;
  position: absolute;
  top: 7.5rem;
  left: -1.25rem;

  @media (min-width: 768px) {
    top: 6.15rem;
    left: -1.25rem;
  }

  @media (min-width: 1024px) {
    top: 6.25rem;
    left: -0.5rem;
  }

  @media (min-width: 1536px) {
    top: 6.5rem;
    left: 0;
  }
`
