import { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { fetchAssetById } from 'lib/api'
import MainLayout from 'components/main-layout'
import Header from 'components/header'
import Spinner from 'components/spinner'
import Error from 'components/error'
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
  const { status, data } = useQuery(['asset', { id: 15322902 }], () => fetchAssetById(15322902))

  const asset = useStore((state) => state.asset)
  const setAsset = useStore((state) => state.setAsset)

  useEffect(() => {
    if (data?.asset) {
      setAsset(data.asset)
    }
  }, [asset, setAsset, data])

  const renderDashboard = () => {
    const isError = status === 'error'
    const isLoading = status === 'loading' || (!isError && !asset.price)

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

    return <MainLayout />
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
