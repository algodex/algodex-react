import { useContext, useEffect, useState } from 'react'
import useWallets, { WalletsContext } from '@/hooks/useWallets'

import { Box } from '@mui/material'
import Icon from 'components/Icon/Icon'
import PropTypes from 'prop-types'
import { Section } from '@/components/Layout/Section'
// import SvgImage from 'components/SvgImage'
import Typography from '@mui/material/Typography'
import convertFromBaseUnits from '@algodex/algodex-sdk/lib/utils/units/fromBaseUnits'
import styled from '@emotion/styled'
import toast from 'react-hot-toast'
import { truncatedWalletAddress } from '@/components/helpers'
import { useAlgodex } from '@algodex/algodex-hooks'
import useTranslation from 'next-translate/useTranslation'

// import useWallets from '@/hooks/useWallets'

const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.background.dark};
  padding: 0rem 0 1rem;
`

// const ButtonContainer = styled.div`
//   flex-shrink: 0%;
//   display: flex;
//   width: 100%;

//   button {
//     flex-grow: 1;
//     margin: 0 1.125rem;
//   }
// `

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

// const Arrow = styled.div`
//   position: absolute;
//   top: 0.5rem;
//   left: 0.375rem;
// `

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

const Balance = styled.div`
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
  // const [isConnectingAddress, setIsConnectingAddress] = useState(false)
  const { activeWalletAddress, isSignedIn, addresses, onSetActiveWallet } = props

  const { t } = useTranslation('wallet')

  const { peraConnect, myAlgoConnect } = useWallets()

  const walletReconnectorMap = {
    'my-algo-wallet': myAlgoConnect,
    'wallet-connect': peraConnect
  }

  // const getButtonVariant = () => {
  //   return isSignedIn ? 'default' : 'primary'
  // }

  const isWalletActive = (addr) => {
    return activeWalletAddress?.address === addr
  }

  const isTabbable = (addr) => {
    return isWalletActive(addr) ? -1 : 0
  }

  const handleWalletClick = async (addr) => {
    !isWalletActive(addr) && onSetActiveWallet(addr)
  }

  useEffect(() => {
    if (
      typeof activeWalletAddress !== 'undefined' &&
      typeof activeWalletAddress?.connector?.sign === 'undefined'
    ) {
      walletReconnectorMap[activeWalletAddress.type]()
    }
  }, [activeWalletAddress])

  useEffect(() => {
    if (typeof activeWalletAddress !== 'undefined' && addresses.length > 0) {
      const targetWallet = addresses.filter(
        (addr) => addr.address === activeWalletAddress.address
      )[0]
      if (typeof targetWallet?.connector?.sign !== 'undefined') onSetActiveWallet(targetWallet)
    }
  }, [addresses])

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

  const renderBalance = (bal) => {
    const split = bal.toFixed(6).split('.')

    return (
      <Balance>
        <Box mr={0.5} mt={0.4}>
          <Icon color="gray" fillGradient="000" use="algoLogo" size={0.625} />
        </Box>
        <Box>
          <Typography variant="body_small" fontWeight="bold">{`${split[0]}.`}</Typography>
          <Typography variant="body_small" fontWeight="bold">
            {split[1]}
          </Typography>
        </Box>
      </Balance>
    )
  }

  const renderWallets = () => {
    return addresses.map((wallet) => (
      <WalletRow
        key={wallet.address}
        tabIndex={isTabbable(wallet.address)}
        role="button"
        isActive={isWalletActive(wallet.address)}
        onClick={() => handleWalletClick(wallet)}
        onKeyDown={(e) => handleKeyDown(e, wallet.address)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Icon
            fillGradient="000"
            onClick={() => copyAddress(wallet.address)}
            use="wallet"
            size={0.75}
          />
          &nbsp;
          <Typography variant="body_small" fontWeight="bold" title={wallet.address}>
            {truncatedWalletAddress(wallet.address, 4)}
          </Typography>
        </Box>

        {renderBalance(convertFromBaseUnits(wallet.amount))}
      </WalletRow>
    ))
  }

  // const getButtonState = () => {
  //   onConnectClick()
  // }
  // const WalletButtonText =
  //   addresses?.length > 0 ? t('connect-another-wallet-button') : t('connect-wallet-button')
  return (
    <Section area="topRight">
      <Container>
        {isSignedIn ? (
          <>
            <Header>
              <Typography
                sx={{
                  textTransform: 'uppercase'
                }}
                variant="body_tiny"
                color="gray.500"
              >
                {t('wallet')}
              </Typography>
              <Typography
                sx={{
                  textTransform: 'uppercase'
                }}
                variant="body_tiny"
                color="gray.500"
                textAlign="right"
              >
                {t('balance')}
              </Typography>
            </Header>
            <Wallets>
              <WalletsWrapper>{renderWallets()}</WalletsWrapper>
            </Wallets>
          </>
        ) : (
          <EmptyState p={3}>
            {/* <Arrow>
              <SvgImage use="walletArrow" h={4} color="gray.600" />
            </Arrow> */}
            <Typography variant="h5" color="gray.100" m={0} mb={4}>
              {t('start-by')}
            </Typography>
            <Typography variant="subtitle_small" color="gray.500" m={0}>
              {t('once-connected')}
            </Typography>
          </EmptyState>
        )}
      </Container>
    </Section>
  )
}

WalletView.propTypes = {
  addresses: PropTypes.array.isRequired,
  activeWalletAddress: PropTypes.string,
  isSignedIn: PropTypes.bool,
  onConnectClick: PropTypes.func.isRequired,
  onSetActiveWallet: PropTypes.func.isRequired,
  area: PropTypes.string
}

WalletView.defaultProps = {
  isSignedIn: false
}

/**
 * @todo Merge WalletView into WalletConnect
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function WalletConnect(props) {
  const { wallet, setWallet } = useAlgodex() // useAlgodex does not return a wallet, even when wallet is present in local storage
  const [addresses] = useContext(WalletsContext)
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    if (addresses.length > 0) {
      setSignedIn(true)
      setWallet(addresses[0])
    }
  }, [addresses])

  return (
    <WalletView
      addresses={addresses}
      activeWalletAddress={wallet}
      isSignedIn={signedIn}
      onSetActiveWallet={setWallet}
      {...props}
    />
  )
}

export default WalletConnect
