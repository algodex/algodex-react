/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
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

import { useCallback, useEffect, useRef, useState } from 'react'

import { default as NavSearchTable } from './SearchTable'
import PropTypes from 'prop-types'
import { default as SearchInput } from 'components/Input/SearchInput'
import { Section } from '@/components/Layout/Section'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import useUserStore from 'store/use-user-state'
import { withAlgorandPriceQuery } from '@algodex/algodex-hooks'

// export const Section = styled.section`
//   height: inherit;
//   width: 100%;
//   margin: 0;
//   padding: 0;
//   @media (min-width: 1536px) {
//     display: flex;
//   }
// `
export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  background-color: ${({ theme }) => theme.palette.background.dark};
  position: relative;
  overflow: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  min-height: 4rem;

  @media (min-width: 1536px) {
    flex-direction: column;
    height: 99%;
  }
`
export const AssetsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: ${({ gridHeight }) => `${gridHeight}px`};
  background-color: ${({ theme }) => theme.palette.gray['800']};
  z-index: 30;

  @media (min-width: 1536px) {
    position: static;
    display: block;
    flex: 1 1 0%;
    position: relative;
    width: auto;
    height: auto;
    background-color: transparent;
    box-shadow: none;
    max-height: inherit;
    height: inherit;
  }
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
   * The `gridSize` prop changes on window resize, so this is equivalent to a
   * resize listener callback. On large screens, `isActive` is always true.
   * The active (focused) element is blurred so an asset row can't remain
   * focused when flyout is hidden.
   */
  useEffect(() => {
    const isFixed = window.matchMedia('(min-width: 1536px)').matches
    const isMobile = window.matchMedia('(max-width: 996px)').matches

    if (!isMobile) {
      setIsActive(isFixed)
      document.activeElement.blur()
    }
  }, [gridSize])

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
    const isFixed = window.matchMedia('(min-width: 1536px)').matches
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
