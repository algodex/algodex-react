/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Button from 'components/Button'
import { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import { lighten } from 'polished'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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

const ToggleBtn2 = styled(ToggleButton)`
  font-size: 0.75rem;
  padding: 0 1.5rem;
  color: white;
  border-radius: 4px;
  &.Mui-selected {
    color: white;
    background-color: ${({ theme }) => lighten(0.05, theme.palette.gray['700'])};
    &:hover {
      background-color: ${({ theme }) => lighten(0.05, theme.palette.gray['700'])};
    };
  };
  &:hover {
    background-color: ${({ theme }) => lighten(0.05, theme.palette.gray['900'])};
  };

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
  const { mode, onChange, interval } = props
  const { t } = useTranslation('chart')

  const renderTimeIntervals = useCallback(() => {
    // @todo: should be handled in view and passed as props when supported
    return ['1m', '5m', '15m', '1h', '4h', '1d'].map((i) => (
      <ToggleBtn2 key={i} name="interval" value={i} aria-label={i}>
        {i}
      </ToggleBtn2>
    ))
  }, [])

  return (
    <Container>
      <ToggleButtonGroup exclusive="true" value={mode} onChange={onChange}>
        <ToggleBtn2 key="candle" name="mode" value="candle" aria-label="candle">Candle</ToggleBtn2>
        <ToggleBtn2 key="area" name="mode" value="area" aria-label="area">Area</ToggleBtn2>
      </ToggleButtonGroup>
      <ToggleButtonGroup sx={{'marginLeft': '10px'}}
        exclusive="true" value={interval} onChange={onChange}>
        {renderTimeIntervals()}
      </ToggleButtonGroup>
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
