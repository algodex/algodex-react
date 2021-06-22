import PropTypes from 'prop-types'
import { HeaderSm, BodyCopySm, BodyCopyTiny, LabelMd } from 'components/type'
import Button from 'components/button'
import Icon from 'components/icon'
import SvgImage from 'components/svg-image'

import {
  Container,
  ButtonContainer,
  Arrow,
  EmptyState,
  Header,
  Wallets,
  WalletsWrapper,
  Balance,
  WalletRow
} from './wallet.css'

function WalletView(props) {
  const { wallets, activeWalletAddress, isSignedIn, onConnectClick, onSetActiveWallet } = props

  const getButtonVariant = () => {
    return isSignedIn ? 'secondary' : 'primary'
  }

  const isWalletActive = (addr) => {
    return activeWalletAddress === addr
  }

  const isTabbable = (addr) => {
    return isWalletActive(addr) ? -1 : 0
  }

  const handleWalletClick = (addr) => {
    !isWalletActive(addr) && onSetActiveWallet(addr)
  }

  const renderBalance = (bal) => {
    const split = bal.toFixed(6).split('.')

    return (
      <Balance>
        <Icon use="algoLogo" size={0.625} />
        <LabelMd fontWeight="500">
          {`${split[0]}.`}
          <span>{split[1]}</span>
        </LabelMd>
      </Balance>
    )
  }

  const renderWallets = () => {
    return wallets.map((wallet) => (
      <WalletRow
        key={wallet.address}
        tabIndex={isTabbable(wallet.address)}
        role="button"
        isActive={isWalletActive(wallet.address)}
        onClick={() => handleWalletClick(wallet.address)}
      >
        <LabelMd fontWeight="500" title={wallet.address}>
          <Icon use="wallet" size={0.75} />
          {wallet.name}
        </LabelMd>
        {renderBalance(wallet.balance)}
      </WalletRow>
    ))
  }

  return (
    <Container>
      <ButtonContainer>
        <Button
          variant={getButtonVariant()}
          onClick={onConnectClick}
          data-testid="connect-wallet-btn"
        >
          Connect Wallet
        </Button>
      </ButtonContainer>
      {isSignedIn ? (
        <>
          <Header>
            <BodyCopyTiny color="gray.500">Wallet</BodyCopyTiny>
            <BodyCopyTiny color="gray.500" textAlign="right">
              Balance
            </BodyCopyTiny>
          </Header>
          <Wallets>
            <WalletsWrapper>{renderWallets()}</WalletsWrapper>
          </Wallets>
        </>
      ) : (
        <EmptyState>
          <Arrow>
            <SvgImage use="walletArrow" h={4} color="gray.600" />
          </Arrow>
          <HeaderSm color="gray.100" m={0} mb={16}>
            Start by connecting an Algorand wallet
          </HeaderSm>
          <BodyCopySm color="gray.500" m={0}>
            Once you&apos;ve connected a wallet using MyAlgo you can begin trading
          </BodyCopySm>
        </EmptyState>
      )}
    </Container>
  )
}

WalletView.propTypes = {
  wallets: PropTypes.array.isRequired,
  activeWalletAddress: PropTypes.string.isRequired,
  isSignedIn: PropTypes.bool,
  onConnectClick: PropTypes.func.isRequired,
  onSetActiveWallet: PropTypes.func.isRequired
}

WalletView.defaultProps = {
  isSignedIn: false
}

export default WalletView
