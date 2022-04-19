import useTranslation from 'next-translate/useTranslation'
import { useCallback, useMemo, useState } from 'react'

function usePlaceOrder({ asset }) {
  const { t } = useTranslation('place-order')

  const [order, setOrder] = useState({
    type: 'buy',
    price: 0,
    amount: 0,
    total: 0,
    execution: 'both'
  })

  const buttonProps = useMemo(
    () => ({
      buy: { variant: 'primary', text: `${t('buy')} ${asset.name || asset.id}` },
      sell: { variant: 'danger', text: `${t('sell')} ${asset.name || asset.id}` }
    }),
    [asset]
  )

  const fixPrecision = useCallback(
    (e, key) => {
      const value = e.target.value
      switch (key) {
        case 'price':
          return parseFloat(value).toFixed(6)
        case 'amount':
          return parseFloat(value).toFixed(asset.decimals)
        case 'total':
          return parseFloat(value).toFixed(asset.decimals)
        default:
          return value
      }
    },
    [order]
  )

  const handleChange = useCallback(
    (e, field) => {
      const key = field || e.target.name
      if (typeof key === 'undefined') {
        throw new Error('Must have valid key!')
      }
      if (order[key] !== e.target.value) {
        setOrder({
          ...order,
          [key]: fixPrecision(e, key)
        })
      }
    },
    [setOrder, order]
  )

  return { order, setOrder, handleChange, fixPrecision, buttonProps }
}

export default usePlaceOrder
