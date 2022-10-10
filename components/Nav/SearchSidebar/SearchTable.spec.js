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

import { render } from 'test/test-utils'
import useUserStore from 'store/use-user-state'
import { NavSearchTable, AssetChangeCell } from './SearchTable'

const assets = [
  {
    assetId: 15322902,
    assetName: 'Lamps',
    decimals: 6,
    destroyed: false,
    formattedASALiquidity: '270.284235',
    formattedAlgoLiquidity: '194029.219225',
    formattedPrice: '295.999904',
    hasOrders: true,
    isTraded: true,
    price: '295.999903795520',
    priceChg24Pct: 33.332906648775136,
    unitName: 'LAMP',
    verified: false
  }
]

describe('Search Sidebar Component', () => {
  it('Should render Search Sidebar with Table', () => {
    function SearchTableComp() {
      const query = useUserStore((state) => state.query)
      const algoPrice = 0.1
      const assetClick = jest.fn()
      const setIsListingVerifiedAssets = jest.fn()
      const setIsFilteringByFavorites = jest.fn()
      return (
        <NavSearchTable
          query={query}
          isActive={false}
          assetClick={assetClick}
          assets={assets}
          options={{ refetchInterval: 5000 }}
          algoPrice={algoPrice}
          isListingVerifiedAssets={false}
          setIsListingVerifiedAssets={setIsListingVerifiedAssets}
          isFilteringByFavorites={false}
          setIsFilteringByFavorites={setIsFilteringByFavorites}
        />
      )
    }
    const { queryByTestId } = render(<SearchTableComp />)
    expect(queryByTestId('asa-table-wrapper')).not.toBeNull()
  })
  it('Should render Search Table for Verified Assets', () => {
    function SearchTableComp() {
      const query = useUserStore((state) => state.query)
      const algoPrice = 0.1
      const assetClick = jest.fn()
      const setIsListingVerifiedAssets = jest.fn()
      const setIsFilteringByFavorites = jest.fn()
      return (
        <NavSearchTable
          query={query}
          isActive={false}
          assetClick={assetClick}
          assets={assets}
          options={{ refetchInterval: 5000 }}
          algoPrice={algoPrice}
          isListingVerifiedAssets={true}
          setIsListingVerifiedAssets={setIsListingVerifiedAssets}
          isFilteringByFavorites={false}
          setIsFilteringByFavorites={setIsFilteringByFavorites}
        />
      )
    }
    const { queryByTestId } = render(<SearchTableComp />)
    expect(queryByTestId('asa-table-wrapper')).not.toBeNull()
  })
  it('Should render Search Table for Favourited Assets', () => {
    function SearchTableComp() {
      const query = useUserStore((state) => state.query)
      const algoPrice = 0.1
      const assetClick = jest.fn()
      const setIsListingVerifiedAssets = jest.fn()
      const setIsFilteringByFavorites = jest.fn()
      return (
        <NavSearchTable
          query={query}
          isActive={false}
          assetClick={assetClick}
          assets={assets}
          options={{ refetchInterval: 5000 }}
          algoPrice={algoPrice}
          isListingVerifiedAssets={false}
          setIsListingVerifiedAssets={setIsListingVerifiedAssets}
          isFilteringByFavorites={true}
          setIsFilteringByFavorites={setIsFilteringByFavorites}
        />
      )
    }
    const { queryByTestId } = render(<SearchTableComp />)
    expect(queryByTestId('asa-table-wrapper')).not.toBeNull()
  })
  it('Should render Empty Search Table when Assets list is Empty', () => {
    function SearchTableComp() {
      const query = useUserStore((state) => state.query)
      const algoPrice = 0.1
      const assetClick = jest.fn()
      const setIsListingVerifiedAssets = jest.fn()
      const setIsFilteringByFavorites = jest.fn()
      return (
        <NavSearchTable
          query={query}
          isActive={false}
          assetClick={assetClick}
          assets={[]}
          options={{ refetchInterval: 5000 }}
          algoPrice={algoPrice}
          isListingVerifiedAssets={false}
          setIsListingVerifiedAssets={setIsListingVerifiedAssets}
          isFilteringByFavorites={true}
          setIsFilteringByFavorites={setIsFilteringByFavorites}
        />
      )
    }
    const { queryByTestId } = render(<SearchTableComp />)
    expect(queryByTestId('asa-table-wrapper')).not.toBeNull()
  })
  it('Should render Change cell with value', () => {
    const { queryByTestId } = render(
      <>
        <AssetChangeCell value="10" />
      </>
    )
    expect(queryByTestId('asa-change-cell').textContent).toBe('10%')
  })
  it('Should render null when no value is passed', () => {
    const { queryByTestId } = render(
      <>
        <AssetChangeCell value={null} />
      </>
    )
    expect(queryByTestId('asa-change-cell').textContent).toBe('')
  })
  it('Should render value when -- is passed', () => {
    const { queryByTestId } = render(
      <>
        <AssetChangeCell value={`--`} />
      </>
    )
    expect(queryByTestId('asa-change-cell').textContent).toBe('--')
  })
})
