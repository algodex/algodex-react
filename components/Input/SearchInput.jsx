import { createRef, forwardRef, useEffect, useState } from 'react'

import { X as CancelIcon } from 'react-feather'
import Checkbox from './CheckboxInput'
import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import TextInput from './TextInput'
import { mdiMagnify } from '@mdi/js'
import styled from '@emotion/styled'
import theme from 'theme'
import useDebounce from 'hooks/useDebounce'
import useTranslation from 'next-translate/useTranslation'

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
    { isListingVerifiedAssets, setIsListingVerifiedAssets, value, onCancel, isActive, ...props },
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
        <Container isActive={isActive} className="flex items-center ml-4 mr-4 mt-2 mb-2">
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
        <div className={`${isActive ? '' : 'xs:invisible'} visible flex items-center ml-6`}>
          {/* <div className={`visible flex items-center ml-6`}> */}
          <Checkbox
            isChecked={isListingVerifiedAssets}
            onChange={() => setIsListingVerifiedAssets(!isListingVerifiedAssets)}
          />
          <p className="mx-1.5 my-0 text-xs text-gray-500">{t('view-verified-asset')}</p>
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
    setIsListingVerifiedAssets
  } = props
  const { t } = useTranslation('assets')
  const [searchText, setSearchText] = useState(initialText)
  const debouncedSearchText = useDebounce(searchText, 500)
  useEffect(() => {
    const filteredSearchText = searchText.replace(/[^a-zA-Z0-9\s]/g, '')
    onChange(filteredSearchText)
  }, [onChange, debouncedSearchText])

  /**
   * This ref is forwarded to the search input
   */
  const inputRef = createRef()

  /**
   * Blur search bar (if focused) when flyout is hidden
   */
  useEffect(() => {
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
      placeholder={`${t('search')}`}
      isListingVerifiedAssets={isListingVerifiedAssets}
      setIsListingVerifiedAssets={setIsListingVerifiedAssets}
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
  isListingVerifiedAssets: PropTypes.bool,
  setIsListingVerifiedAssets: PropTypes.func
}

export default SearchInput
