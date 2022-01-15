import React from 'react'
import { OrderForm } from './order-form'

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
  enableOrder
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
      handleOptionsChange={handleOptionsChange}
      newOrderSizeFilter={newOrderSizeFilter}
      setNewOrderSizeFilter={setNewOrderSizeFilter}
      orderType="limit"
    />
  )
}
