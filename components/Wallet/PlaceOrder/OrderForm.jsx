import AdvancedOptions from './Form/AdvancedOptions'
// import AmountRange from './amount-range'
import Big from 'big.js'
// import { BodyCopy } from '@/components/Typography'
// import { LimitOrder } from './place-order.css'
import { default as MUIInputAdornment } from '@mui/material/InputAdornment'
import { default as MaterialBox } from '@mui/material/Box'
// import OrderInput from './order-input'
// import OrderOptions from './order-options'
import OutlinedInput from '@/components/Input/OutlinedInput'
import PropTypes from 'prop-types'
import React from 'react'
import Slider from '@/components/Input/Slider'
import Typography from '@mui/material/Typography'
import theme from '../../../theme'
import useTranslation from 'next-translate/useTranslation'

export const OrderForm = ({
  order,
  handleChange,
  asset
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

  return (
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
  )
}

OrderForm.propTypes = {
  //   orderType: PropTypes.string.isRequired,
  order: PropTypes.object.isRequired,
  asset: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
  //   maxSpendableAlgo: PropTypes.number.isRequired,
  //   asaBalance: PropTypes.number.isRequired,
  //   handleRangeChange: PropTypes.func,
  //   handleOptionsChange: PropTypes.func,
  //   enableOrder: PropTypes.object
  //   newOrderSizeFilter: PropTypes.number,
  //   setNewOrderSizeFilter: PropTypes.func,
  //   microAlgo: PropTypes.number
}
