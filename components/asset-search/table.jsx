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
import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import { useSortBy, useTable } from 'react-table'
import { mapToSearchResults, useSearchResults } from 'hooks/Algodex'
import useUserStore from 'store/use-user-state'
import { BodyCopySm, BodyCopyTiny } from '../type'
import SvgImage from '../svg-image'
import useTranslation from 'next-translate/useTranslation'
import PropTypes from 'prop-types'

const Loading = () => {
  const { t } = useTranslation('assets')
  return <BodyCopyTiny color="gray.600">{t('loading')}&hellip;</BodyCopyTiny>
}
const Error = ({ message }) => <BodyCopySm color="gray.400">Error: {message}</BodyCopySm>
Error.propTypes = {
  message: PropTypes.string.isRequired
}
const AssetNameCell = ({ value, row }) => {
  return (
    <AssetNameBlock>
      <AssetName>{value}</AssetName>
      <PairSlash>{`/`}</PairSlash>
      <NameVerifiedWrapper>
        ALGO
        {row.original.verified && <SvgImage use="verified" w={0.75} h={0.75} />}
      </NameVerifiedWrapper>
      <br />
      <AssetId>{row.original.id}</AssetId>
    </AssetNameBlock>
  )
}
AssetNameCell.propTypes = {
  value: PropTypes.any.isRequired,
  row: PropTypes.object.isRequired
}
const AssetPriceCell = ({ value }) => <AssetPrice>{value}</AssetPrice>
AssetPriceCell.propTypes = {
  value: PropTypes.any.isRequired
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
  value: PropTypes.any.isRequired
}

const AssetSearchTable = ({
  searchHeight,
  query,
  isActive,
  onAssetFocus,
  onAssetLeave,
  onAssetClick
}) => {
  const searchState = useUserStore((state) => state.search)
  const setSearchState = useUserStore((state) => state.setSearch)
  const { t, lang } = useTranslation('assets')
  /**
   * Search Results Query
   * Refetch Interval should be 20 seconds when there is a query, 3 seconds when using the base cached search
   * @see https://react-query.tanstack.com/reference/useQuery
   * @type {{refetchInterval: (number), staleTime: number, initialData: Array}}
   */
  const { data, isLoading, isError } = useSearchResults({
    query,
    options: { refetchInterval: 5000 }
  })

  /**
   * Handle Search Data
   * @type {Array}
   */
  const searchResultData = useMemo(() => {
    // Return nothing if no data exists
    if (!data || !Array.isArray(data)) {
      return []
    } else {
      // If there is data, use it
      return data.map(mapToSearchResults)
    }
  }, [data])
  /**
   * React-Table Columns
   * @see https://react-table.tanstack.com/docs/api/useTable#column-options
   * @type {Object}
   */
  const columns = useMemo(
    () => [
      {
        Header: t('pair'),
        accessor: 'name',
        Cell: AssetNameCell
      },
      {
        Header: t('price'),
        accessor: 'price',
        Cell: AssetPriceCell
      },
      {
        Header: t('change'),
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
  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <Error message={'Error loading search!'} />
  }
  return (
    <TableWrapper>
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
                      return (
                        <td key={rc} {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      )
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
  isActive: PropTypes.bool,
  onAssetFocus: PropTypes.func,
  onAssetLeave: PropTypes.func,
  onAssetClick: PropTypes.func
}
export default AssetSearchTable
