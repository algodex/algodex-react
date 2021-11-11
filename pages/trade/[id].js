import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { fetchAssetById } from 'lib/api'
import MainLayout from 'components/main-layout'
import Header from 'components/header'
import useStore from 'store/use-store'

import { Container } from 'styles/trade.css'

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

  // fetch asset from API
  const assetQuery = useQuery(['asset', { id }], () => fetchAssetById(id), {
    enabled: isValidId
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
    } else if (assetQuery.isError && assetQuery.error.message.match(404)) {
      router.push(`/trade/15322902`)
    }
  }, [asset, assetQuery, router, setAsset])

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

  return (
    <Container>
      <Head>
        <title>
          {asset?.name && `${asset.name} to ALGO `}Algodex | Algorand Decentralized Exchange
        </title>
        <meta name="description" content="Decentralized exchange for trading Algorand ASAs" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
      </Head>
      <Header />
      <MainLayout />
    </Container>
  )
}
