import { useEffect } from 'react'
// import PropTypes from 'prop-types'
import { HeaderSm, BodyCopySm, BodyCopyTiny, LabelMd } from 'components/type'
import Button from 'components/button'
import Icon from 'components/icon'
import SvgImage from 'components/svg-image'
import useMyAlgo from 'hooks/use-my-algo'
import useStore from 'store/use-store'
import AlgorandClient from 'services/algosdk-client'
import { convertAmount } from 'services/convert'

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

export default function Wallet() {
  const { connect, addresses } = useMyAlgo()

  const wallets = useStore((state) => state.wallets)
  const activeWalletAddress = useStore((state) => state.activeWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)

  const setWallets = useStore((state) => state.setWallets)
  const setActiveWallet = useStore((state) => state.setActiveWallet)
  // const signOut = useStore((state) => state.signOut)

  const truncateAddress = (addr) => {
    return `${addr.substr(0, 4)}...${addr.substr(addr.length - 4)}`
  }

  useEffect(() => {
    const onMyAlgoConnect = async () => {
      try {
        const promises = addresses.map(async (address) => {
          const accountInfo = await AlgorandClient.accountInformation(address).do()
          return {
            address,
            name: truncateAddress(address),
            balance: convertAmount(accountInfo.amount),
            assets: accountInfo.assets.reduce(
              (result, asset) => ({
                ...result,
                [asset['asset-id']]: {
                  balance: convertAmount(asset.amount)
                }
              }),
              {}
            )
          }
        })

        const result = await Promise.all(promises)
        setWallets(result)
      } catch (e) {
        console.error(e.message)
      }
    }

    addresses && onMyAlgoConnect(addresses)
  }, [addresses, setWallets])

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
    !isWalletActive(addr) && setActiveWallet(addr)
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
        <Button variant={getButtonVariant()} onClick={connect} data-testid="connect-wallet-btn">
          Connect Wallet
        </Button>
      </ButtonContainer>
      {isSignedIn ? (
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
