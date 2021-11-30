import { forwardRef, useState } from 'react'
import { mdiCheckDecagram, mdiCheckboxBlankOutline, mdiMagnify } from '@mdi/js'

// import { X as CancelIcon, Search as _Search } from 'react-feather'
import { X as CancelIcon } from 'react-feather'
import Checkbox from 'components/checkbox'
import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import TextInput from 'components/text-input'
import styled from 'styled-components'
import theme from '../../theme'

const Container = styled.div`
  display: flex;
  position: relative;
  height: 51px;
  border: solid 1px ${({ theme }) => theme.colors.gray['500']};
  border-radius: 4px;
  // margin: 0 2rem;

  @media (min-width: 996px) {
    top: 8px;
    height: auto;
  }

  @media (min-width: 1536px) {
    top: 0;
  }
`

const CancelButton = styled.button.attrs({
  type: 'button'
})`
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
        stroke: ${({ theme }) => theme.colors.gray['000']};
      }
    }
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(121, 255, 156, 0.5);
  }
`

const Input = styled(TextInput)`
  font-size: 0.75rem;
  // padding-left: 2.25rem;
  // padding-right: 3rem;
`

const Search = forwardRef(({ value, onCancel, ...props }, ref) => {
  const [isListingVerifiedAssets, setIsListingVerifiedAssets] = useState(false)
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <div>
      <Container className="flex items-center ml-4 mr-4 mt-2 mb-2">
        <Icon
          path={mdiMagnify}
          className="ml-2"
          title="Search icon"
          size={0.85}
          color={theme.colors.gray['500']}
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
            <CancelIcon color={theme.colors.gray['500']} size={16} />
          </CancelButton>
        )}
      </Container>
      <div className="flex items-center ml-6">
        <Checkbox
          isChecked={isListingVerifiedAssets}
          onCheckFn={() => setIsListingVerifiedAssets(!isListingVerifiedAssets)}
        />
        <p className="mx-1.5 my-0 text-xs">View Verified Assets Only</p>
        <Icon
          path={mdiCheckDecagram}
          title="Checkbox icon"
          size={0.7}
          color={isListingVerifiedAssets ? theme.colors.green['500'] : theme.colors.gray['500']}
        />
      </div>
    </div>
  )
})

Search.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onCancel: PropTypes.func
}

Search.defaultProps = {
  placeholder: 'Search'
}

Search.displayName = 'Search'

export default Search
