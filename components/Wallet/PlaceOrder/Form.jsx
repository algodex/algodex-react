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

import { Button, ButtonGroup } from '@mui/material'
import { logInfo, throttleLog } from 'services/logRemote'
import { useAlgodex, useAssetOrdersQuery } from '@/hooks'
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'

import { AvailableBalance } from './Form/AvailableBalance'
import Big from 'big.js'
import Box from '@mui/material/Box'
import { default as MaterialButton } from '@mui/material/Button'
import MaterialIcon from '@mdi/react'
import PropTypes from 'prop-types'
import Spinner from '@/components/Spinner'
import Tab from '@/components/Tab'
import Tabs from '@/components/Tabs'
import { TradeInputs } from './Form/TradeInputs'
import Typography from '@mui/material/Typography'
import fromBaseUnits from '@algodex/algodex-sdk/lib/utils/units/fromBaseUnits'
import { mdiAlertCircleOutline } from '@mdi/js'
import styled from '@emotion/styled'
import toast from 'react-hot-toast'
import { useEvent } from 'hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'
import { useMaxSpendableAlgo } from '@/hooks/useMaxSpendableAlgo'
import { useInversionStatus } from '@/hooks/utils/useInversionStatus'
import { StableAssets } from '@/components/StableAssets'

export const Form = styled.form`
  scrollbar-width: none;
  ::-webkit-scrollbar {
    width: 0;
    display: none;
  }
`

function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}

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
  const [tabSwitch, setTabSwitch] = useState(0)
  const [showForm, setShowForm] = useState(true)

  const formatFloat = useCallback((value, decimal = 6) => {
    const splited = value.toString().split('.')
    const _decimals = decimal > 6 ? 6 : decimal
    if (splited[1] && splited[1].length > _decimals) {
      return parseFloat(value).toFixed(_decimals)
    }
    return parseFloat(value)
  }, [])

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

  const getAdjOrderAmount = useCallback(({ amount, type, price }) => {
    let adjAmount = amount || 0
    let total = adjAmount * price
    if (type === 'buy' && total > algoBalance) {
      adjAmount = algoBalance / Math.max(price, 0.000001)
    } else if (type === 'sell' && adjAmount > assetBalance) {
      adjAmount = assetBalance
    }
    return adjAmount
  }, [algoBalance, assetBalance])

  const [order, setOrder] = useReducer((currentState, order) => {
    const origStateCopy = { ...currentState }
    if (order.price !== undefined && order.price !== '' && isNaN(order.price)) {
      order.price = 0
    }
    if (order.amount !== undefined && order.amount !== '' && isNaN(order.amount)) {
      order.amount = 0
    }

    Object.keys(order).forEach(key => {
      currentState[key] = order[key]
    });

    // Set Order Price and Amount precision. Price should be to 6 decimals
    // currentState.price = formatFloat(currentState.price, 6) || ''

    const amount = getAdjOrderAmount(currentState)

    // Amount should be based on asset decimals
    // currentState.amount = formatFloat(amount, asset.decimals) || ''

    const price = currentState.price || 0

    const total = parseFloat(amount) * parseFloat(price)

    // Set Order Total precision
    currentState.total = formatFloat(total, 6)

    if (shallowEqual(currentState, origStateCopy)) {
      return currentState
    } else {
      return { ...currentState }
    }
  }, {
    type: 'buy',
    price: '',
    amount: '',
    total: 0,
    execution: 'both'
  })

  // if (typeof wallet?.address === 'undefined') {
  //   throw new TypeError('Invalid Wallet!')
  // }
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
  useMemo(() => {
    setSellOrders(http.dexd.aggregateOrders(orderBook.sellOrders, asset.decimals, 'sell'))
    setBuyOrders(http.dexd.aggregateOrders(orderBook.buyOrders, asset.decimals, 'buy'))
  }, [orderBook, setSellOrders, setBuyOrders, http.dexd, asset])

  useMemo(() => {
    if (order?.type === 'buy') {
      setOrder({
        price: parseFloat(sellOrders?.length ? sellOrders[sellOrders.length - 1].price : '0.00')
      })
    } else if (order?.type === 'sell') {
      setOrder({
        price: parseFloat(buyOrders?.length ? buyOrders[0].price : '0.00')
      })
    }
  }, [order?.type])

  // useEffect(() => {
  //   updateInitialState()
  // }, [order.type, updateInitialState])
  
  const buttonProps = useCallback(
    (key) => {
      const isInverted = getInversionStatus()
      const btnProps = {
        buy: {
          variant: 'primary',
          text: `${t('buy')} ${(isInverted ? 'ALGO' : asset.name) || asset.id}`
        },
        sell: {
          variant: 'danger',
          text: `${t('sell')} ${(isInverted ? 'ALGO' : asset.name) || asset.id}`
        }
      }
      return btnProps[key]?.text
    }, [asset])

  useEvent('clicked', (data) => {
    if (data.type === 'order') {
      const order = {
        amount: data.payload.amount,
        price: Number(data.payload.price),
        type: data.payload.type
      }

      setOrder(order)
    }
  })

  useEvent('signOut', (data) => {
    if (data.type === 'wallet') {
      logInfo(`On sign out : ${data}`)
      setShowForm(false)
    }
  })
  useEvent('signIn', (data) => {
    if (data.type === 'wallet') {
      throttleLog(`On sign in : ${data}`)
      console.log(`On sign in : `, data)
      setShowForm(true)
    }
  })

  // Calculate Slider Percentage
  const sliderPercent = useMemo(() => {
    if (order.type === 'sell' && assetBalance !== 0) {
      const _value = (order.amount / assetBalance) * 100
      return _value
    }
    if (order.type === 'buy' && algoBalance !== 0) {
      const _value = (order.total / algoBalance) * 100
      return _value
    }

    return 0
  }, [order.price, order.amount, algoBalance, assetBalance])

  const maxSpendableAlgo = useMaxSpendableAlgo()

  const hasBalance = useMemo(() => {
    if (order.type === 'sell') {
      return assetBalance > 0
    }
    if (order.type === 'buy') {
      return maxSpendableAlgo
    }
    return false
  }, [order.type, assetBalance, maxSpendableAlgo])

  const isBelowMinOrderAmount = useMemo(() => {
    if (order.type === 'buy') {
      return new Big(order.total).lt(0.5)
    }
    return new Big(order.total).eq(0)
  }, [order.total, order.type])

  // const isInvalid = () => {
  //   return isNaN(parseFloat(order.price)) || isNaN(parseFloat(order.amount))
  // }

  // const isBalanceExceeded = () => {
  //   const maxSpendableAlgo = fromBaseUnits(wallet.amount)
  //   const asaBalance = fromBaseUnits(assetBalance, asset.decimals)
  //   if (order.type === 'buy') {
  //     return new Big(order.price).times(order.amount).gt(maxSpendableAlgo)
  //   }
  //   return new Big(order.amount).gt(asaBalance)
  // }

  // const isDisabled = isBelowMinOrderAmount() || isInvalid() || isBalanceExceeded()
  // asset.isGeoBlocked ||
  // status.submitting

  const handleSlider = useCallback(
    (e, value) => {
      let _price = order.price || 0
      let _balance = order.type === 'sell' ? assetBalance : algoBalance
      let _percent = (value / 100) * _balance
      const _amount = order.type === 'sell' ? _percent : _percent / _price

      if (order.amount !== _amount) {
        setOrder({
          amount: _amount
        })
      }
    },
    [order.price, order.type, algoBalance, order.amount, assetBalance]
  )

  const handleChange = useCallback(
    (e, _key, _value) => {

      if (asset.isGeoBlocked) {
        toast.error('Asset is not available for trading')
        return
      }
      const key = _key || e.target.name
      let value = _value || e.target.value

      if (typeof key === 'undefined') {
        throw new Error('Must have valid key!')
      }
      if (typeof value === 'undefined') {
        throw new Error('Must have a valid value!')
      }

      // if ((key === 'total' || key === 'price' || key === 'amount') && typeof value !== 'number') {
      //   value = parseFloat(value)
      //   // value = value
      // }
      const neworder = {
        [key]: value
      }
      // if (order[key] !== value) {
      setOrder(neworder)
      // }
    },
    [asset.isGeoBlocked]
  )

  const getInversionStatus = useCallback(() => {
    const inversionStatus = localStorage.getItem('inversionStatus')
    if (inversionStatus && inversionStatus === 'true') {
      return StableAssets.includes(parseInt(asset.id))
    }
    return false
  }, [])
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const isInverted = getInversionStatus()

      const formattedOrder = { ...order, type: isInverted && order.type === 'buy' ? 'sell' : 'buy' }
      formattedOrder.price = formatFloat(formattedOrder.price, 6)
      formattedOrder.amount = formatFloat(formattedOrder.amount, asset.decimals)

      let lastToastId = undefined
      let orderPromise
      const notifier = (msg) => {
        if (lastToastId) {
          toast.dismiss(lastToastId)
        }
        lastToastId = toast.loading(msg, { duration: 30 * 60 * 1000 }) // Awaiting signature, or awaiting confirmations
      }
      if (typeof onSubmit === 'function') {
        // What is the purpose of this conditional?
        // I have checked everywhere in the codebase and no other componenet passes an onSubmit prop to this component
        orderPromise = onSubmit({
          ...formattedOrder,
          wallet,
          asset
        })
      } else {
        console.log(
          {
            ...formattedOrder,
            address: wallet.address,
            wallet,
            asset,
            appId: formattedOrder.type === 'sell' ? 22045522 : 22045503,
            version: 6
          },
          { wallet }
        )

        const awaitPlaceOrder = async () => {
          try {
            notifier('Initializing order')
            await placeOrder(
              {
                ...formattedOrder,
                address: wallet.address,
                wallet,
                asset,
                appId: formattedOrder.type === 'sell' ? 22045522 : 22045503,
                version: 6
              },
              { wallet },
              notifier
            )
            toast.success(t('order-success'), {
              id: lastToastId,
              duration: 3000
            })
          } catch (e) {
            toast.error(`${t('error-placing-order')} ${e}`, { id: lastToastId, duration: 5000 })
          }
        }

        awaitPlaceOrder()
      }

      // TODO add events
      throttleLog('Submitting order', {
        wallet
      })
    },
    [onSubmit, asset, order, wallet]
  )
  const handleMarketTabSwitching = (e, tabId) => {
    setTabSwitch(tabId)
    setOrder({
      price:
        order.type === 'buy'
          ? parseFloat(sellOrders[sellOrders?.length - 1]?.price)
          : parseFloat(buyOrders[0]?.price),
      execution: tabId === 0 ? 'both' : 'market'
    })
  }

  const isActive = typeof wallet === 'undefined'
  if (isLoading || isError) {
    return <Spinner />
  }
  const notSignedIn = !isConnected ? true : !showForm ? true : false
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
          <Typography variant="subtitle_medium_cap_bold" color="gray.500" mb={1}>
            {t('place-order')}
          </Typography>
          {notSignedIn && (
            <Typography data-testid="not-signed-in" color="gray.500" textAlign="center" my={5}>
              {t('not-signed-in')}
            </Typography>
          )}
        </header>
      )}
      {typeof order !== 'undefined' && typeof wallet !== 'undefined' && isConnected && showForm && (
        <Form onSubmit={handleSubmit} className="overflow-x-scroll" disabled={isActive}>
          <ButtonGroup fullWidth variant="contained" className="mb-6">
            <MaterialButton
              disableElevation={order.type === 'buy'}
              disableRipple={true}
              variant={order.type === 'buy' ? 'primary' : 'default'}
              color="buy"
              fullWidth
              onClick={!asset.isGeoBlocked && handleChange}
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
              onClick={!asset.isGeoBlocked && handleChange}
              name="type"
              value="sell"
            >
              {t('sell')}
            </MaterialButton>
          </ButtonGroup>
          <AvailableBalance wallet={wallet} asset={asset} />
          <Tabs
            sx={{ marginBottom: '16px' }}
            textColor="primary"
            tabtype={order.type === 'buy' ? 'buy' : 'sell'}
            onChange={(e, value) => handleMarketTabSwitching(e, value)}
            value={tabSwitch}
          >
            <Tab label={t('limit')} />
            <Tab label={t('market')} />
          </Tabs>
          {/*</TabsUnstyled>*/}
          {!hasBalance && (
            <Typography color="gray.500" textAlign="center" className="m-8">
              {t('insufficient-balance')}
            </Typography>
          )}
          {hasBalance && (
            <TradeInputs
              handleChange={handleChange}
              updateAmount={handleSlider}
              sliderPercent={sliderPercent}
              order={order}
              onChange={handleChange}
              asset={asset}
              allowTaker={typeof asset !== 'undefined'}
            />
          )}

          <Button
            type="submit"
            variant={order.type === 'buy' ? 'primary' : 'sell'}
            fullWidth
            disabled={
              asset.isGeoBlocked || !hasBalance || order.total === 0 || isBelowMinOrderAmount
            }
          >
            {/* {buttonProps[order.type || 'buy']?.text} */}
            {buttonProps(order.type || 'buy')}
          </Button>
        </Form>
      )}
      {asset.isGeoBlocked && (
        <div className="px-4 flex">
          <MaterialIcon
            className='mt-2'
            path={mdiAlertCircleOutline}
            title="Warning icon"
            height="1.5rem"
            width="4rem"
            color="#FFFFFF"
          />{' '}
          &nbsp;
          <div className="flex flex-col">
            <p className="text-white text-xs font-medium">
              This asset is not able to be traded in your country for legal reasons. You can view
              the chart and book but will not be able to place trades for this asset.
            </p>
          </div>
        </div>
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
    name: PropTypes.string,
    isGeoBlocked: PropTypes.bool,
    isInverted: PropTypes.bool
  }).isRequired,
  /**
   * Wallet to execute Orders from
   */
  wallet: PropTypes.shape({
    amount: PropTypes.number,
    address: PropTypes.string,
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
