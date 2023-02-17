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

import { createRef, forwardRef, useMemo, useState, useReducer } from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { X as CancelIcon } from 'react-feather'
import Checkbox from './CheckboxInput'
import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import TextInput from './TextInput'
import { mdiMagnify } from '@mdi/js'
import styled from '@emotion/styled'
import theme from 'theme'
import useTranslation from 'next-translate/useTranslation'
import { Box, Slider, Stack } from '@mui/material'

const Container = styled.div`
  display: flex;
  position: relative;
  overflow: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  height: 51px;
  border: solid 1px ${({ theme }) => theme.palette.gray['700']};
  border-radius: 4px;
  // margin: 0 2rem;

  @media (max-width: 996px) {
    height: 50px;
  }

  @media (min-width: 996px) {
    top: 8px;
    height: auto;
  }

  @media (min-width: 1536px) {
    top: 0;
  }
`

export const CancelButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 3px;

  &:hover,
  &:focus {
    svg {
      line {
        stroke: ${({ theme }) => theme.palette.gray['000']};
      }
    }
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(121, 255, 156, 0.5);
  }
`
CancelButton.defaultProps = {
  type: 'button'
}
const Input = styled(TextInput)`
  font-size: 0.75rem;
  // padding-left: 2.25rem;
  // padding-right: 3rem;
`


export const Search = forwardRef(
  (
    { 
      dispatchAction, 
      searchFilters, 
      toggleFilters,
      setToggleFilters,
      isListingVerifiedAssets, 
      setIsListingVerifiedAssets, 
      value, 
      onCancel, 
      isActive, 
      ...props 
    },
    ref
  ) => {
    const { t } = useTranslation('assets')
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }

    return (
      <div>
        <Container
          data-testid="asa-table-search-input"
          isActive={isActive}
          className="flex items-center ml-4 mr-4 mt-2 mb-2"
        >
          <Icon
            path={mdiMagnify}
            className="ml-2"
            title="Search icon"
            size={0.825}
            color={theme.palette.gray['500']}
          />
          <Input
            hasOutline={false}
            hasBackgroundColor={false}
            className="focus:outline-none"
            ref={ref}
            value={value}
            onKeyDown={handleKeyDown}
            {...props}
          />
          {onCancel && value !== '' && (
            <CancelButton onClick={onCancel}>
              <CancelIcon color={theme.palette.gray['500']} size={16} />
            </CancelButton>
          )}
        </Container>
        <div className={`${isActive ? '' : 'xs:invisible'} visible fflex-col items-center justify-between ml-6`}>
          {/* <div className={`visible flex items-center ml-6`}> */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center">
              <Checkbox
                isChecked={isListingVerifiedAssets}
                onChange={() => setIsListingVerifiedAssets(!isListingVerifiedAssets)}
              />
              <p className="mx-1.5 my-0 text-xs text-gray-500">{t('view-verified-asset')}</p>
            </Stack>
            <Stack className='cursor-pointer' onClick={() => setToggleFilters(!toggleFilters)} direction="row" alignItems="center" sx={{ height: '0rem' }}>
              <p className="mx-1.5 my-0 text-xs text-white font-bold">More Filters</p>
              {toggleFilters ? <ExpandLessIcon sx={{ color: theme.colors.white }} /> : <ExpandMoreIcon sx={{ color: theme.colors.white }} />}
            </Stack>
          </Stack>
          {toggleFilters && <Stack>
            <Stack direction="row" alignItems="center">
              <Checkbox
                isChecked={searchFilters.isFilteringNFTOnly}
                onChange={() => dispatchAction({ type: 'toggleNFTOnly' })}
              />
              <p className="mx-1.5 my-0 text-xs text-gray-500">NFT Only Mode</p>
            </Stack>
            {/* <Stack direction="row" alignItems="center">
              <Checkbox
                isChecked={searchFilters.isFilteringNFTOnly}
                onChange={() => dispatchAction({ type: 'toggleNFTOnly' })}
              />
              <p className="mx-1.5 my-0 text-xs text-gray-500">Low Spread</p>
            </Stack> */}
            {/* <Stack direction="row" alignItems="center">
              <Checkbox
                isChecked={searchFilters.isFilteringMarketCap}
                onChange={() => dispatchAction({ type: 'toggleMarketCap' })}
              />
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '90%' }}>
                <p className="mx-1.5 my-0 text-xs  text-white">Marketcap</p>
                <Slider
                  size="small"
                  sx={{
                    color: 'white',
                    width: '70%'
                  }}
                  value={searchFilters.marketCapAmount}
                  onChange={(e) => dispatchAction({
                    type: 'updateSliderValue',
                    field: 'marketCapAmount',
                    value: e.target.value
                  })}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                />
              </Stack>
            </Stack> */}
            <Stack direction="row" alignItems="center">
              <Checkbox
                isChecked={searchFilters.isFilteringAgeOfProject}
                onChange={() => dispatchAction({ type: 'toggleAgeOfProject' })}
              />
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '90%' }}>
                <p className="mx-1.5 my-0 text-xs text-white">Age of Project</p>
                <Slider
                  size="small"
                  sx={{
                    color: 'white',
                    width: '70%'
                  }}
                  value={searchFilters.ageOfProject}
                  onChange={(e) => dispatchAction({
                    type: 'updateSliderValue',
                    field: 'ageOfProject',
                    value: e.target.value
                  })}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  valueLabelFormat={`${searchFilters.ageOfProject} days`}
                  defaultValue={searchFilters.ageOfProjectMax}
                  max={searchFilters.ageOfProjectMax}
                />
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Checkbox
                isChecked={searchFilters.isFilteringPrice}
                onChange={() => dispatchAction({ type: 'toggleMarketPrice' })}
              />
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '90%' }}>
                <p className="mx-1.5 my-0 text-xs text-white">Price</p>
                <Slider
                  size="small"
                  sx={{
                    color: 'white',
                    width: '70%'
                  }}
                  value={searchFilters.price}
                  onChange={(e) => dispatchAction({
                    type: 'updateSliderValue',
                    field: 'price',
                    value: e.target.value
                  })}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  defaultValue={searchFilters.priceMax}
                  max={searchFilters.priceMax}
                />
              </Stack>
            </Stack>
          </Stack>
          }
        </div>
      </div>
    )
  }
)

Search.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onCancel: PropTypes.func,
  isListingVerifiedAssets: PropTypes.bool,
  dispatchAction: PropTypes.func,
  searchFilters: PropTypes.object,
  toggleFilters: PropTypes.bool,
  setToggleFilters: PropTypes.func,
  setIsListingVerifiedAssets: PropTypes.func,
  isActive: PropTypes.bool
}

Search.defaultProps = {
  placeholder: 'Search'
}

Search.displayName = 'Search'

export function SearchInput(props) {
  const {
    initialText,
    onChange,
    onSearchFocus,
    onExternalClick,
    containerRef,
    isActive,
    isListingVerifiedAssets,
    setIsListingVerifiedAssets,
    toggleFilters,
    setToggleFilters,
    dispatchAction,
    searchFilters
  } = props
  const { t } = useTranslation('assets')
  const [searchText, setSearchText] = useState(initialText)
  // const debouncedSearchText = useDebounce(searchText, 500)
  useMemo(() => {
    const filteredSearchText = searchText.replace(/[^a-zA-Z0-9\s]/g, '')
    onChange(filteredSearchText)
  }, [onChange, searchText])

  /**
   * This ref is forwarded to the search input
   */
  const inputRef = createRef()

  /**
   * Blur search bar (if focused) when flyout is hidden
   */
  useMemo(() => {
    !isActive && inputRef?.current?.blur()
  }, [inputRef, isActive])

  /**
   * If the user clicks outside the expanded flyout, it should close, and click
   * listener can be removed
   */
  const handleClick = (e) => {
    if (!containerRef?.current?.contains(e.target)) {
      onExternalClick()
      window.removeEventListener('click', handleClick)
    }
  }

  /**
   * Focusing on the search input triggers the flyout to appear. A listener is
   * added to detect clicks outside the expanded flyout.
   */
  const handleFocus = () => {
    onSearchFocus()
    window.addEventListener('click', handleClick)
  }

  return (
    <Search
      ref={inputRef}
      value={searchText}
      isActive={isActive}
      onChange={(e) => setSearchText(e.target.value)}
      onCancel={() => setSearchText('')}
      onFocus={handleFocus}
      dispatchAction={dispatchAction}
      searchFilters={searchFilters}
      toggleFilters={toggleFilters}
      setToggleFilters={setToggleFilters}
      placeholder={`${t('search')}`}
      isListingVerifiedAssets={isListingVerifiedAssets}
      setIsListingVerifiedAssets={setIsListingVerifiedAssets}
      data-testid="search-input"
    />
  )
}

SearchInput.propTypes = {
  initialText: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onSearchFocus: PropTypes.func,
  onExternalClick: PropTypes.func,
  containerRef: PropTypes.object,
  isActive: PropTypes.bool,
  dispatchAction: PropTypes.func,
  searchFilters: PropTypes.object,
  toggleFilters: PropTypes.bool, 
  setToggleFilters: PropTypes.func,
  isListingVerifiedAssets: PropTypes.bool,
  setIsListingVerifiedAssets: PropTypes.func
}

export default SearchInput
