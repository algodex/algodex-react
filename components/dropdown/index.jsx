import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  height: 12rem;
  background-color: ${({ theme }) => theme.colors.gray[700]};
  max-width: 15.5rem;
  width: 100%;
  margin-top: 1rem;
  border-radius: 4px;
  overflow-x: hidden;
`

const DropdownHeader = styled.div``

const DropdownBody = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[500]};
`

const DropdownFooter = styled.div``

const DropdownWrapper = ({ children }) => {
  return (
    <Container>
      <DropdownHeader />
      <DropdownBody>{children}</DropdownBody>
      <DropdownFooter />
    </Container>
  )
}

DropdownWrapper.propTypes = {
  children: PropTypes.element
}

export default DropdownWrapper
