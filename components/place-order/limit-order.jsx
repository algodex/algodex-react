import React from 'react'
import { OrderForm } from './order-form'
import PropTypes from 'prop-types'

export const LimitOrder = ({
  order,
  handleChange,
  asset,
  maxSpendableAlgo,
  asaBalance,
  handleRangeChange,
  handleOptionsChange,
  newOrderSizeFilter,
  setNewOrderSizeFilter,
  enableOrder,
  usdEquivalent
}) => {
  return (
    <OrderForm
      order={order}
      handleChange={handleChange}
      asset={asset}
      maxSpendableAlgo={maxSpendableAlgo}
      asaBalance={asaBalance}
      handleRangeChange={handleRangeChange}
      enableOrder={enableOrder}
      usdEquivalent={usdEquivalent}
      handleOptionsChange={handleOptionsChange}
      newOrderSizeFilter={newOrderSizeFilter}
      setNewOrderSizeFilter={setNewOrderSizeFilter}
      orderType="limit"
    />
  )
}

LimitOrder.propTypes = {
  order: PropTypes.object.isRequired,
  asset: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  maxSpendableAlgo: PropTypes.number.isRequired,
  asaBalance: PropTypes.number.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
  handleOptionsChange: PropTypes.func.isRequired,
  enableOrder: PropTypes.object,
  newOrderSizeFilter: PropTypes.number.isRequired,
  setNewOrderSizeFilter: PropTypes.func.isRequired,
  usdEquivalent: PropTypes.string.isRequired
}
