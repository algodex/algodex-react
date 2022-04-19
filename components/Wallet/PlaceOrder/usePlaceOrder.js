import useTranslation from 'next-translate/useTranslation'
import { useCallback, useMemo, useState } from 'react'
import { useAlgodex } from '@algodex/algodex-hooks'

function usePlaceOrder({ asset }) {
  const { t } = useTranslation('place-order')
  const { wallet, placeOrder } = useAlgodex()
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
    (key, value) => {
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
    (e, _key, _value) => {
      const key = _key || e.target.name
      const value = _value || e.target.value
      if (typeof key === 'undefined') {
        throw new Error('Must have valid key!')
      }
      if (typeof value === 'undefined') {
        throw new Error('Must have a valid value!')
      }
      if (order[key] !== value) {
        setOrder({
          ...order,
          [key]: value
        })
      }
    },
    [setOrder, order]
  )

  return { wallet, order, setOrder, handleChange, fixPrecision, buttonProps, placeOrder }
}

export default usePlaceOrder
