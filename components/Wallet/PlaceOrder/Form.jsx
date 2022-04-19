import AdvancedOptions from './Form/AdvancedOptions'
import Slider from '@/components/Input/Slider'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@/components/Input/OutlinedInput'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import { lighten } from 'polished'
import theme from '../../../theme'
import useTranslation from 'next-translate/useTranslation'
import Typography from '@mui/material/Typography'
import Spinner from '@/components/Spinner'
import AvailableBalance from './Form/AvailableBalance'
import BuySellToggle from './Form/BuySellToggle'
import ExecutionToggle from '@/components/Wallet/PlaceOrder/Form/ExecutionToggle'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAlgodex } from '@algodex/algodex-hooks'

// function _minDecimalValue(decimals) {
//   if (typeof decimals !== 'number') {
//     throw new Error('Must be a valid decimals!')
//   }
//   return parseFloat(`0.${new Array(decimals).join('0')}1`)
// }
/**
 * # 📝 Place Order Form
 *
 * Data for submitting an Order to the Algorand Network
 * onSubmit returns the event with the target values.
 *
 *       amount: e.target.amount.value,
 *       type: e.target.type.value,
 *       price: e.target.price.value,
 *       total: e.target.total.value,
 *       asset: e.target.asset.value
 *
 * @param showTitle
 * @param asset
 * @param wallet
 * @param onSubmit
 * @returns {JSX.Element}
 * @constructor
 */
export function PlaceOrderForm({ showTitle = true, asset, onSubmit, components: { Box } }) {
  // console.log(`PlaceOrderForm(`, arguments[0], `)`)
  const { t } = useTranslation('place-order')
  const { wallet, placeOrder } = useAlgodex()
  const buttonProps = useMemo(
    () => ({
      buy: { variant: 'primary', text: `${t('buy')} ${asset.name || asset.id}` },
      sell: { variant: 'danger', text: `${t('sell')} ${asset.name || asset.id}` }
    }),
    [asset]
  )
  // const [steps, setSteps] = useState(0.000001)
  const [order, setOrder] = useState({
    type: 'buy',
    price: 0,
    amount: 0,
    total: 0,
    execution: 'both'
  })
  const [sliderPercent, setSliderPercent] = useState(0)
  useEffect(() => {
    const _amount = wallet.amount * (sliderPercent / 100)
    if (order.amount !== _amount.toFixed(asset.decimals)) {
      setOrder({
        ...order,
        amount: _amount.toFixed(asset.decimals)
      })
    }
  }, [order, asset, sliderPercent])
  const handleChange = useCallback(
    (e, _key, _value) => {
      const key = _key || e.target.name
      const value = _value || e.target.value
      if (typeof key === 'undefined') {
        throw new Error('Must have valid key!')
      }
      if (typeof value === 'undefined') {
        throw new Error('Must have a valid value!')
      }
      if (order[key] !== value) {
        setOrder({
          ...order,
          [key]: value
        })
      }
    },
    [setOrder, order]
  )
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (typeof onSubmit === 'function') {
        onSubmit({
          ...order,
          wallet,
          asset
        })
      } else {
        placeOrder({
          ...order,
          wallet,
          asset
        })
      }
    },
    [onSubmit, asset, order]
  )
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.25rem'
      }}
      data-testid="place-order"
    >
      {showTitle && (
        <header className="pb-5">
          <Typography variant="headerCaps" color="gray.500" mb={1}>
            {t('place-order')}
          </Typography>
        </header>
      )}
      {typeof wallet === 'undefined' ||
        (typeof wallet.amount === 'undefined' ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit} autoComplete="off">
            <BuySellToggle order={order} onChange={handleChange} />
            <AvailableBalance wallet={wallet} asset={asset} />
            <ExecutionToggle onChange={handleChange} order={order} />
            <Box className="flex flex-col mb-4">
              <OutlinedInput
                sx={{
                  backgroundColor: theme.palette.gray['900'],
                  border: 2,
                  borderColor: theme.palette.gray['700'],
                  marginBottom: '1rem'
                }}
                inputProps={{
                  name: 'price',
                  type: 'number',
                  // pattern: 'd*',
                  autocomplete: false,
                  min: 0,
                  step: 0.000001,
                  inputMode: 'decimal'
                }}
                name="price"
                type="number"
                pattern="\d*"
                disabled={order.execution === 'market'}
                value={order.execution === 'market' ? 123 : order.price}
                onChange={(e) => handleChange(e)}
                startAdornment={
                  <InputAdornment position="start">
                    <span className="text-sm font-bold text-gray-500">{t('price')}</span>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <span className="text-sm font-bold text-gray-500">ALGO</span>
                  </InputAdornment>
                }
              />
              <OutlinedInput
                id="amount"
                type="number"
                pattern="\d*"
                name="amount"
                sx={{
                  backgroundColor: theme.colors.gray['900'],
                  border: 2,
                  borderColor: theme.colors.gray['700'],
                  marginBottom: '1rem'
                }}
                value={order.amount}
                onChange={handleChange}
                autocomplete="false"
                min="0"
                // step={new Big(10).pow(-1 * asset.decimals).toString()}
                inputMode="decimal"
                startAdornment={
                  <InputAdornment position="start">
                    <span className="text-sm font-bold text-gray-500">{t('amount')}</span>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <span className="text-sm font-bold text-gray-500">{asset.name}</span>
                  </InputAdornment>
                }
              />
              <Slider
                sx={{
                  margin: '0px 0.5rem',
                  width: '95%'
                }}
                defaultValue={0.0}
                // txnFee={txnFee}
                onChange={(e, value) => setSliderPercent(value)}
                name="amount"
                value={sliderPercent}
                step={0.000001}
                min={0.0}
                max={100.0}
              />
              <OutlinedInput
                id="total"
                name="total"
                type="text"
                value={order.amount * order.price}
                readOnly
                disabled
                startAdornment={
                  <InputAdornment position="start">
                    <span className="text-sm font-bold text-gray-500">{t('total')}</span>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <span className="text-sm font-bold text-gray-500">ALGO</span>
                  </InputAdornment>
                }
              />
              {/* <TxnFeeContainer>
                <Typography color="gray.500" textTransform="none">
                  Algorand transaction fees: <Icon use="algoLogo" color="gray.500" size={0.5} />{' '}
                  {txnFee.toFixed(3)}
                </Typography>
              </TxnFeeContainer> */}
              <AdvancedOptions
                order={order}
                onChange={handleChange}
                allowTaker={typeof asset !== 'undefined'}
              />
            </Box>
            {/*)}*/}
            <Button
              type="submit"
              variant="contained"
              color={order.type}
              sx={{
                backgroundColor: order.type === 'sell' ? '#b23639' : '#4b9064',
                '&:hover': {
                  backgroundColor:
                    order.type === 'sell' ? lighten(0.05, '#b23639') : lighten(0.05, '#4b9064')
                }
              }}
              disabled={order.valid}
            >
              {buttonProps[order.type || 'buy']?.text}
            </Button>
          </form>
        ))}
    </Box>
  )
}

PlaceOrderForm.propTypes = {
  /**
   * Display the Title for the Form
   */
  showTitle: PropTypes.bool,
  /**
   * Asset for the Order
   */
  components: PropTypes.object,
  asset: PropTypes.shape({
    id: PropTypes.number.isRequired,
    decimals: PropTypes.number.isRequired,
    name: PropTypes.string
  }).isRequired,
  /**
   * Wallet to execute Orders from
   */
  wallet: PropTypes.shape({
    amount: PropTypes.number,
    assets: PropTypes.arrayOf(PropTypes.shape({ amount: PropTypes.number })),
    connector: PropTypes.object
  }),
  /**
   * Submit Handler
   */
  onSubmit: PropTypes.func
}
PlaceOrderForm.defaultProps = {
  showTitle: true,
  components: {
    Box
  }
}
export default PlaceOrderForm
