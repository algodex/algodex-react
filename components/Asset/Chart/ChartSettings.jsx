import Button from 'components/Button'
import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { lighten } from 'polished'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1.75rem;
  flex-direction: column;

  @media (orientation: landscape) {
    flex-direction: row;
  }

  @media (max-width: 996px) {
    padding-bottom: 0.5rem;
  }

  @media (min-width: 996px) {
    flex-direction: row;
    height: 2.75rem;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  // margin-bottom: 1.5rem;

  &:not(:last-child) {
    margin-right: 2rem;
  }
`

const ToggleInput = styled.input`
  opacity: 0;
  position: absolute;
`

const ToggleBtn = styled(Button)`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  background-color: ${({ theme }) => theme.palette.gray['900']};
  label {
    cursor: pointer;
    width: 100%;
  }
  &:hover {
    background-color: ${({ theme }) => lighten(0.05, theme.palette.gray['900'])};
  }

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  && {
    ${ToggleInput}:checked + & {
      background-color: ${({ theme }) => theme.palette.gray['700']};
    }

    ${ToggleInput}:checked + &:hover {
      background-color: ${({ theme }) => lighten(0.05, theme.palette.gray['700'])};
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

/**
 * Chart Settings
 *
 * @param {Object} props Component Properties
 * @param {String} props.mode Chart mode, Area or Candlestick
 * @param {String} props.chartInterval Interval for Chart Data
 * @param {Function} props.onChange Fired when an item changes
 * @param {Function} props.onClick Fired when an item is clicked
 * @returns {JSX.Element}
 * @constructor
 */
function ChartSettings(props) {
  // console.log(`ChartSettings(`, arguments[0], `)`)
  const { mode, onChange, interval } = props
  const { t } = useTranslation('chart')

  const renderTimeIntervals = () => {
    // @todo: should be handled in view and passed as props when supported
    return ['1m', '5m', '15m', '1h', '4h', '1d'].map((i) => (
      <Fragment key={i}>
        <ToggleInput
          type="radio"
          name="interval"
          id={`time-${i}`}
          value={i}
          checked={i === interval}
          onChange={onChange}
        />
        <ToggleBtn size="small">
          <label htmlFor={`time-${i}`}>{i}</label>
        </ToggleBtn>
      </Fragment>
    ))
  }

  return (
    <Container>
      <ToggleWrapper>
        <ToggleInput
          type="radio"
          name="mode"
          id="mode-candle"
          value="candle"
          checked={mode === 'candle'}
          onChange={onChange}
        />
        <ToggleBtn size="small">
          <label htmlFor="mode-candle">{t('candle')}</label>
        </ToggleBtn>
        <ToggleInput
          type="radio"
          name="mode"
          id="mode-area"
          value="area"
          checked={mode === 'area'}
          onChange={onChange}
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
  mode: PropTypes.string.isRequired,
  interval: PropTypes.string.isRequired,
  onChange: PropTypes.func
}
// ChartSettings.defaultProps = {
//   onChange: (e) => console.info(`${e.target.id} changed to ${e.target.value}!`)
// }
export default ChartSettings
