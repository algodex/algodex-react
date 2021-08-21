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
import useStore, { useStorePersisted } from 'store/use-store'
import { checkTestnetAccess } from 'lib/api'
import Cookies from 'cookies'

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
  const id = router.query.id
  const isValidId = /^\d+$/.test(id)

  useEffect(() => {
    if (id && !isValidId) {
      console.log('Redirecting to LAMP (15322902)...')
      router.push(`/trade/15322902`)
    }
  }, [id, isValidId, router])

  const { connect, addresses } = useMyAlgo()

  const wallets = useStorePersisted((state) => state.wallets)
  const setWallets = useStorePersisted((state) => state.setWallets)
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const setActiveWalletAddress = useStorePersisted((state) => state.setActiveWalletAddress)
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
  const assetQuery = useQuery(['asset', { id }], () => fetchAssetById(id), {
    enabled: isValidId
  })

  const asset = assetQuery.data?.asset
  const setAsset = useStore((state) => state.setAsset)

  useEffect(() => {
    if (assetQuery.isSuccess) {
      if (asset.isTraded) {
        setAsset(asset)
      } else {
        console.log('Redirecting to LAMP (15322902)...')
        router.push(`/trade/15322902`)
      }
    }
  }, [asset, assetQuery.isSuccess, router, setAsset])

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
        <title>
          {asset?.name && `${asset.name} to ALGO `}Algodex | Algorand Decentralized Exchange
        </title>
        <meta name="description" content="Decentralized exchange for trading Algorand ASAs" />
      </Head>
      <Header />
      {renderDashboard()}
    </Container>
  )
}

export async function getServerSideProps({ req, res, query }) {
  const cookies = new Cookies(req, res)

  if (query?.loginKey) {
    cookies.set('loginKey', query.loginKey)
  }

  // const hasGateAccess =
  //   process.env.NEXT_PUBLIC_VERCEL_URL === process.env.NEXT_PUBLIC_TESTNET_DOMAIN
  //     ? await checkTestnetAccess(query?.loginKey || cookies.get('loginKey'))
  //     : true

  const hasGateAccess = await checkTestnetAccess(query?.loginKey || cookies.get('loginKey'))

  if (!hasGateAccess) {
    return {
      redirect: {
        destination: '/restricted',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
