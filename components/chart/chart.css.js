import styled from 'styled-components'

export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray[900]};
`

export const LoadingContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray[900]};
`

export const AreaSeriesChart = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 3.5rem;
  right: 0;
  visibility: ${({ isVisible }) => (isVisible === true ? 'visible' : 'hidden')};
  overflow: hidden;

  @media (min-width: 768px) {
    bottom: 2.75rem;
  }
`

export const CandleStickChart = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 3.5rem;
  right: 0;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  overflow: hidden;

  @media (min-width: 768px) {
    bottom: 2.75rem;
  }
`

export const SettingsContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3.5rem;

  @media (min-width: 768px) {
    height: 2.75rem;
  }
`
