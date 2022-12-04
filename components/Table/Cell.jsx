/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Icon from '@mdi/react'
import Link from 'next/link'
import PropTypes from 'prop-types'
// import { Typography } from '@/components/Typography'
import Typography from '@mui/material/Typography'
import { mdiOpenInNew } from '@mdi/js'
import styled from '@emotion/styled'
import { useCallback, useMemo } from 'react'
import { useEventDispatch } from '@/hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'
import { getActiveNetwork } from 'services/environment'
import {useInversionStatus} from '@/hooks/utils/useInversionStatus'
import { useRouter } from 'next/router'

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
  const isInverted = useInversionStatus(row?.original.id)
  const {query} = useRouter()
  
  const assetId = useMemo(() => row?.original?.asset?.id || row?.original?.id,
    [row?.original?.asset?.id, row?.original?.id])
  const onClick = useCallback(() => {
    dispatcher('clicked', 'asset')
  }, [dispatcher])
  const formattedPair = (value) => {
    const splittedPair = value.split('/')
    if (isInverted && parseInt(query.id) === assetId && typeof splittedPair[1] !== 'undefined') {
      return `${splittedPair[1]}/${splittedPair[0]}`
    } else {
      return value
    }
  }
  return (
    <Link href={`/trade/${assetId}`}>
      {/* <button className="cursor-pointer text-left whitespace-normal"> */}
      <Typography
        className="cursor-pointer text-left whitespace-normal"
        onClick={onClick}
        variant="body_small"
        color="gray.000"
      >
        {formattedPair(value)}
      </Typography>
      {/* </button> */}
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
export const OrderTypeCell = ({ value, row }) => {
  const { t } = useTranslation('orders')
  const isInverted = useInversionStatus(row.original.id)
  const assetId = useMemo(() => row?.original?.asset?.id || row?.original?.id,
    [row?.original?.asset?.id, row?.original?.id])
  const {query} = useRouter()
  const formattedPair = (value) => {
    if (isInverted && parseInt(query.id) === assetId) {
      return value === 'BUY' ? t('sell') : t('buy')
    } else {
      return t(value.toLowerCase())
    }
  }
  return (
    <OrderTypeSpan title={formattedPair(value)} isInverted={isInverted && parseInt(query.id) === assetId} data-testid="cell-item" value={formattedPair(value)}>
      {/* {t(value.toLowerCase())} */}
      {formattedPair(value)}
    </OrderTypeSpan>
  )
}
OrderTypeCell.propTypes = { value: PropTypes.any, row: PropTypes.object }

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
  const activeNetwork = getActiveNetwork()

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
