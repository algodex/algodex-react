import { useCallback, useEffect, useRef, useState } from 'react'
import NavSearchTable from './SearchTable'
import InfoFlyover from './InfoFlyover'
import PropTypes from 'prop-types'
import SearchInput from 'components/Input/SearchInput'
import { rgba } from 'polished'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import useUserStore from 'store/use-user-state'

import { withfetchAlgorandPriceQuery } from 'hooks/withAlgodex'

export const Section = styled.section`
  height: inherit;
  width: 100%;
  margin: 0;
  padding: 0;
  @media (min-width: 1536px) {
    display: flex;
  }
`
export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.background.dark};
  position: relative;
  overflow: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};

  @media (min-width: 1536px) {
    flex-direction: column;
    // height: auto;
    height: 99%;
  }
`
export const AssetsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  // height: ${({ gridHeight }) => `${gridHeight}px`};
  background-color: ${({ theme }) => theme.colors.gray['800']};
  // box-shadow: 3px 64px 3px 3px ${({ theme }) => rgba(theme.colors.gray['900'], 0.25)};
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
export function NavSearchSidebar({ gridRef, algoPrice, components, tableProps }) {
  const { NavTable } = components
  const query = useUserStore((state) => state.query)
  const setQuery = useUserStore((state) => state.setQuery)
  const [gridSize, setGridSize] = useState({ width: 0, height: '100%' })
  const [isFilteringByFavorites, setIsFilteringByFavorites] = useState(false)
  const [isListingVerifiedAssets, setIsListingVerifiedAssets] = useState(false)
  const { push } = useRouter()

  /**
   * `isActive` determines flyout visibility on smaller screens and whether
   * asset rows are tab-navigable
   */
  const [isActive, setIsActive] = useState(true)
  // const [searchHeight, setSearchHeight] = useState(0)
  const [assetInfo, setAssetInfo] = useState(null)
  const containerRef = useRef()
  const searchRef = useRef()
  // /**
  //  * Get the client height
  //  */
  // useEffect(() => {
  //   if (searchRef.current) {
  //     const height = Math.floor(searchRef.current.getBoundingClientRect().height)
  //     setSearchHeight(height)
  //   }
  // }, [searchRef])

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

  const handleAssetFocus = useCallback(
    (asset) => {
      setAssetInfo(asset)
    },
    [setAssetInfo]
  )
  const handleAssetLeave = useCallback(() => {
    setAssetInfo(null)
  }, [setAssetInfo])
  useEffect(() => {
    const handleResize = () => {
      if (gridRef?.current) {
        const { width, height } = gridRef.current.getBoundingClientRect()
        setGridSize({ width, height })
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => removeEventListener('resize', handleResize)
  }, [gridRef, setGridSize])
  return (
    <Section>
      <Container isActive={isActive}>
        <AssetsContainer
          style={{ width: '100%' }}
          className="flex"
          ref={containerRef}
          gridHeight={gridSize.height}
        >
          <div style={{ width: '100%' }} ref={searchRef}>
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
          <div
            className="mt-1.5"
            style={{ borderTop: 'solid 1px #2D3748', height: '91%', overflowY: 'scroll' }}
          >
            <NavTable
              query={query}
              options={{ refetchInterval: 5000 }}
              onAssetClick={handleAssetClick}
              onAssetFocus={handleAssetFocus}
              onAssetLeave={handleAssetLeave}
              algoPrice={algoPrice}
              isListingVerifiedAssets={isListingVerifiedAssets}
              setIsListingVerifiedAssets={setIsListingVerifiedAssets}
              isFilteringByFavorites={isFilteringByFavorites}
              setIsFilteringByFavorites={setIsFilteringByFavorites}
              {...tableProps}
            />
          </div>
        </AssetsContainer>
        <InfoFlyover assetInfo={assetInfo} />
      </Container>
    </Section>
  )
}

NavSearchSidebar.propTypes = {
  gridRef: PropTypes.object.isRequired,
  algoPrice: PropTypes.any,
  components: PropTypes.shape({
    NavTable: PropTypes.node
  }),
  tableProps: PropTypes.object
}

NavSearchSidebar.defaultProps = {
  components: {
    NavTable: NavSearchTable
  },
  tableProps: {}
}

export default withfetchAlgorandPriceQuery(NavSearchSidebar)