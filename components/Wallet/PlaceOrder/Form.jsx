import Tabs from '@/components/Tabs'
import Tab from '@/components/Tab'
import AdvancedOptions from './Form/AdvancedOptions'
import Slider from '@/components/Input/Slider'
import { default as MUIInputAdornment } from '@mui/material/InputAdornment'
import OutlinedInput from '@/components/Input/OutlinedInput'
import { default as MaterialBox } from '@mui/material/Box'
import { default as MaterialButton } from '@mui/material/Button'
import PropTypes from 'prop-types'
import { lighten } from 'polished'
import theme from '../../../theme'
import useTranslation from 'next-translate/useTranslation'
import Typography from '@mui/material/Typography'
import { useAlgodex } from '@algodex/algodex-hooks'
import Spinner from '@/components/Spinner'
import AvailableBalance from './Form/AvailableBalance'
import BuySellToggle from './Form/BuySellToggle'
import usePlaceOrder from '@/components/Wallet/PlaceOrder/usePlaceOrder'
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
  const { wallet } = useAlgodex()
  const { order, handleChange, buttonProps } = usePlaceOrder({ asset })
  const { t } = useTranslation('place-order')
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
          <form onSubmit={onSubmit} autoComplete="off">
            <BuySellToggle order={order} onChange={handleChange} />
            <AvailableBalance wallet={wallet} asset={asset} />
            <Tabs
              sx={{ marginBottom: '16px' }}
              textColor="primary"
              onChange={handleChange}
              aria-label="secondary tabs example"
              value={order.execution === 'market' ? 1 : 0}
            >
              <Tab label={t('limit')} index={0} />
              <Tab label={t('market')} index={1} />
            </Tabs>
            <MaterialBox className="flex flex-col mb-4">
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
                value={order.price}
                onChange={(e) => handleChange(e)}
                startAdornment={
                  <MUIInputAdornment position="start">
                    <span className="text-sm font-bold text-gray-500">{t('price')}</span>
                  </MUIInputAdornment>
                }
                endAdornment={
                  <MUIInputAdornment position="end">
                    <span className="text-sm font-bold text-gray-500">ALGO</span>
                  </MUIInputAdornment>
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
                  <MUIInputAdornment position="start">
                    <span className="text-sm font-bold text-gray-500">{t('amount')}</span>
                  </MUIInputAdornment>
                }
                endAdornment={
                  <MUIInputAdornment position="end">
                    <span className="text-sm font-bold text-gray-500">{asset.name}</span>
                  </MUIInputAdornment>
                }
              />
              <Slider
                sx={{
                  margin: '0px 0.5rem',
                  width: '95%'
                }}
                // txnFee={txnFee}
                onChange={(e) => handleChange(e)}
                name="amount"
                value={order.amount}
                marks={true}
                step={10}
                min={0}
                max={100}
              />
              <OutlinedInput
                id="total"
                name="total"
                type="text"
                value={order.amount * order.price}
                readOnly
                disabled
                startAdornment={
                  <MUIInputAdornment position="start">
                    <span className="text-sm font-bold text-gray-500">{t('total')}</span>
                  </MUIInputAdornment>
                }
                endAdornment={
                  <MUIInputAdornment position="end">
                    <span className="text-sm font-bold text-gray-500">ALGO</span>
                  </MUIInputAdornment>
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
                // onChange={handleOptionsChange}
                allowTaker={typeof asset !== 'undefined'}
              />
            </MaterialBox>
            {/*)}*/}
            <MaterialButton
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
            </MaterialButton>
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
    Box: MaterialBox
  }
}
export default PlaceOrderForm
