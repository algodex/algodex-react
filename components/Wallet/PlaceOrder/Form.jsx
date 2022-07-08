import AdvancedOptions from './Form/AdvancedOptions'
import Slider from '@/components/Input/Slider'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@/components/Input/OutlinedInput'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import { lighten, darken } from 'polished'
import theme from '../../../theme'
import useTranslation from 'next-translate/useTranslation'
import Typography from '@mui/material/Typography'
import Spinner from '@/components/Spinner'
import AvailableBalance from './Form/AvailableBalance'
import BuySellToggle from './Form/BuySellToggle'
import ExecutionToggle from '@/components/Wallet/PlaceOrder/Form/ExecutionToggle'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAlgodex, useAssetOrdersQuery } from '@algodex/algodex-hooks'
import useWallets from '@/hooks/useWallets'
import fromBaseUnits from '@algodex/algodex-sdk/lib/utils/units/fromBaseUnits'
import detectMobileDisplay from '@/utils/detectMobileDisplay'
import toast from 'react-hot-toast'
import { useEvent } from 'hooks/useEvents'

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
  const { t } = useTranslation('place-order')

  const { wallet: initialState, placeOrder, http } = useAlgodex()
  const { wallet } = useWallets(initialState)

  if (typeof wallet?.address === 'undefined') {
    throw new TypeError('Invalid Wallet!')
  }
  // TODO: Handle empty asset wallets
  // if (typeof wallet?.assets === 'undefined') {
  //   throw new TypeError('Invalid Account Info!')
  // }

  const { data: assetOrders, isLoading, isError } = useAssetOrdersQuery({ asset })

  const orderBook = useMemo(
    () => ({
      buyOrders: assetOrders?.buyASAOrdersInEscrow || [],
      sellOrders: assetOrders?.sellASAOrdersInEscrow || []
    }),
    [assetOrders]
  )
  const [sellOrders, setSellOrders] = useState()
  const [buyOrders, setBuyOrders] = useState()
  // Eslint bypass to keep rest of code available
  if (typeof sellOrders !== 'undefined' && sellOrders?.length === -1) {
    console.debug(sellOrders?.length, buyOrders?.length)
  }
  useEffect(() => {
    setSellOrders(http.dexd.aggregateOrders(orderBook.sellOrders, asset.decimals, 'sell'))
    setBuyOrders(http.dexd.aggregateOrders(orderBook.buyOrders, asset.decimals, 'buy'))
  }, [orderBook, setSellOrders, setBuyOrders, asset])

  const buttonProps = useMemo(
    () => ({
      buy: { variant: 'primary', text: `${t('buy')} ${asset.name || asset.id}` },
      sell: { variant: 'danger', text: `${t('sell')} ${asset.name || asset.id}` }
    }),
    [asset]
  )

  const [order, setOrder] = useState({
    type: 'buy',
    price: 0,
    amount: 0,
    total: 0,
    execution: 'both'
  })

  const [marketPrice, setMarketPrice] = useState()

  useEffect(() => {
    if (order.execution === 'market') {
      const mp = order.type === 'buy' ? sellOrders[sellOrders.length - 1] : buyOrders[0]
      setMarketPrice(Number(mp.price))
    }
  }, [order])

  useEvent('clicked', (data) => {
    if (data.type === 'order') {
      setOrder({ ...order, price: Number(data.payload.price), type: data.payload.type })
      console.log(order)
    }
  })

  const assetBalance = useMemo(() => {
    let res = 0
    if (typeof wallet !== 'undefined' && Array.isArray(wallet.assets)) {
      const filter = wallet.assets.filter((a) => a['asset-id'] === asset.id)
      if (filter.length > 0) {
        res = fromBaseUnits(filter[0].amount, asset.decimals)
      }
    }

    return res
  }, [wallet, asset])

  const algoBalance = useMemo(() => {
    let res = 0
    if (typeof wallet !== 'undefined' && typeof wallet.amount === 'number') {
      res = fromBaseUnits(wallet.amount)
    }
    return res
  }, [wallet])

  // Calculate Slider Percentage
  const sliderPercent = useMemo(() => {
    if (order.type === 'sell') {
      return (order.amount / assetBalance) * 100
    }
    if (order.type === 'buy') {
      return (order.total / algoBalance) * 100
    }

    return 0
  }, [order, algoBalance, assetBalance])

  const hasBalance = order.type === 'sell' ? assetBalance > 0 : algoBalance > 0

  const isValidOrder = !hasBalance
    ? false
    : order.execution === 'taker' && order.total > 0
    ? true
    : order.total > 0.5
  // If account doesn't have balance not valid. If taker execution the 0.5 minimum does not apply. For both we need to restrict because maker orders break under 0.5.

  // useEffect(() => {
  //   if (order.type === 'sell') {
  //   }
  //   if (order.amount !== (order.amount * sliderPercent) / 100) {
  //   }
  // }, [setOrder, sliderPercent])

  // Fix Precision
  useEffect(() => {
    let _fixedPrice = parseFloat(order.price.toFixed(6)) || 0
    let _fixedAmount = parseFloat(order.amount.toFixed(asset.decimals)) || 0
    let _total = parseFloat((_fixedPrice * _fixedAmount).toFixed(6))
    if (order.type === 'buy' && _total >= algoBalance) {
      _fixedAmount = algoBalance / _fixedPrice
    }
    if (order.type === 'sell' && _fixedAmount >= assetBalance) {
      _fixedAmount = assetBalance
    }
    if (_fixedPrice !== order.price || _fixedAmount !== order.amount || _total !== order.total) {
      setOrder({
        ...order,
        price: _fixedPrice !== order.price ? _fixedPrice : order.price,
        amount: _fixedAmount !== order.amount ? _fixedAmount : order.amount,
        total: _total !== order.total ? _total : order.total
      })
    }
  }, [order, asset])

  const handleSlider = useCallback(
    (e, value) => {
      let _price = order.price || 0
      let _balance = order.type === 'sell' ? assetBalance : algoBalance
      let _percent = (value / 100) * _balance
      const _amount = order.type === 'sell' ? _percent : _percent / _price

      if (order.amount !== _amount) {
        setOrder({
          ...order,
          amount: _amount
        })
      }
    },
    [order]
  )
  const disableSlider = order.price === 0
  const handleChange = useCallback(
    (e, _key, _value) => {
      const key = _key || e.target.name
      let value = _value || e.target.value

      if (typeof key === 'undefined') {
        throw new Error('Must have valid key!')
      }
      if (typeof value === 'undefined') {
        throw new Error('Must have a valid value!')
      }

      if ((key === 'total' || key === 'price' || key === 'amount') && typeof value !== 'number') {
        value = parseFloat(value)
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
      let orderPromise
      if (typeof onSubmit === 'function') {
        orderPromise = onSubmit({
          ...order,
          wallet,
          asset
        })
      } else {
        console.log(
          {
            ...order,
            address: wallet.address,
            wallet,
            asset,
            appId: order.type === 'sell' ? 22045522 : 22045503,
            version: 6
          },
          { wallet }
        )
        orderPromise = placeOrder(
          {
            ...order,
            address: wallet.address,
            wallet,
            asset,
            appId: order.type === 'sell' ? 22045522 : 22045503,
            version: 6
          },
          { wallet }
        )
      }

      // TODO add events
      toast.promise(orderPromise, {
        loading: t('awaiting-confirmation'),
        success: t('order-success'),
        error: (err) => {
          console.log(err)
          if (/PopupOpenError|blocked/.test(err)) {
            return detectMobileDisplay() ? t('disable-popup-mobile') : t('disable-popup')
          }

          if (/Operation cancelled/i.test(err)) {
            return t('order-cancelled')
          }

          return t('error-placing-order')
        }
      })
    },
    [onSubmit, asset, order]
  )
  if (typeof wallet === 'undefined' || isLoading || isError) {
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
          <Typography variant="headerCaps" color="gray.500" mb={1}>
            {t('place-order')}
          </Typography>
        </header>
      )}
      <form onSubmit={handleSubmit} autoComplete="off">
        <BuySellToggle order={order} onChange={handleChange} />
        <AvailableBalance wallet={wallet} asset={asset} />
        <ExecutionToggle onChange={handleChange} order={order} />
        {!hasBalance && (
          <Typography color="gray.500" textAlign="center" m={10}>
            {t('insufficient-balance')}
          </Typography>
        )}
        {hasBalance && (
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
              value={order.execution === 'market' ? marketPrice : order.price}
              onChange={handleChange}
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
              onChange={handleSlider}
              name="amount"
              value={sliderPercent}
              step={0.000001}
              min={0.0}
              max={100.0}
              disabled={disableSlider}
            />
            <OutlinedInput
              id="total"
              name="total"
              type="text"
              value={order.total}
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
            <AdvancedOptions
              order={order}
              onChange={handleChange}
              allowTaker={typeof asset !== 'undefined'}
            />
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          color={order.type}
          fullWidth
          sx={{
            backgroundColor: order.type === 'sell' ? '#b23639' : '#4b9064',
            '&:hover': {
              backgroundColor:
                order.type === 'sell' ? lighten(0.05, '#b23639') : lighten(0.05, '#4b9064')
            },
            '&:disabled': {
              backgroundColor:
                order.type === 'sell' ? darken(0.05, '#b23639') : darken(0.05, '#4b9064')
            }
          }}
          disabled={!isValidOrder}
        >
          {buttonProps[order.type || 'buy']?.text}
        </Button>
      </form>
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
