import { OrderForm } from './order-form'
import PropTypes from 'prop-types'
import React from 'react'

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
  microAlgo
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
      microAlgo={microAlgo}
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
  microAlgo: PropTypes.number.isRequired
}
