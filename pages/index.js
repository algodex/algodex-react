import Head from 'next/head'
import styled from 'styled-components'
<<<<<<< HEAD
import Welcome from '../components/welcome'
import Header from '../components/header'
=======
import MainLayout from 'components/MainLayout'
>>>>>>> development

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  height: 100vh;

  // for demo
  p {
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

const Header = styled.header`
  // for demo
  height: 80px;
`

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Algodex | Algorand Decentralized Exchange</title>
        <meta name="description" content="Decentralized exchange for trading Algorand ASAs" />
      </Head>
      <Header />

      <Header>
        <p>Header</p>
      </Header>
      <MainLayout />
    </Container>
  )
}
