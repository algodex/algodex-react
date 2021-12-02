import { X as CancelIcon, Search as _Search } from 'react-feather'

import PropTypes from 'prop-types'
import TextInput from 'components/text-input'
import { forwardRef } from 'react'
import styled from 'styled-components'
import theme from '../../theme'

const Container = styled.div`
  display: flex;
  position: relative;
  height: 51px;

  @media (min-width: 996px) {
    top: 8px;
    height: auto;
  }

  @media (min-width: 1536px) {
    top: 0;
  }
`

const SearchIcon = styled(_Search)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
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
  padding-left: 2.25rem;
  padding-right: 3rem;
`

const Search = forwardRef(({ value, onCancel, ...props }, ref) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <Container>
      <Input ref={ref} value={value} onKeyDown={handleKeyDown} {...props} />
      <SearchIcon color={theme.colors.gray['500']} size={16} />
      {onCancel && value !== '' && (
        <CancelButton onClick={onCancel}>
          <CancelIcon color={theme.colors.gray['500']} size={16} />
        </CancelButton>
      )}
    </Container>
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
