import { useCallback, useEffect, useRef, useState } from 'react'

import { default as NavSearchTable } from './MobileSearchTable'
import PropTypes from 'prop-types'
import { default as SearchInput } from 'components/Input/SearchInput'
import { Section } from '@/components/Layout/Section'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import useUserStore from 'store/use-user-state'
import { withAlgorandPriceQuery } from 'hooks/withAlgoExplorer'

export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  background-color: ${({ theme }) => theme.palette.background.dark};
  position: relative;
  overflow: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  min-height: 4rem;
`
export const AssetsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: ${({ gridHeight }) => `${gridHeight}px`};
  background-color: ${({ theme }) => theme.palette.gray['800']};
  z-index: 30;
`
export function NavSearchSidebar({
  searchTableRef,
  gridRef,
  algoPrice,
  components,
  tableProps,
  area = 'sidebar'
}) {
  const { NavTable } = components
  const query = useUserStore((state) => state.query)
  // const [controlledVisible, setControlledVisible] = useState(false)
  const setQuery = useUserStore((state) => state.setQuery)
  const [gridSize, setGridSize] = useState({ width: 0, height: '100%' })
  const [searchTableSize, setSearchTableSize] = useState({ width: 0, height: '100%' })
  const [isFilteringByFavorites, setIsFilteringByFavorites] = useState(false)
  const [isListingVerifiedAssets, setIsListingVerifiedAssets] = useState(false)
  const { push } = useRouter()

  /**
   * `isActive` determines flyout visibility on smaller screens and whether
   * asset rows are tab-navigable
   */
  const [isActive, setIsActive] = useState(false)

  // const [assetInfo, setAssetInfo] = useState(null)
  const containerRef = useRef()

  // /**
  //  * Get the client height
  //  */

  /**
   *
   * @type {(function(): void)|*}
   */
  const handleSearchFocus = useCallback(() => {
    !isActive && setIsActive(true)
  }, [setIsActive, isActive])

  /**
   * Flyout is only hidden on smaller screens, triggered by external click
   * @type {(function(): void)|*}
   */
  const handleExternalClick = useCallback(() => {
    const isFixed = false
    !isFixed && setIsActive(false)
  }, [setIsActive])

  /**
   *
   * @type {(function(*): Promise<void>)|*}
   */
  const handleAssetClick = useCallback(
    (row) => {
      handleExternalClick()
      push(`/trade/${row.original.id}`)
    },
    [push, handleExternalClick]
  )

  useEffect(() => {
    const handleResize = () => {
      if (gridRef?.current) {
        const { width, height } = gridRef.current.getBoundingClientRect()
        setGridSize({ width, height })
      }
      if (searchTableRef?.current) {
        const { width, height } = searchTableRef.current.getBoundingClientRect()
        setSearchTableSize({ width, height })
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => removeEventListener('resize', handleResize)
  }, [gridRef, setGridSize, searchTableRef, setSearchTableSize])

  return (
    <Section area={area} borderColor="red" border="dashed">
      <Container gridHeight={gridSize.height} isActive={isActive}>
        <AssetsContainer gridHeight={gridSize.height} ref={containerRef} className="flex flex-col">
          <div>
            <SearchInput
              initialText={query}
              onChange={(q) => setQuery(q)}
              onSearchFocus={handleSearchFocus}
              onExternalClick={handleExternalClick}
              containerRef={containerRef}
              isActive={isActive}
              isListingVerifiedAssets={isListingVerifiedAssets}
              setIsListingVerifiedAssets={setIsListingVerifiedAssets}
            />
          </div>
          <div className="mt-1.5" style={{ height: '91%' }}>
            <NavTable
              query={query}
              isActive={isActive}
              options={{ refetchInterval: 5000 }}
              assetClick={handleAssetClick}
              algoPrice={algoPrice}
              isListingVerifiedAssets={isListingVerifiedAssets}
              setIsListingVerifiedAssets={setIsListingVerifiedAssets}
              isFilteringByFavorites={isFilteringByFavorites}
              setIsFilteringByFavorites={setIsFilteringByFavorites}
              {...tableProps}
              gridSize={searchTableSize}
            />
          </div>
        </AssetsContainer>
      </Container>
    </Section>
  )
}

NavSearchSidebar.propTypes = {
  gridRef: PropTypes.object,
  searchTableRef: PropTypes.object,
  algoPrice: PropTypes.any,
  components: PropTypes.shape({
    NavTable: PropTypes.node
  }),
  tableProps: PropTypes.object,
  area: PropTypes.string
}

NavSearchSidebar.defaultProps = {
  components: {
    NavTable: NavSearchTable
  },
  tableProps: {}
}

export default withAlgorandPriceQuery(NavSearchSidebar)