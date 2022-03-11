import DropdownBody from './DropdownBody'
import DropdownFooter from './DropdownFooter'
import DropdownHeader from './DropdownHeader'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { useStorePersisted } from 'store/use-store'

const Container = styled.div`
  position: absolute;
  min-height: 16rem;
  background-color: ${({ theme }) => theme.colors.gray[700]};
  max-width: 23rem;
  width: 100%;
  margin-top: 1rem;
  border-radius: 4px;
  overflow: none;
  right: 9rem;
  top: 4rem;
`

const WalletConnectDropdown = ({ closeDropdown }) => {
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  
  const connectWallet = (type) => {
    console.log('Connect wallet: ', type)
  }

  const disconnectWallet = (type) => {
    console.log('Disconnect wallet: ', type)
  }

  const switchWalletAddress = () => {
    console.log('Switching Wallet address...')
  }

  const fetchWallets = () => {
    console.log('Fetch Wallet')
  }
  
  return (
    <Container className="">
      <div className="flex flex-col justify-between">
        <DropdownHeader closeFn={closeDropdown} />
        <DropdownBody
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          switchWalletAddress={switchWalletAddress}
          activeWalletAddress={activeWalletAddress}
        />
        <DropdownFooter />
      </div>
    </Container>
  )
}

WalletConnectDropdown.propTypes = {
  closeDropdown: PropTypes.func
}

export default WalletConnectDropdown
