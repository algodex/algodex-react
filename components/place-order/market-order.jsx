import React from 'react'
import { OrderForm } from './order-form'

export const MarketOrder = ({
  order,
  asset,
  handleChange,
  maxSpendableAlgo,
  asaBalance,
  handleRangeChange,
  enableOrder
}) => {
  return (
    <OrderForm
      order={order}
      asset={asset}
      handleChange={handleChange}
      maxSpendableAlgo={maxSpendableAlgo}
      asaBalance={asaBalance}
      handleRangeChange={handleRangeChange}
      enableOrder={enableOrder}
      orderType="market"
    />
  )
}
