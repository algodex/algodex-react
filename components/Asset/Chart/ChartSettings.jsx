import React from 'react'
import PropTypes from 'prop-types'
import useStore, { getChartTimeInterval } from 'store/use-store'
import { Container, ToggleWrapper, ToggleInput, ToggleBtn } from './chart-settings.css'
import useTranslation from 'next-translate/useTranslation'
import styled from "styled-components";
import Button from "../../../Button";
import {lighten} from "polished";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1.75rem;
  flex-direction: column;

  @media (orientation: landscape) {
    flex-direction: row;
  }

  @media (min-width: 996px) {
    flex-direction: row;
    height: 2.75rem;
  }
`

export const ToggleWrapper = styled.div`
  display: flex;
  // margin-bottom: 1.5rem;

  &:not(:last-child) {
    margin-right: 2rem;
  }
`

export const ToggleInput = styled.input`
  opacity: 0;
  position: absolute;
`

// @todo: Fix Button component `size` prop instead of using custom styles
export const ToggleBtn = styled(Button)`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  background-color: ${({ theme }) => theme.colors.gray['900']};
  label {
    cursor: pointer;
    width: 100%;
  }
  &:hover {
    background-color: ${({ theme }) => lighten(0.05, theme.colors.gray['900'])};
  }

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  && {
    ${ToggleInput}:checked + & {
      background-color: ${({ theme }) => theme.colors.gray['700']};
    }

    ${ToggleInput}:checked + &:hover {
      background-color: ${({ theme }) => lighten(0.05, theme.colors.gray['700'])};
    }

    ${ToggleInput}:focus + & {
      z-index: 1;
      border-radius: 3px;
      box-shadow: 0 0 0 0.2rem #4b9064;
    }

    ${ToggleInput}:disabled + & {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    && {
      ${ToggleInput}:disabled + & {
        display: flex;
        opacity: 0.3;
        pointer-events: none;
      }
    }
  }
`

function ChartSettings(props) {
  const { chartMode, onChartModeClick } = props
  const { t } = useTranslation('chart')
  const chartTime = useStore((state) => getChartTimeInterval(state))
  const onChartTimeClick = useStore((state) => state.setChartTimeInterval)

  const handleModeClick = (e) => {
    onChartModeClick(e.target.value)
  }

  const handleTimeClick = (e) => {
    onChartTimeClick(e.target.value)
  }

  const renderTimeIntervals = () => {
    // @todo: should be handled in view and passed as props when supported
    return ['1m', '5m', '15m', '1h', '4h', '1d'].map((i) => (
      <React.Fragment key={i}>
        <ToggleInput
          type="radio"
          id={`time-${i}`}
          value={i}
          checked={i === chartTime}
          onChange={handleTimeClick}
        />
        <ToggleBtn size="small">
          <label htmlFor={`time-${i}`}>{i}</label>
        </ToggleBtn>
      </React.Fragment>
    ))
  }

  return (
    <Container>
      <ToggleWrapper>
        <ToggleInput
          type="radio"
          id="mode-candle"
          value="candle"
          checked={chartMode === 'candle'}
          onChange={handleModeClick}
        />
        <ToggleBtn size="small">
          <label htmlFor="mode-candle">{t('candle')}</label>
        </ToggleBtn>
        <ToggleInput
          type="radio"
          id="mode-area"
          value="area"
          checked={chartMode === 'area'}
          onChange={handleModeClick}
        />
        <ToggleBtn size="small">
          <label htmlFor="mode-area">{t('area')}</label>
        </ToggleBtn>
      </ToggleWrapper>
      <ToggleWrapper>{renderTimeIntervals()}</ToggleWrapper>
    </Container>
  )
}

ChartSettings.propTypes = {
  chartMode: PropTypes.string,
  chartTime: PropTypes.string,
  onChartModeClick: PropTypes.func,
  onChartTimeClick: PropTypes.func
}

export default ChartSettings
