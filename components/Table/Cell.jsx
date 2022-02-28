import { BrightGraySpan } from '@/components/Typography'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'

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
  const assetId = row?.original?.asset?.id || row?.original?.id
  return (
    <Link href={`/trade/${assetId}`}>
      <BrightGraySpan data-testid="cell-item">{value}</BrightGraySpan>
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
  return (
    <OrderTypeSpan data-testid="cell-item" value={value}>
      {t(value.toLowerCase())}
    </OrderTypeSpan>
  )
}
OrderTypeCell.propTypes = { value: PropTypes.any }
