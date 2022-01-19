import styled from 'styled-components'
import Head from 'next/head'
import Header from 'components/Nav/Header'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.dark};
  color: ${({ theme }) => theme.colors.gray['400']};
`

/**
 * 500 Error
 * TODO: Add in  <MainLayout/>
 * @returns {JSX.Element}
 * @constructor
 */
export default function Custom500() {
  return (
    <>
      <Head>
        <title>Server Error</title>
      </Head>
      <Header />
      <Container>
        <h1>500 - Service Error</h1>
      </Container>
    </>
  )
}
