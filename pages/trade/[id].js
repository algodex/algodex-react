import { useEffect, useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
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

import { Container, StatusContainer } from 'styles/trade.css'

export default function Home() {
  const router = useRouter()
  const id = router.query.id
  const isValidId = /^\d+$/.test(id)

  // Redirect to LAMP if `id` is invalid (contains non-numerical characters)
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
  const assetStore = useStore((state) => state.asset)

  const walletAddresses = useMemo(() => {
    if (!!addresses) {
      return addresses
    }
    return !!wallets ? wallets.map((w) => w.address) : []
  }, [addresses, wallets])

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
    enabled: isValidId,
    refetchInterval: 3000
  })

  const asset = assetQuery.data?.asset
  const setAsset = useStore((state) => state.setAsset)

  useEffect(() => {
    if (assetQuery.isSuccess) {
      if (asset.id) {
        setAsset(asset)
      } else {
        console.log('Redirecting to LAMP (15322902)...')
        router.push(`/trade/15322902`)
      }
    }
  }, [asset, assetQuery.isSuccess, router, setAsset])

  // for determining whether to poll order book endpoint
  const hasBeenOrdered = asset?.isTraded || asset?.hasOrders

  // fetch order book for current asset
  // this query is dependent on asset.id being defined
  // and hasBeenOrdered being true
  const orderBookQuery = useQuery(
    ['orderBook', { assetId: asset?.id }],
    () => fetchOrdersInEscrow(asset?.id),
    {
      enabled: !!asset?.id && hasBeenOrdered,
      refetchInterval: 5000
    }
  )

  useEffect(() => {
    if (orderBookQuery.data) {
      setOrderBook(orderBookQuery.data)
    }
  }, [orderBookQuery.data, setOrderBook])

  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    const resize = () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    // We listen to the resize event
    window.addEventListener('resize', resize)

    return () => window.removeEventListener('resize', resize)
  }, [])

  const renderDashboard = () => {
    // @todo: investigate using React Query's queryCache instead of saving to Zustand store
    const isAssetStored = assetStore?.id

    const isLoading =
      assetQuery.isLoading || orderBookQuery.isLoading || (!assetQuery.isError && !isAssetStored)
    const isError = assetQuery.isError || orderBookQuery.isError

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
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"></meta>
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

  const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  const TESTNET_DOMAIN = process.env.NEXT_PUBLIC_TESTNET_DOMAIN

  const hasGateAccess = true //await checkTestnetAccess(query?.loginKey || cookies.get('loginKey'))

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
