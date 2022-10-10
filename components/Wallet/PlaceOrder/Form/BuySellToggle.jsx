/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
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

import MaterialButton from '@mui/material/Button'
import MaterialButtonGroup from '@mui/material/ButtonGroup'
import { lighten } from 'polished'
import useTranslation from 'next-translate/useTranslation'
import PropType from 'prop-types'

function BuySellToggle(props) {
  const { t } = useTranslation('place-order')
  const { order, onChange, ...rest } = props
  return (
    <MaterialButtonGroup fullWidth variant="contained" {...rest}>
      <MaterialButton
        disableElevation={order.type === 'buy'}
        disableRipple={true}
        variant="contained"
        color="buy"
        fullWidth
        sx={[
          {
            borderTopLeftRadius: 7,
            borderBottomLeftRadius: 7,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          },
          (theme) => ({
            backgroundColor:
              order.type === 'buy'
                ? theme.palette.buy.main
                : lighten(0.05, theme.colors.gray['700']),
            '&:hover': {
              backgroundColor:
                order.type === 'buy'
                  ? lighten(0.05, theme.palette.buy.main)
                  : lighten(0.05, theme.colors.gray['700'])
            }
          })
        ]}
        onClick={onChange}
        name="type"
        value="buy"
      >
        {t('buy')}
      </MaterialButton>
      <MaterialButton
        disableRipple={true}
        disableElevation={order.type === 'sell'}
        variant="contained"
        color="sell"
        fullWidth
        sx={[
          {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: 7,
            borderBottomRightRadius: 7
          },
          (theme) => ({
            backgroundColor:
              order.type === 'sell'
                ? theme.palette.sell.main
                : lighten(0.05, theme.colors.gray['700']),
            '&:hover': {
              backgroundColor:
                order.type === 'sell'
                  ? lighten(0.05, theme.palette.sell.main)
                  : lighten(0.05, theme.colors.gray['700'])
            }
          })
        ]}
        onClick={onChange}
        name="type"
        value="sell"
      >
        {t('sell')}
      </MaterialButton>
    </MaterialButtonGroup>
  )
}
BuySellToggle.propTypes = {
  order: PropType.shape({
    type: PropType.string.isRequired
  }),
  onChange: PropType.func
}
export default BuySellToggle
