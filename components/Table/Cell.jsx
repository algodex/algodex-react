import { useEventDispatch } from '@/hooks/useEvents'
import { useCallback } from 'react'
import Link from 'next/link'
import { BrightGraySpan } from '@/components/Typography'
import PropTypes from 'prop-types'
import useTranslation from 'next-translate/useTranslation'
import styled from 'styled-components'

const OrderTypeSpan = styled.span`
  color: ${({ theme, value }) =>
    ('' + value).toUpperCase() === 'BUY' ? theme.colors.green[500] : theme.colors.red[500]};
`

/**
 * Order Pair cell
 *
 * @param value
 * @param row
 * @returns {JSX.Element}
 * @constructor
 */
export const AssetNameCell = ({ value, row }) => {
  const dispatcher = useEventDispatch()
  const assetId = row?.original?.asset?.id || row?.original?.id
  const onClick = useCallback(() => {
    dispatcher('clicked', 'asset')
  }, [dispatcher])
  return (
    <Link href={`/trade/${assetId}`}>
      <button onClick={onClick}>
        <BrightGraySpan>{value}</BrightGraySpan>
      </button>
    </Link>
  )
}
AssetNameCell.propTypes = { row: PropTypes.any, value: PropTypes.any }

/**
 * Order Side Cell
 * BUY or SELL
 *
 * @param value
 * @returns {JSX.Element}
 * @constructor
 */
export const OrderTypeCell = ({ value }) => {
  const { t } = useTranslation('orders')
  return <OrderTypeSpan value={value}>{t(value.toLowerCase())}</OrderTypeSpan>
}
OrderTypeCell.propTypes = { value: PropTypes.any }
