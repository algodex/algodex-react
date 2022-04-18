// import { Typography, Typography, Typography, Typography } from 'components/Typography'

import Typography from '@mui/material/Typography'
import Button from 'components/Button'
import Icon from 'components/Icon/Icon'
import PropTypes from 'prop-types'
import { Section } from '@/components/Layout/Section'
import SvgImage from 'components/SvgImage'
import styled from '@emotion/styled'
import toast from 'react-hot-toast'
import { useAlgodex } from '@algodex/algodex-hooks'
import { useMyAlgoConnect } from '@/hooks/useMyAlgoConnect'
import useTranslation from 'next-translate/useTranslation'

// import { useEffect, useMemo } from 'react'
// import useStore, { useStorePersisted } from 'store/use-store'

const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.background.dark};
  padding: 0.875rem 0 1rem;
`

const ButtonContainer = styled.div`
  flex-shrink: 0%;
  display: flex;
  width: 100%;

  button {
    flex-grow: 1;
    margin: 0 1.125rem;
  }
`

const EmptyState = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1.125rem;
  text-align: center;
`

const gridStyles = `
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.25rem;
`

const Arrow = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.375rem;
`

const Header = styled.header`
  flex-shrink: 0%;
  display: grid;
  ${gridStyles}
  padding: 0 1.125rem 0.25rem;
  margin-top: 1.5rem;
`

const Wallets = styled.div`
  flex: 1 1 0%;
  position: relative;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.gray[700]};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.gray[600]};
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.palette.gray[500]};
  }
  ::-webkit-scrollbar-corner {
    background: ${({ theme }) => theme.palette.gray[700]};
  }
`

const WalletsWrapper = styled.div`
  flex: 1 1 0%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

const Balance = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  text-align: right;
  font-weight: 500;
  line-height: 1.5;

  svg {
    opacity: 0.5;
  }

  > span {
    margin-left: 0.375rem;

    > span {
      opacity: 0.5;
    }
  }
`

const WalletRow = styled.div`
  display: grid;
  ${gridStyles}
  margin: 0.375rem 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 0.125rem;
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  transition: color 50ms ease-out;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.gray['000'] : theme.palette.gray['500']};

  span,
  p {
    color: inherit;
    line-height: 1.25;
  }

  span {
    display: inline-flex;
    align-items: center;

    svg {
      margin-right: 0.375rem;
    }
  }

  &:hover,
  &:focus {
    color: ${({ theme, isActive }) =>
      isActive ? theme.palette.gray['000'] : theme.palette.gray['300']};
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(121, 255, 156, 0.5);
  }

  ${Balance} {
    span {
      > span {
        opacity: ${({ isActive }) => (isActive ? 0.5 : 0.68)};
      }
    }
  }
`
export function WalletView(props) {
  const { addresses } = useAlgodex()
  const { activeWalletAddress, isSignedIn, onConnectClick, onSetActiveWallet } = props

  const { t } = useTranslation('wallet')

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

  const handleKeyDown = (e, addr) => {
    if (e.key === 'Enter' || e.key === ' ') {
      !isWalletActive(addr) && onSetActiveWallet(addr)
    }
  }
  const copyAddress = (address) => {
    navigator.clipboard.writeText(address).then(
      () => {
        toast.success('Copied wallet address to clipboard!')
      },
      () => {
        toast.error('Failed to copy wallet address to clipboard')
      }
    )
  }

  // const renderBalance = (bal) => {
  //   const split = bal.toFixed(6).split('.')

  //   return (
  //     <Balance>
  //       <Icon color="gray" fillGradient="000" use="algoLogo" size={0.625} />
  //       <Typography fontWeight="500">
  //         {`${split[0]}.`}
  //         <span>{split[1]}</span>
  //       </Typography>
  //     </Balance>
  //   )
  // }

  const renderWallets = () => {
    return addresses?.map((wallet) => (
      <WalletRow
        key={wallet.address}
        tabIndex={isTabbable(wallet.address)}
        role="button"
        isActive={isWalletActive(wallet.address)}
        onClick={() => handleWalletClick(wallet)}
        onKeyDown={(e) => handleKeyDown(e, wallet.address)}
      >
        <Typography fontWeight="500" title={wallet.address}>
          <Icon
            color="gray"
            fillGradient="000"
            onClick={() => copyAddress(wallet.address)}
            use="wallet"
            size={0.75}
          />
          {wallet.name}
        </Typography>
        {/* {renderBalance(wallet?.amount)} */}
      </WalletRow>
    ))
  }

  const getButtonState = () => {
    onConnectClick()
  }

  const WalletButtonText =
    addresses?.length > 0 ? t('connect-another-wallet-button') : t('connect-wallet-button')

  return (
    <Section area="topRight">
      <Container>
        <ButtonContainer>
          <Button
            variant={getButtonVariant()}
            onClick={getButtonState}
            data-testid="connect-wallet-btn"
          >
            {WalletButtonText}
          </Button>
        </ButtonContainer>
        {isSignedIn ? (
          <>
            <Header>
              <Typography color="gray.500">{t('wallet')}</Typography>
              <Typography color="gray.500" textAlign="right">
                {t('balance')}
              </Typography>
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
            <Typography color="gray.100" m={0} mb={16}>
              {t('start-by')}
            </Typography>
            <Typography color="gray.500" m={0}>
              {t('once-connected')}
            </Typography>
          </EmptyState>
        )}
      </Container>
    </Section>
  )
}

WalletView.propTypes = {
  wallets: PropTypes.array.isRequired,
  activeWalletAddress: PropTypes.string,
  isSignedIn: PropTypes.bool,
  onConnectClick: PropTypes.func.isRequired,
  onSetActiveWallet: PropTypes.func.isRequired,
  area: PropTypes.string
}

WalletView.defaultProps = {
  isSignedIn: false
}

function WalletConnect(props) {
  const { connect } = useMyAlgoConnect()
  const { isConnected, wallet, setWallet, addresses } = useAlgodex()
  // console.log('!!!!!!!!!!!!!!!!', addresses)
  // fetch wallet balances from blockchain
  // const walletsQuery = useWalletsQuery({ wallets: walletAddresses })
  // useEffect(() => {
  //   if (wallet.data?.wallets) {
  //     setWallets(walletsQuery.data.wallets)
  //
  //     if (!isSignedIn) {
  //       setIsSignedIn(true)
  //     }
  //
  //     if (!walletAddresses.includes(activeWalletAddress)) {
  //       setActiveWalletAddress(walletsQuery.data.wallets[0].address)
  //     }
  //   }
  // }, [
  //   activeWalletAddress,
  //   isSignedIn,
  //   setActiveWalletAddress,
  //   setIsSignedIn,
  //   setWallets,
  //   walletAddresses,
  //   walletsQuery.data
  // ])
  return (
    // <div>Wallet Connect {isConnected ? 'Connected' : 'Not Connected'}</div>
    <WalletView
      wallets={addresses || []}
      activeWalletAddress={wallet?.address}
      isSignedIn={isConnected}
      onConnectClick={connect}
      onSetActiveWallet={setWallet}
      {...props}
    />
  )
}

export default WalletConnect
