import { OrderForm } from './order-form'
import PropTypes from 'prop-types'
import React from 'react'

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

MarketOrder.propTypes = {
  order: PropTypes.object.isRequired,
  asset: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  maxSpendableAlgo: PropTypes.number.isRequired,
  asaBalance: PropTypes.number.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
  enableOrder: PropTypes.object
}
