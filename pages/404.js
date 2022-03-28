import styled from '@emotion/styled'
import Head from 'next/head'
import Header from 'components/Nav/Header'
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.dark};
  color: ${({ theme }) => theme.palette.gray['400']};
`
/**
 * Custom 404 Error
 * TODO: Add in  <MainLayout/>
 * @returns {JSX.Element}
 * @constructor
 */
export default function Custom404() {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <Header />
      <Container>
        <h1>404 - Page Not Found</h1>
      </Container>
    </>
  )
}
