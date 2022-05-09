import AdvancedOptions from './Form/AdvancedOptions'
// import AmountRange from './amount-range'
import Big from 'big.js'
// import { BodyCopy } from '@/components/Typography'
// import { LimitOrder } from './place-order.css'
import { FormHelperText } from '@mui/material'
import { default as MUIInputAdornment } from '@mui/material/InputAdornment'
import { default as MaterialBox } from '@mui/material/Box'
// import OrderInput from './order-input'
// import OrderOptions from './order-options'
import OutlinedInput from '@/components/Input/OutlinedInput'
import PropTypes from 'prop-types'
import Slider from '@/components/Input/Slider'
import Typography from '@mui/material/Typography'
import USDPrice from '@/components/Wallet/PriceConversion/USDPrice'
import { roundValue } from '@/components/helpers'
import theme from '../../../theme'
import { useMemo } from 'react'
import useTranslation from 'next-translate/useTranslation'
/**
 *
 * Render USD Price for an input component
 * @param {*} { value, id }
 * @return {*}
 */
export const USDInputPrice = ({ value, id }) => {
  return (
    <div className="flex justify-between items-center mx-4 mb-4 font-medium">
      <Typography color="gray.400" variant="body_tiny_cap">
        USD {id === 'price' ? 'Price' : 'Total'}{' '}
      </Typography>
      <Typography color="gray.400" variant="body_tiny_cap">
        <USDPrice priceToConvert={value} />
        <span className="ml-4 mr-3">USD</span>
      </Typography>
    </div>
  )
}

USDInputPrice.propTypes = {
  value: PropTypes.number,
  id: PropTypes.string
}

export const OrderForm = ({
  order,
  handleChange,
  sliderPercent,
  updateAmount,
  asset,
  microAlgo
  //   maxSpendableAlgo,
  //   asaBalance,
  //   handleRangeChange,
  //   enableOrder
  //   handleOptionsChange,
  //   newOrderSizeFilter,
  //   setNewOrderSizeFilter,
  //   orderType,
  //   microAlgo
}) => {
  const { t } = useTranslation('place-order')
  //   if (!enableOrder[order.type]) {
  //     // @todo: make this better, this is a placeholder
  //     return (
  //       <BodyCopy color="gray.500" textAlign="center" m={32}>
  //         {t('insufficient-balance')}
  //       </BodyCopy>
  //     )
  //   }

  //   const isErrorMsgVisible = () => {
  //     if (order.price === '0.00' || order.price === '') {
  //       return false
  //     }
  //     if (order.price < microAlgo) {
  //       return true
  //     }
  //   }

  const marks = [
    {
      value: 0,
      label: '0%'
    },
    {
      value: 25,
      label: '25%'
    },
    {
      value: 50,
      label: '50%'
    },
    {
      value: 75,
      label: '75%'
    },
    {
      value: 100,
      label: '100%'
    }
  ]

  const isErrorMsgVisible = useMemo(() => {
    if (order.price === '0.00' || order.price === '') {
      return false
    }
    if (order.price < microAlgo) {
      return true
    }
  }, [order, microAlgo])

  return (
    <MaterialBox className="flex flex-col mb-4">
      <OutlinedInput
        sx={{
          backgroundColor: theme.palette.gray['900'],
          border: 2,
          borderColor: theme.palette.gray['700']
        }}
        name="price"
        type="number"
        pattern="\d*"
        value={order.price}
        onChange={handleChange}
        inputProps={{
          decimals: 6,
          min: '0',
          step: '0.000001'
        }}
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
        error={isErrorMsgVisible}
      />
      {isErrorMsgVisible ? (
        <FormHelperText className="mt-0 mx-4 mb-4" error>
          Price cannot be less than {microAlgo}
        </FormHelperText>
      ) : (
        <USDInputPrice value={order.price} id="price" />
      )}

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
        step={new Big(10).pow(-1 * asset.decimals).toString()}
        // step={new Big(10).pow(-1 * asset.decimals).toString()}
        // inputMode="decimal"
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
          width: '90%'
        }}
        disabled={order.price == 0 ? true : false}
        onChange={updateAmount}
        value={sliderPercent}
        defaultValue={0}
        marks={marks}
        step={null}
        max={100}
      />
      <OutlinedInput
        id="total"
        name="total"
        type="number"
        value={order.total}
        readOnly
        disabled
        sx={{
          backgroundColor: theme.colors.gray['700']
        }}
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
      <USDInputPrice value={order.total} id="total" />
      {/* <TxnFeeContainer>
        <Typography color="gray.500" textTransform="none">
          Algorand transaction fees: <Icon use="algoLogo" color="gray.500" size={0.5} />{' '}
          {txnFee.toFixed(3)}
        </Typography>
      </TxnFeeContainer> */}
      {order.execution !== 'limit' && (
        <AdvancedOptions
          order={order}
          onChange={handleChange}
          allowTaker={typeof asset !== 'undefined'}
        />
      )}
    </MaterialBox>
  )
}

OrderForm.propTypes = {
  //   orderType: PropTypes.string.isRequired,
  order: PropTypes.object.isRequired,
  asset: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
  sliderPercent: PropTypes.number,
  microAlgo: PropTypes.number
  //   maxSpendableAlgo: PropTypes.number.isRequired,
  //   asaBalance: PropTypes.number.isRequired,
  //   handleRangeChange: PropTypes.func,
  //   handleOptionsChange: PropTypes.func,
  //   enableOrder: PropTypes.object
  //   newOrderSizeFilter: PropTypes.number,
  //   setNewOrderSizeFilter: PropTypes.func,
  //   microAlgo: PropTypes.number
}
// import Slider from '@/components/Input/Slider'
// import InputAdornment from '@mui/material/InputAdornment'
// import OutlinedInput from '@/components/Input/OutlinedInput'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import PropTypes from 'prop-types'
// import { lighten, darken } from 'polished'
// import theme from '../../../theme'
// import useTranslation from 'next-translate/useTranslation'
// import Typography from '@mui/material/Typography'
// import Spinner from '@/components/Spinner'
// import AvailableBalance from './Form/AvailableBalance'
// import BuySellToggle from './Form/BuySellToggle'
// import ExecutionToggle from '@/components/Wallet/PlaceOrder/Form/ExecutionToggle'
// import { useCallback, useEffect, useMemo, useState } from 'react'
// import { useAlgodex, useAssetOrdersQuery } from '@algodex/algodex-hooks'
// import fromBaseUnits from '@algodex/algodex-sdk/lib/utils/units/fromBaseUnits'
// import detectMobileDisplay from '@/utils/detectMobileDisplay'
// import toast from 'react-hot-toast'
