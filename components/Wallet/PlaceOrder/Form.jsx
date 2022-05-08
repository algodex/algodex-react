import { useAlgodex, useAssetOrdersQuery, useWalletMinBalanceQuery } from '@algodex/algodex-hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'

import AdvancedOptions from './Form/AdvancedOptions'
import AvailableBalance from './Form/AvailableBalance'
import Big from 'big.js'
import Box from '@mui/material/Box'
import { ButtonGroup } from '@mui/material'
import { default as MUIInputAdornment } from '@mui/material/InputAdornment'
import { default as MaterialButton } from '@mui/material/Button'
import { OrderForm } from './OrderForm'
import OutlinedInput from '@/components/Input/OutlinedInput'
import PropTypes from 'prop-types'
import Slider from '@/components/Input/Slider'
import Spinner from '@/components/Spinner'
import Tab from '@/components/Tab'
import Tabs from '@/components/Tabs'
import Typography from '@mui/material/Typography'
import fromBaseUnits from '@algodex/algodex-sdk/lib/utils/units/fromBaseUnits'
import { lighten } from 'polished'
import { roundValue } from '@/components/helpers'
import styled from '@emotion/styled'
import theme from '../../../theme'
import toast from 'react-hot-toast'
import useTranslation from 'next-translate/useTranslation'

export const Form = styled.form`
  ::-webkit-scrollbar {
    width: 0;
    display: none;
  }
`

export const convertToAsaUnits = (toConvert, decimals) => {
  if (!toConvert) {
    return 0
  }
  const multiplier = new Big(10).pow(6 - decimals)
  const algoUnits = new Big(toConvert)
  return algoUnits.times(multiplier).toNumber()
}

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
  const { wallet, placeOrder, http, isConnected } = useAlgodex()
  const { data: assetOrders, isLoading, isError } = useAssetOrdersQuery({ asset })
  const [order, setOrder] = useState({
    type: 'buy',
    price: 0,
    amount: 0,
    total: 0,
    execution: 'both'
  })

  // console.log(wallet, asset, 'both here')
  const algoBalance = useMemo(() => {
    let res = 0
    if (typeof wallet !== 'undefined' && typeof wallet.amount === 'number') {
      res = fromBaseUnits(wallet.amount)
    }
    return res
  }, [wallet])
  // const asaBalance = new Big(
  //   convertToAsaUnits(wallet?.assets?.[asset.id]?.amount, asset.decimals)
  // ).toString()
  const [tabSwitch, setTabSwitch] = useState(order.execution === 'market' ? 1 : 0)

  const {
    data: minBalance,
    isLoading: isWalletBalanceLoading,
    isError: isWalletBalanceError
  } = useWalletMinBalanceQuery({
    wallet: wallet.address
  })
  const orderBook = useMemo(
    () => ({
      buyOrders: assetOrders?.buyASAOrdersInEscrow || [],
      sellOrders: assetOrders?.sellASAOrdersInEscrow || []
    }),
    [assetOrders]
  )
  const [sellOrders, setSellOrders] = useState()
  const [buyOrders, setBuyOrders] = useState()
  useEffect(() => {
    setSellOrders(http.dexd.aggregateOrders(orderBook.sellOrders, asset.decimals, 'sell'))
    setBuyOrders(http.dexd.aggregateOrders(orderBook.buyOrders, asset.decimals, 'buy'))
  }, [orderBook, setSellOrders, setBuyOrders, asset])

  // useEffect(() => {
  //   if (!isWalletBalanceLoading && !isWalletBalanceError) {
  //     console.log(
  //       minBalance,
  //       isWalletBalanceLoading,
  //       isWalletBalanceError,
  //       secBalance,
  //       'sec balance'
  //     )
  //     // const total = new Big(algoBalance)
  //     // const min = new Big(minBalance).div(1000000)
  //     // const max = total.minus(min).minus(0.1).round(6, Big.roundDown).toNumber()
  //     // setMaxSpendableAlgo(Math.max(0, max))
  //   }
  // }, [minBalance, algoBalance, isWalletBalanceLoading, isWalletBalanceError])

  const buttonProps = useMemo(
    () => ({
      buy: { variant: 'primary', text: `${t('buy')} ${asset.name || asset.id}` },
      sell: { variant: 'danger', text: `${t('sell')} ${asset.name || asset.id}` }
    }),
    [asset]
  )

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

  const updateAmount = useCallback(
    (e) => {
      if (order.type === 'buy' && order.price === 0) {
        // setOrder({
        //   ...order,
        //   amount: new Big(e.target.value)
        //     .div(100)
        //     .times(algoBalance)
        //     .div(asset.price_info.price)
        //     .toString()
        // })
      }
      setOrder({
        ...order,
        amount: new Big(e.target.value)
          .div(100)
          .times(algoBalance)
          .div(asset.price_info.price)
          .toString()
      })
    },
    [algoBalance, asset.price_info.price]
  )

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
  const MICROALGO = 0.000001
  // const hasBalance = useMemo(() => {
  //   if (order.type === 'sell') {
  //     return assetBalance > 0
  //   }
  //   if (order.type === 'buy') {
  //     return algoBalance > 0
  //   }

  //   return false
  // }, [order])
  // useEffect(() => {
  //   if (order.type === 'sell') {
  //   }
  //   if (order.amount !== (order.amount * sliderPercent) / 100) {
  //   }
  // }, [setOrder, sliderPercent])

  // Fix Precision
  // useEffect(() => {
  //   let _fixedPrice = parseFloat(order.price.toFixed(6)) || 0
  //   let _fixedAmount = parseFloat(order.amount.toFixed(asset.decimals)) || 0
  //   let _total = parseFloat((_fixedPrice * _fixedAmount).toFixed(6)) || 0
  //   if (order.type === 'buy' && _total >= algoBalance && _fixedPrice > 0) {
  //     _fixedAmount = algoBalance / _fixedPrice
  //   }
  //   if (order.type === 'sell' && _fixedAmount >= assetBalance) {
  //     _fixedAmount = assetBalance
  //   }
  //   if (_fixedPrice !== order.price || _fixedAmount !== order.amount || _total !== order.total) {
  //     return {
  //       price: _fixedPrice !== order.price ? _fixedPrice : order.price,
  //       amount: _fixedAmount !== order.amount ? _fixedAmount : order.amount,
  //       total:
  //         _total !== order.total
  //           ? parseFloat(_total).toFixed(6)
  //           : parseFloat(order.total).toFixed(6)
  //     }
  //   }
  // }, [order, asset])

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
  const handleChange = (e, _key, _value) => {
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
    if (key === 'price') {
      let _fixedPrice = parseFloat(value.toFixed(6)) || 0
      setOrder({
        ...order,
        price: _fixedPrice !== order.price ? _fixedPrice : order.price
      })
    } else if (key === 'amount') {
      let _fixedAmount = parseFloat(value.toFixed(asset.decimals)) || 0
      let _total = parseFloat((order.price * _fixedAmount).toFixed(6)) || 0
      if (order.type === 'buy' && _total >= algoBalance && order.price > 0) {
        _fixedAmount = algoBalance / order.price
      }
      if (order.type === 'sell' && _fixedAmount >= assetBalance) {
        _fixedAmount = assetBalance
      }
      setOrder({
        ...order,
        amount: _fixedAmount !== order.amount ? _fixedAmount : order.amount,
        total:
          _total !== order.total
            ? parseFloat(_total).toFixed(6)
            : parseFloat(order.total).toFixed(6)
      })
    } else {
      setOrder({
        ...order,
        [key]: value
      })
    }

    // if (order[key] !== value) {
    //   setOrder({
    //     ...order,
    //     [key]: value
    //   })
    // }
  }
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
        orderPromise = placeOrder({
          ...order,
          wallet,
          asset
        })
      }
      // TODO add events
      toast.promise(orderPromise, {
        loading: t('awaiting-confirmation'),
        success: t('order-success'),
        error: (err) => {
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
  if (
    typeof wallet === 'undefined' ||
    typeof wallet.amount === 'undefined' ||
    isLoading ||
    isError
  ) {
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
        <Form onSubmit={onSubmit} className="overflow-x-scroll">
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
          <OrderForm
            handleChange={handleChange}
            updateAmount={updateAmount}
            sliderPercent={sliderPercent}
            order={order}
            asset={asset}
            microAlgo={MICROALGO}
          />
          <MaterialButton
            type="submit"
            variant="primary"
            fullWidth
            color={order.type}
            disabled={order.valid}
          >
            {buttonProps[order.type || 'buy']?.text}
          </MaterialButton>
        </Form>
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
    Box
  }
}
export default PlaceOrderForm
