import { useEffect, useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { fetchAssetById } from 'lib/api'
import { fetchOrdersInEscrow } from 'lib/api'
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
  const router = useRouter()
  const id = Number(router.query.id)

  const { connect, addresses } = useMyAlgo()

  const wallets = useStore((state) => state.wallets)
  const setWallets = useStore((state) => state.setWallets)
  const activeWalletAddress = useStore((state) => state.activeWalletAddress)
  const setActiveWalletAddress = useStore((state) => state.setActiveWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)
  const setIsSignedIn = useStore((state) => state.setIsSignedIn)
  const setOrderBook = useStore((state) => state.setOrderBook)

  const walletAddresses = useMemo(
    () => addresses || wallets.map((w) => w.address) || [],
    [addresses, wallets]
  )

  // fetch wallet balances from blockchain
  const walletsQuery = useQuery('wallets', () => WalletService.fetchWallets(walletAddresses), {
    refetchInterval: 5000
  })

  useEffect(() => {
    if (walletsQuery.data?.wallets) {
      setWallets(walletsQuery.data.wallets)

      if (!isSignedIn) {
        setIsSignedIn(true)
      }

      if (!walletAddresses.includes(activeWalletAddress)) {
        setActiveWalletAddress(walletsQuery.data.wallets[0].address)
      }
    }
  }, [
    activeWalletAddress,
    isSignedIn,
    setActiveWalletAddress,
    setIsSignedIn,
    setWallets,
    walletAddresses,
    walletsQuery.data
  ])

  // fetch asset from API
  const assetQuery = useQuery(['asset', { id }], () => fetchAssetById(id))

  const asset = assetQuery.data?.asset
  const setAsset = useStore((state) => state.setAsset)

  useEffect(() => {
    asset && setAsset(asset)
  }, [asset, setAsset])

  // fetch order book for current asset
  // this query is dependent on asset.id being defined
  const orderBookQuery = useQuery(
    ['orderBook', { assetId: asset?.id }],
    () => fetchOrdersInEscrow(asset?.id),
    { enabled: !!asset?.id, refetchInterval: 5000 }
  )

  useEffect(() => {
    if (orderBookQuery.data) {
      setOrderBook(orderBookQuery.data, asset?.decimals)
    }
  }, [orderBookQuery.data, setOrderBook, asset])

  const renderDashboard = () => {
    const isError = assetQuery.isError || orderBookQuery.isError
    const isLoading = assetQuery.isLoading || orderBookQuery.isLoading || !asset?.id

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
          <Error message="Error loading exchange data" flex />
        </StatusContainer>
      )
    }

    return <MainLayout onWalletConnect={connect} refetchWallets={walletsQuery.refetch} />
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
