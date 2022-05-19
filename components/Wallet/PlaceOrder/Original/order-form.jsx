import { BodyCopy, BodyCopyTiny } from '@/components/Typography'
import React, { useMemo } from 'react'

import { APPROVED_SECURITIES_LIST } from '../../../../APPROVED_ASSETS'
import AmountRange from './amount-range'
import Big from 'big.js'
import { LimitOrder } from './place-order.css'
import OrderInput from './order-input'
import OrderOptions from './order-options'
import PropTypes from 'prop-types'
import USDPrice from '@/components/Wallet/PriceConversion/USDPrice'
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
      <BodyCopyTiny>USD {id === 'price' ? 'Price' : 'Total'} </BodyCopyTiny>
      <BodyCopyTiny>
        <USDPrice priceToConvert={value} />
        <span className="ml-4 mr-3">USD</span>
      </BodyCopyTiny>
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
  asset,
  maxSpendableAlgo,
  asaBalance,
  handleRangeChange,
  enableOrder,
  handleOptionsChange,
  newOrderSizeFilter,
  setNewOrderSizeFilter,
  orderType,
  microAlgo
}) => {
  const { t } = useTranslation('place-order')
  if (!enableOrder[order.type]) {
    // @todo: make this better, this is a placeholder
    return (
      <BodyCopy color="gray.500" textAlign="center" m={32}>
        {t('insufficient-balance')}
      </BodyCopy>
    )
  }

  const isErrorMsgVisible = () => {
    if (order.price === '0.00' || order.price === '') {
      return false
    }
    if (order.price < microAlgo) {
      return true
    }
  }

  const isNotTradable = useMemo(() => {
    return !APPROVED_SECURITIES_LIST[asset.id]
  }, [asset])

  return (
    <>
      <LimitOrder>
        <OrderInput
          type="number"
          pattern="\d*"
          id="price"
          name="af2Km9q"
          label={t('price')}
          asset="ALGO"
          decimals={6}
          disabled={orderType === 'market'}
          orderType={order.type}
          value={order.price}
          onChange={handleChange}
          autocomplete="false"
          min="0"
          step="0.000001"
          inputMode="decimal"
          hasError={isErrorMsgVisible()}
          errorMessage={`Price cannot be less than ${microAlgo}`}
        />
        <USDInputPrice value={order.price} id="price" />

        <OrderInput
          type="number"
          pattern="\d*"
          id="amount"
          name="af2Km9q"
          label={t('amount')}
          asset={asset.name}
          decimals={asset.decimals}
          orderType={order.type}
          value={order.amount}
          onChange={(e) => {
            handleChange(e)
          }}
          autocomplete="false"
          min="0"
          step={new Big(10).pow(-1 * asset.decimals).toString()}
          inputMode="decimal"
        />
        <AmountRange
          order={order}
          algoBalance={maxSpendableAlgo}
          asaBalance={asaBalance}
          asset={asset}
          // txnFee={txnFee}
          onChange={handleRangeChange}
        />
        <OrderInput
          type="number"
          id="total"
          label={t('total')}
          asset="ALGO"
          decimals={6}
          orderType={order.type}
          value={order.total}
          // usdEquivalent={order.total}
          readOnly
          disabled
        />
        <USDInputPrice value={order.total} id="total" />
        {/* <TxnFeeContainer>
          <BodyCopyTiny color="gray.500" textTransform="none">
            Algorand transaction fees: <Icon use="algoLogo" color="gray.500" size={0.5} />{' '}
            {txnFee.toFixed(3)}
          </BodyCopyTiny>
        </TxnFeeContainer> */}
        {orderType === 'limit' && (
          <OrderOptions
            asset={asset}
            order={order}
            onChange={!isNotTradable ? handleOptionsChange : () => {}}
            allowTaker={typeof asset !== 'undefined'}
            orderFilter={newOrderSizeFilter}
            setOrderFilter={setNewOrderSizeFilter}
          />
        )}
      </LimitOrder>
    </>
  )
}

OrderForm.propTypes = {
  orderType: PropTypes.string.isRequired,
  order: PropTypes.object.isRequired,
  asset: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  maxSpendableAlgo: PropTypes.number.isRequired,
  asaBalance: PropTypes.number.isRequired,
  handleRangeChange: PropTypes.func,
  handleOptionsChange: PropTypes.func,
  enableOrder: PropTypes.object,
  newOrderSizeFilter: PropTypes.number,
  setNewOrderSizeFilter: PropTypes.func,
  microAlgo: PropTypes.number
}
