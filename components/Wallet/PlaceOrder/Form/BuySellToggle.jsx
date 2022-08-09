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
