import PropTypes from 'prop-types'
import { Search as SearchIcon } from 'react-feather'
import styled from 'styled-components'
import TextInput from 'components/text-input'
import theme from '../../theme'

const Container = styled.div`
  display: flex;
  position: relative;
`

const Icon = styled(SearchIcon)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
`

const Input = styled(TextInput)`
  font-size: 0.75rem;
  padding-left: 2.25rem;
`

function Search(props) {
  return (
    <Container>
      <Input {...props} />
      <Icon color={theme.colors.gray['500']} size={16} />
    </Container>
  )
}

Search.propTypes = {
  placeholder: PropTypes.string
}

Search.defaultProps = {
  placeholder: 'Search'
}

export default Search
