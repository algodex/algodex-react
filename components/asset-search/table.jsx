import {
  AssetChange,
  AssetId,
  AssetName,
  AssetNameBlock,
  AssetPrice,
  NameVerifiedWrapper,
  PairSlash,
  SortIcon,
  TableContainer,
  TableHeader,
  TableWrapper
} from './asset-search.css'
import { BodyCopySm, BodyCopyTiny } from '../type'
import { mdiCheckDecagram, mdiStar } from '@mdi/js'
import { useEffect, useMemo } from 'react'
import { useSortBy, useTable } from 'react-table'

import AlgoIcon from 'components/icon'
import Icon from '@mdi/react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import SvgImage from '../svg-image'
import { mapToSearchResults } from './helpers'
// import styled from 'styled-components'
import theme from '../../theme'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from 'store/use-user-state'
import { withSearchResultsQuery } from 'hooks/withAlgodex'

// const Text = styled(BodyCopyTiny)`
//   display: flex;
//   align-items: center;
//   margin: 0;
//   color: ${({ theme }) => theme.colors.gray['500']};

//   svg {
//     margin-left: 0.25rem;
//   }
// `
const Loading = () => {
  const { t } = useTranslation('assets')
  return <BodyCopyTiny color="gray.600">{t('loading')}&hellip;</BodyCopyTiny>
}
const Error = ({ message }) => <BodyCopySm color="gray.400">Error: {message}</BodyCopySm>

Error.propTypes = {
  message: PropTypes.string
}
const AssetNameCell = ({ value, row }) => {
  return (
    <div className="flex items-start">
      <Icon
        className="mr-1"
        path={mdiStar}
        title="Star icon"
        size={0.5}
        color={theme.colors.gray['500']}
      />
      <div className="flex flex-col">
        <div>
          <AssetNameBlock>
            <AssetName>{value}</AssetName>
            <PairSlash>{`/`}</PairSlash>
            <NameVerifiedWrapper>
              ALGO
              {row.original.verified && <SvgImage use="verified" w={0.75} h={0.75} />}
            </NameVerifiedWrapper>
          </AssetNameBlock>
        </div>
        <br />
        <div className="flex item-center -mt-3">
          <div className="mr-1">
            <AssetId>{row.original.id}</AssetId>
          </div>
          <Icon
            path={mdiCheckDecagram}
            title="Decagram icon"
            size={0.5}
            color={row.original.verified ? theme.colors.green['500'] : theme.colors.gray['500']}
          />
        </div>
      </div>
    </div>
  )
}

AssetNameCell.propTypes = {
  value: PropTypes.any,
  row: PropTypes.object
}
const AssetPriceCell = ({ value }) => <AssetPrice>{value}</AssetPrice>
AssetPriceCell.propTypes = {
  value: PropTypes.any
}
const AssetChangeCell = ({ value }) => {
  const displayChange = () => {
    if (value === null) {
      return ''
    }
    if (value === '--') {
      return value
    }
    return `${value}%`
  }
  return <AssetChange value={value}>{displayChange()}</AssetChange>
}
AssetChangeCell.propTypes = {
  value: PropTypes.any
}

const AssetSearchTable = ({
  searchHeight,
  isActive,
  onAssetFocus,
  onAssetLeave,
  onAssetClick,
  assets
}) => {
  const searchState = useUserStore((state) => state.search)
  const setSearchState = useUserStore((state) => state.setSearch)
  const { t, lang } = useTranslation('assets')

  /**
   * Handle Search Data
   * @type {Array}
   */
  const searchResultData = useMemo(() => {
    // Return nothing if no data exists
    if (!assets || !Array.isArray(assets)) {
      return []
    } else {
      // If there is data, use it
      return assets.map(mapToSearchResults)
    }
  }, [assets])

  /**
   * React-Table Columns
   * @see https://react-table.tanstack.com/docs/api/useTable#column-options
   * @type {Object}
   */
  const columns = useMemo(
    () => [
      {
        Header: function pair() {
          return (
            <div className="inline-flex">
              <Icon
                className="mr-1"
                path={mdiStar}
                title="Checkbox icon"
                size={0.5}
                color={theme.colors.gray['500']}
              />
              {t('pair')}
            </div>
          )
        },
        accessor: 'name',
        Cell: AssetNameCell
      },
      {
        Header: function price() {
          return (
            <div className="inline-flex">
              {t('price')}
              <AlgoIcon className="mt-0.5 ml-1" use="algoLogo" size={0.625} />
            </div>
          )
        },
        accessor: 'price',
        Cell: AssetPriceCell
      },
      {
        Header: function change() {
          return <div className="inline-flex">{t('change')}</div>
        },
        accessor: 'change',
        Cell: AssetChangeCell
      }
    ],
    [lang]
  )

  /**
   *
   * @param row
   * @returns {*}
   */
  const getRowProps = (row) => ({
    role: 'button',
    tabIndex: isActive ? '0' : '-1', // tab-navigable only when rows are visible
    onClick: () => onAssetClick(row),
    onKeyDown: (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        onAssetClick(row)
      }
    },
    onMouseEnter: () => {
      onAssetFocus(row.original)
    },
    onMouseLeave: onAssetLeave
  })

  const {
    state: tableState,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      // data: Object.keys(assets).map((key) => assets[key]),
      data: searchResultData,
      autoResetSortBy: false,
      initialState: searchState
    },
    useSortBy
  )
  useEffect(() => {
    setSearchState(tableState)
  }, [tableState, setSearchState])

  const renderTableData = (cell, rc, hasPrice) => {
    if (rc === 1) {
      return (
        <td
          style={{
            borderRight: 'solid 1px #2D3747'
          }}
          key={rc}
          {...cell.getCellProps()}
        >
          <span>{cell.render('Cell')}</span>
          <br />
          {hasPrice ? <span>$4.10 USD</span> : ''}
        </td>
      )
    } else {
      return (
        <td
          style={{
            borderRight: 'solid 1px #2D3747'
          }}
          key={rc}
          {...cell.getCellProps()}
        >
          {cell.render('Cell')}
        </td>
      )
    }
  }

  return (
    <TableWrapper className="mt-12">
      <TableContainer>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, h) => (
              <tr key={h} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, c) => (
                  <TableHeader
                    key={c}
                    searchHeight={searchHeight}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}

                    {!column.isSorted ? (
                      <SortIcon use="sortNone" size={0.625} />
                    ) : column.isSortedDesc ? (
                      <SortIcon use="sortDesc" size={0.625} />
                    ) : (
                      <SortIcon use="sortAsc" size={0.625} />
                    )}
                  </TableHeader>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, r) => {
              prepareRow(row)
              const hasPrice = row.original.price !== '--'

              const path = hasPrice ? '/trade' : '/asset'
              return (
                <Link key={r} href={`${path}/${row.original.id}`}>
                  <tr key={r} {...row.getRowProps(getRowProps(row))}>
                    {row.cells.map((cell, rc) => {
                      return renderTableData(cell, rc, hasPrice)
                    })}
                  </tr>
                </Link>
              )
            })}
          </tbody>
        </table>
      </TableContainer>
    </TableWrapper>
  )
}
AssetSearchTable.propTypes = {
  searchHeight: PropTypes.number,
  query: PropTypes.string.isRequired,
  assets: PropTypes.array.isRequired,
  isActive: PropTypes.bool,
  onAssetFocus: PropTypes.func,
  onAssetLeave: PropTypes.func,
  onAssetClick: PropTypes.func
}
export default withSearchResultsQuery(AssetSearchTable, { loading: Loading, error: Error })
