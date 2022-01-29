import AmountRange from 'components/amount-range'
import OrderInput from 'components/order-input'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { LimitOrder } from './place-order.css'
import Big from 'big.js'
import OrderOptions from 'components/order-options'
import { BodyCopy } from 'components/type'
import PropTypes from 'prop-types'

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
  orderType
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
          disabled={orderType == 'market'}
          orderType={order.type}
          value={order.price}
          onChange={handleChange}
          autocomplete="false"
          min="0"
          step="0.000001"
          inputMode="decimal"
        />
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
          readOnly
          disabled
        />
        {/* <TxnFeeContainer>
          <BodyCopyTiny color="gray.500" textTransform="none">
            Algorand transaction fees: <Icon use="algoLogo" color="gray.500" size={0.5} />{' '}
            {txnFee.toFixed(3)}
          </BodyCopyTiny>
        </TxnFeeContainer> */}
        {orderType == 'limit' && (
          <OrderOptions
            order={order}
            onChange={handleOptionsChange}
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
  setNewOrderSizeFilter: PropTypes.func
}
