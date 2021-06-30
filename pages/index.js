import { useEffect, useMemo } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { fetchAssetById } from 'lib/api'
import WalletService from 'services/wallet'
import MainLayout from 'components/main-layout'
import Header from 'components/header'
import Spinner from 'components/spinner'
import Error from 'components/error'
import useMyAlgo from 'hooks/use-my-algo'
import useStore from 'store/use-store'

const Container = styled.div`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  // for demo
  p.demo {
    flex: 1 1 0%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 0;
    color: ${({ theme }) => theme.colors.gray['600']};
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
  }
`

const StatusContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
`

export default function Home() {
  const { connect, addresses } = useMyAlgo()

  const wallets = useStore((state) => state.wallets)
  const setWallets = useStore((state) => state.setWallets)
  const activeWalletAddress = useStore((state) => state.activeWalletAddress)
  const setActiveWalletAddress = useStore((state) => state.setActiveWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)
  const setIsSignedIn = useStore((state) => state.setIsSignedIn)

  const walletAddresses = useMemo(
    () => addresses || wallets.map((w) => w.address) || [],
    [addresses, wallets]
  )

  const { data: walletData, refetch } = useQuery(
    'wallets',
    () => WalletService.fetchWallets(walletAddresses),
    { refetchInterval: 5000 }
  )

  useEffect(() => {
    if (walletData?.wallets) {
      setWallets(walletData.wallets)

      if (!isSignedIn) {
        setIsSignedIn(true)
      }

      if (!walletAddresses.includes(activeWalletAddress)) {
        setActiveWalletAddress(walletData.wallets[0].address)
      }
    }
  }, [
    activeWalletAddress,
    walletData,
    isSignedIn,
    setActiveWalletAddress,
    setIsSignedIn,
    setWallets,
    walletAddresses
  ])

  const { status: assetStatus, data: assetData } = useQuery(['asset', { id: 15322902 }], () =>
    fetchAssetById(15322902)
  )

  const asset = useStore((state) => state.asset)
  const setAsset = useStore((state) => state.setAsset)

  useEffect(() => {
    if (assetData?.asset) {
      setAsset(assetData.asset)
    }
  }, [assetData, setAsset])

  const renderDashboard = () => {
    const isError = assetStatus === 'error'
    const isLoading = assetStatus === 'loading' || (!isError && !asset.price)

    if (isLoading) {
      return (
        <StatusContainer>
          <Spinner flex />
        </StatusContainer>
      )
    }
    if (isError) {
      return (
        <StatusContainer>
          <Error message="Error loading trading pair" flex />
        </StatusContainer>
      )
    }

    return <MainLayout onWalletConnect={connect} refetchWallets={refetch} />
  }
  return (
    <Container>
      <Head>
        <title>Algodex | Algorand Decentralized Exchange</title>
        <meta name="description" content="Decentralized exchange for trading Algorand ASAs" />
      </Head>
      <Header />

      {renderDashboard()}
    </Container>
  )
}
