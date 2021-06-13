import PropTypes from 'prop-types'
import { Search as _Search, X as CancelIcon } from 'react-feather'
import styled from 'styled-components'
import TextInput from 'components/text-input'
import theme from '../../theme'

const Container = styled.div`
  display: flex;
  position: relative;
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

function Search({ value, onCancel, ...props }) {
  return (
    <Container>
      <Input value={value} {...props} />
      <SearchIcon color={theme.colors.gray['500']} size={16} />
      {onCancel && value !== '' && (
        <CancelButton onClick={onCancel}>
          <CancelIcon color={theme.colors.gray['500']} size={16} />
        </CancelButton>
      )}
    </Container>
  )
}

Search.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onCancel: PropTypes.func
}

Search.defaultProps = {
  placeholder: 'Search'
}

export default Search
