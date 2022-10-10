import AdvancedOptions from './AdvancedOptions'
import Big from 'big.js'
import { FormHelperText } from '@mui/material'
import { default as MUIInputAdornment } from '@mui/material/InputAdornment'
import { default as MaterialBox } from '@mui/material/Box'
import OutlinedInput from '@/components/Input/OutlinedInput'
import PropTypes from 'prop-types'
import Slider from '@/components/Input/Slider'
import Typography from '@mui/material/Typography'
import USDPrice from '@/components/Wallet/PriceConversion/USDPrice'
import theme from '../../../../theme'
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

export const TradeInputs = ({
  order,
  handleChange,
  sliderPercent,
  updateAmount,
  asset,
  microAlgo
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
          backgroundColor:
            order.execution === 'market' ? theme.palette.gray['700'] : theme.palette.gray['900'],
          border: order.execution === 'market' ? 0 : 2,
          borderColor: theme.palette.gray['700']
        }}
        name="price"
        type="number"
        min="0"
        readOnly={order.execution === 'market'}
        pattern="\d*"
        disabled={order.execution === 'market'}
        value={order.price}
        onChange={handleChange}
        inputProps={{
          decimals: 6,
          min: '0',
          step: '0.000001',
          placeholder: '0.00',
          sx: {
            '&.Mui-disabled': {
              color: 'white'
            }
          }
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
      {isErrorMsgVisible && order.execution !== 'market' ? (
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
        inputProps={{
          decimals: asset.decimals,
          min: '0',
          step: '0.000001',
          placeholder: '0.00'
        }}
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
        type="default"
        defaultValue={0}
        disabled={order.price == 0 ? true : false}
        onChange={updateAmount}
        value={sliderPercent}
        marks={marks}
        max={100}
      />
      <OutlinedInput
        id="total"
        min="0"
        name="total"
        type="number"
        value={order.total}
        readOnly
        disabled
        sx={{
          backgroundColor: theme.colors.gray['700']
        }}
        inputProps={{
          sx: {
            '&.Mui-disabled': {
              color: 'white'
            }
          }
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
      <MaterialBox className="flex justify-between items-center mx-4 font-medium">
        <Typography color="gray.400" variant="body_tiny_cap">
          Fee
        </Typography>
        <Typography color="gray.400" variant="body_tiny_cap">
          <USDPrice priceToConvert={0} />
          <span className="ml-4 mr-3">USD</span>
        </Typography>
      </MaterialBox>
      <USDInputPrice value={order.total} id="total" />
      {/* <TxnFeeContainer>
        <Typography color="gray.500" textTransform="none">
          Algorand transaction fees: <Icon use="algoLogo" color="gray.500" size={0.5} />{' '}
          {txnFee.toFixed(3)}
        </Typography>
      </TxnFeeContainer> */}
      {order.execution !== 'market' && (
        <AdvancedOptions
          order={order}
          onChange={handleChange}
          allowTaker={typeof asset !== 'undefined'}
        />
      )}
    </MaterialBox>
  )
}

TradeInputs.propTypes = {
  order: PropTypes.object.isRequired,
  asset: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
  sliderPercent: PropTypes.number,
  microAlgo: PropTypes.number
}
