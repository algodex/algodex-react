import { BrightGraySpan } from '@/components/Typography'
import Icon from '@mdi/react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { mdiOpenInNew } from '@mdi/js'
import styled from '@emotion/styled'
import { useCallback } from 'react'
import { useEventDispatch } from '@/hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'

const OrderTypeSpan = styled.span`
  color: ${({ theme, value }) =>
    ('' + value).toUpperCase() === 'BUY' ? theme.palette.green[500] : theme.palette.red[500]};
`

const TradeDetailLink = styled.a`
  color: ${({ theme }) => theme.palette.gray['000']};
  text-decoration: underline;
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
      <button className="text-left whitespace-normal" onClick={onClick}>
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
  return (
    <OrderTypeSpan data-testid="cell-item" value={value}>
      {t(value.toLowerCase())}
    </OrderTypeSpan>
  )
}
OrderTypeCell.propTypes = { value: PropTypes.any }

/**
 * Show Trade Detail
 * Show trade detail in Algoexplorer
 *
 * @param value
 * @param row
 * @returns {JSX.Element}
 * @constructor
 */
export const ExpandTradeDetail = ({ value, row }) => {
  const activeNetwork = useUserStore((state) => state.activeNetwork)

  // Open Trader History Link
  const explorerOpenOrderURL =
    activeNetwork === 'testnet'
      ? `https://testnet.algoexplorer.io/address/`
      : `https://algoexplorer.io/address/`

  // Open Orders Link
  const explorerTradeHistoryURL =
    activeNetwork === 'testnet'
      ? `https://testnet.algoexplorer.io/tx/group/`
      : `https://algoexplorer.io/tx/group/`

  const urlFn = () => {
    if (row.original.status === 'OPEN') {
      return `${explorerOpenOrderURL}${row.original.metadata?.escrowAddress}`
    } else {
      return `${explorerTradeHistoryURL}${row.original.groupId}`
    }
  }
  return (
    <Link href={urlFn()}>
      <TradeDetailLink
        href={urlFn()}
        target="_blank"
        rel="noreferrer"
        className="flex items-center"
        data-testid="trade-detail-cell"
        value={value}
      >
        {value.toLowerCase()}
        &nbsp;
        <div>
          <Icon path={mdiOpenInNew} title="View External Link" size={0.6} />
        </div>
      </TradeDetailLink>
    </Link>
  )
}
ExpandTradeDetail.propTypes = { row: PropTypes.any, value: PropTypes.any }
