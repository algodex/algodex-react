import { useCallback, useMemo, useState } from 'react'

import AdvancedOptions from './Form/AdvancedOptions'
import AvailableBalance from './Form/AvailableBalance'
import { ButtonGroup } from '@mui/material'
import { default as MUIInputAdornment } from '@mui/material/InputAdornment'
import { default as MaterialBox } from '@mui/material/Box'
import { default as MaterialButton } from '@mui/material/Button'
import OrderForm from './OrderForm'
import OutlinedInput from '@/components/Input/OutlinedInput'
import PropTypes from 'prop-types'
import Slider from '@/components/Input/Slider'
import Spinner from '@/components/Spinner'
import Tab from '@/components/Tab'
import Tabs from '@/components/Tabs'
import Typography from '@mui/material/Typography'
import { lighten } from 'polished'
import theme from '../../../theme'
import { useAlgodex } from '@algodex/algodex-hooks'
import useTranslation from 'next-translate/useTranslation'

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
  const { isConnected, wallet } = useAlgodex()
  const [order, setOrder] = useState({
    type: 'buy',
    price: 0,
    amount: 0,
    total: 0,
    execution: 'both'
  })
  const [tabSwitch, setTabSwitch] = useState(order.execution === 'market' ? 1 : 0)
  const { t } = useTranslation('place-order')

  const buttonProps = useMemo(
    () => ({
      buy: { variant: 'primary', text: `${t('buy')} ${asset.name || asset.id}` },
      sell: { variant: 'danger', text: `${t('sell')} ${asset.name || asset.id}` }
    }),
    [asset]
  )
  // const getMaxAmount = useCallback(() => {
  //   if (order.type === 'sell') {
  //     return wallet.assets[asset.id].balance || 0
  //   }
  //   if (order.type === 'buy') {
  //     return wallet.amount || 0
  //   }
  // }, [wallet, asset])

  const fixPrecision = useCallback(
    (e, key) => {
      const value = e.target.value
      switch (key) {
        case 'price':
          return parseFloat(value).toFixed(6)
        case 'amount':
          return parseFloat(value).toFixed(asset.decimals)
        case 'total':
          return parseFloat(value).toFixed(asset.decimals)
        default:
          return value
      }
    },
    [order]
  )

  const handleChange = useCallback(
    (e, field) => {
      const key = field || e.target.name
      if (typeof key === 'undefined') {
        throw new Error('Must have valid key!')
      }
      if (order[key] !== e.target.value) {
        setOrder({
          ...order,
          [key]: fixPrecision(e, key)
        })
      }
    },
    [setOrder, order]
  )

  // const orderSliderSteps = useMemo(() => {
  //   const difference = asset.decimals - 6
  //   const lowestStep = 0.00001
  //
  //   if (difference > 0) {
  //     return lowestStep * (difference * 10)
  //   } else {
  //     return wallet.amount/50
  //   }
  //
  // }, [asset, wallet])
  //
  // const orderSliderMax = useMemo(() => {
  //   return typeof wallet?.amount !== 'undefined' ? fromBaseUnits(wallet.amount) : 0
  // }, [wallet, asset, orderSliderSteps])

  if (typeof wallet === 'undefined' || typeof wallet.amount === 'undefined') {
    return <Spinner />
  }
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
          <Typography variant="subtitle_medium_cap" color="gray.500" mb={1}>
            {t('place-order')}
          </Typography>
        </header>
      )}
      {typeof order !== 'undefined' && isConnected && (
        <form onSubmit={onSubmit} autoComplete="off">
          <ButtonGroup fullWidth variant="contained" className="mb-6">
            <MaterialButton
              disableElevation={order.type === 'buy'}
              disableRipple={true}
              variant={order.type === 'buy' ? 'primary' : 'default'}
              color="buy"
              fullWidth
              onClick={handleChange}
              name="type"
              value="buy"
            >
              {t('buy')}
            </MaterialButton>
            <MaterialButton
              disableRipple={true}
              disableElevation={order.type === 'sell'}
              variant={order.type === 'sell' ? 'sell' : 'default'}
              color="sell"
              fullWidth
              onClick={handleChange}
              name="type"
              value="sell"
            >
              {t('sell')}
            </MaterialButton>
          </ButtonGroup>
          <AvailableBalance wallet={wallet} asset={asset} />
          {/*<AvailableBalance>*/}
          {/*  <IconTextContainer style={{ marginBottom: '10px' }}>*/}
          {/*    <Typography variant="bodyCopyTiny" color="gray.500">*/}
          {/*      {t('available-balance')}*/}
          {/*    </Typography>*/}
          {/*    <Tooltip*/}
          {/*      renderButton={(setTriggerRef) => (*/}
          {/*        <IconButton ref={setTriggerRef} type="button">*/}
          {/*          <Info />*/}
          {/*        </IconButton>*/}
          {/*      )}*/}
          {/*    >*/}
          {/*      <section className="flex items-center justify-between mb-1">*/}
          {/*        <Typography variant="labelMdSpaced" color="gray.300">*/}
          {/*          {t('orders:available')}:*/}
          {/*        </Typography>*/}
          {/*        <IconTextContainer>*/}
          {/*          <Typography variant="labelMdSpaced" color="gray.300">*/}
          {/*            {fromBaseUnits(wallet.amount)}*/}
          {/*          </Typography>*/}
          {/*          <Icon use="algoLogo" size={0.625} />*/}
          {/*        </IconTextContainer>*/}
          {/*      </section>*/}
          {/*      <BalanceRow>*/}
          {/*        <Typography variant="labelMdSpaced" color="gray.300">*/}
          {/*          {t('total')}:*/}
          {/*        </Typography>*/}
          {/*        <IconTextContainer>*/}
          {/*          <Typography variant="labelMdSpaced" color="gray.300">*/}
          {/*            {fromBaseUnits(wallet.amount)}*/}
          {/*          </Typography>*/}
          {/*          <Icon use="algoLogo" size={0.625} />*/}
          {/*        </IconTextContainer>*/}
          {/*      </BalanceRow>*/}
          {/*      <BalanceRow>*/}
          {/*        <Typography*/}
          {/*          variant="labelSmForm"*/}
          {/*          component="span"*/}
          {/*          color="gray.300"*/}
          {/*          textTransform="initial"*/}
          {/*        >*/}
          {/*          &nbsp;**/}
          {/*          {t('max-spend-explanation', {*/}
          {/*            // amount: new Big(wallet.amount).minus(new Big(wallet.amount)).round(6).toString()*/}
          {/*          })}*/}
          {/*        </Typography>*/}
          {/*      </BalanceRow>*/}
          {/*    </Tooltip>*/}
          {/*  </IconTextContainer>*/}
          {/*  <BalanceRow>*/}
          {/*    <Typography variant="labelMdLight" color="gray.400">*/}
          {/*      ALGO*/}
          {/*    </Typography>*/}
          {/*    <Typography variant="labelMdLight" color="gray.300">*/}
          {/*      {fromBaseUnits(wallet.amount)}*/}
          {/*    </Typography>*/}
          {/*  </BalanceRow>*/}
          {/*  <BalanceRow>*/}
          {/*    <Typography variant="labelMdLight" color="gray.400">*/}
          {/*      <input style={{ display: 'none' }} disabled={true} name="asset" value={asset.id} />*/}
          {/*      {asset.name || asset.id}*/}
          {/*    </Typography>*/}
          {/*    <Typography variant="labelMdLight" color="gray.300">*/}
          {/*      /!*{hasBalance && wallet?.assets[asset.id]?.balance}*!/*/}
          {/*    </Typography>*/}
          {/*  </BalanceRow>*/}
          {/*</AvailableBalance>*/}

          {/*<TabsUnstyled sx={{ width: '100%' }} >*/}
          <Tabs
            sx={{ marginBottom: '16px' }}
            textColor="primary"
            onChange={(e, value) => {
              setTabSwitch(value)
            }}
            aria-label=""
            value={tabSwitch}
          >
            <Tab label={t('limit')} />
            <Tab label={t('market')} />
          </Tabs>
          {/*</TabsUnstyled>*/}
          {/*{!hasBalance && (*/}
          {/*  <Typography variant="bodyCopy" color="gray.500" textAlign="center" m={32}>*/}
          {/*    {t('insufficient-balance')}*/}
          {/*  </Typography>*/}
          {/*)}*/}
          {/*{hasBalance && (*/}

          {/*)}*/}
          <OrderForm handleChange={handleChange} order={order} asset={asset} />
          <MaterialButton
            type="submit"
            variant="primary"
            fullWidth
            color={order.type}
            disabled={order.valid}
          >
            {buttonProps[order.type || 'buy']?.text}
          </MaterialButton>
        </form>
      )}
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
