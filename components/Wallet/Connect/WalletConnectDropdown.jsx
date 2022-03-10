import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Container = styled.div`
  position: absolute;
  max-height: 16rem;
  background-color: ${({ theme }) => theme.colors.gray[700]};
  max-width: 23rem;
  width: 100%;
  margin-top: 1rem;
  border-radius: 4px;
  overflow-x: hidden;
  right: 10rem;
`

const WalletConnectDropdown = ({ openWalletConnectDropdown, children }) => {
  return <Container className="overflow-y-auto">
    
  </Container>
}

WalletConnectDropdown.propTypes = {
  children: PropTypes.element,
  openWalletConnectDropdown: PropTypes.bool
}

export default WalletConnectDropdown
