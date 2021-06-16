import { useQuery } from 'react-query'
import { fetchRecentTrades } from 'lib/api'
import Head from 'next/head'
import styled from 'styled-components'
import MainLayout from 'components/main-layout'
import Header from 'components/header'

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

export default function Home() {
  const { status, data, error } = useQuery('recentTrades', fetchRecentTrades)

  const recentTrades = data?.tradingPairs || []

  const formatPriceData = () => {
    return recentTrades.map((pair) => ({
      name: pair.asset_info.params['unit-name'],
      price: parseFloat(parseFloat(pair.asaPrice).toFixed(3)),
      change: 0
    }))
  }

  const renderDashboard = () => {
    if (status === 'loading') return <h1>Loading...</h1>
    if (status === 'error') return <span>Error: {error.message}</span>

    return <MainLayout assetsPriceData={formatPriceData()} />
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
