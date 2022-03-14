import DropdownBody from './DropdownBody'
import DropdownFooter from './DropdownFooter'
import DropdownHeader from './DropdownHeader'
import PropTypes from 'prop-types'
import WalletService from '@/services/wallet'
import styled from '@emotion/styled'
import useMyAlgo from 'hooks/useMyAlgo'
import useStore from 'store/use-store'
import {useStorePersisted} from 'store/use-store'

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
  const setActiveWalletAddress = useStorePersisted((state) => state.setActiveWalletAddress)
  const setWallets = useStorePersisted((state) => state.setWallets)
  const setIsSignedIn = useStore((state) => state.setIsSignedIn)

  const connectWallet = (type) => {
    const { connect, addresses } = useMyAlgo()
    switch (type) {
      case 'myalgowallet':
        connect()
    
      default:
        break;
    }

  }

  const disconnectWalletFn = (address, type) => {
    switch (type) {
      case 'myalgowallet':
        setIsSignedIn(false)
        setActiveWalletAddress('')
        setWallets([])
        return 'myalgowallet'
      case 'algomobilewallet':
        console.log('algomobilewallet')
        return 'algomobilewallet'
      default:
        break;
    }
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
