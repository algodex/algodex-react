import DropdownBody from './DropdownBody'
import DropdownFooter from './DropdownFooter'
import DropdownHeader from './DropdownHeader'
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
  overflow: none;
  right: 9rem;
  top: 4rem;

`

const WalletConnectDropdown = ({ closeDropdown, children }) => {
  return <Container className="">
    <div className="flex flex-col justify-between">
      <DropdownHeader closeFn={closeDropdown} />
      <DropdownBody
        // connectMyAlgoWallet={() => addConnection('MyAlgo')}
        // connectAlgorandMobileWallet={() => addConnection('AlgorandOfficial')}
        // disconnectAlgorandWallet={disconnectAlgorandWallet}
        // closeFn={closeFn}
        // activeWalletAddress={activeWalletAddress}
        // allAddresses={allAddresses}
        // setActiveWalletAddress={setActiveWalletAddress}
        // activeNetwork={activeNetwork}
        // handleDisconnectFn={handleDisconnectFn}
      />
      <DropdownFooter />
    </div>
  </Container>
}

WalletConnectDropdown.propTypes = {
  children: PropTypes.element,
  closeDropdown: PropTypes.func
}

export default WalletConnectDropdown
