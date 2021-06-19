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

function Wallet(props) {
  const { wallets, activeWalletId, onConnectClick, onWalletClick } = props

  const hasWallets = wallets.length > 0

  const getButtonVariant = () => {
    return hasWallets ? 'secondary' : 'primary'
  }

  const isWalletActive = (id) => {
    return activeWalletId === id
  }

  const isTabbable = (id) => {
    return isWalletActive(id) ? -1 : 0
  }

  const handleWalletClick = (id) => {
    !isWalletActive(id) && onWalletClick(id)
  }

  const renderBalance = (bal) => {
    const split = (bal + '').split('.')

    return (
      <Balance>
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
        key={wallet.id}
        tabIndex={isTabbable(wallet.id)}
        role="button"
        isActive={isWalletActive(wallet.id)}
        onClick={() => handleWalletClick(wallet.id)}
      >
        <LabelMd fontWeight="500">
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
      {hasWallets ? (
        <>
          <Header>
            <BodyCopyTiny color="gray.500">Name</BodyCopyTiny>
            <BodyCopyTiny color="gray.500" textAlign="right">
              Balance (ALGO)
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

Wallet.propTypes = {
  wallets: PropTypes.array,
  activeWalletId: PropTypes.string,
  onConnectClick: PropTypes.func,
  onWalletClick: PropTypes.func
}

Wallet.defaultProps = {
  wallets: []
}

export default Wallet
