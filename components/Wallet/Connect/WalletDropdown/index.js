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

  const disconnectWalletFn = (address, type) => {
    console.log('Disconnect wallet: ', address, type)
  }

  return (
    <Container className="">
      <div className="flex flex-col justify-between">
        <DropdownHeader closeFn={closeDropdown} />
        <DropdownBody
          connectWallet={connectWallet}
          disconnectWalletFn={disconnectWalletFn}
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
