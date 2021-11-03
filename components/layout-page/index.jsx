import { useEffect, useRef } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import useMyAlgo from 'hooks/use-my-algo'

// import { Container } from 'styles/trade.css'
import Spinner from 'components/spinner'
import styled from 'styled-components'

export const Page = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  max-height: calc(var(--vh, 1vh) * 100);
  height: calc(var(--vh, 1vh) * 100);

  @media (min-width: 996px) {
    overflow: scroll;
    max-height: none;
  }
`

export const PageWrapper = styled.div`
  position: relative;
  height: calc(var(--vh, 1vh) * 100);
  min-height: 500px;

  @media (min-width: 996px) {
    min-height: 100%;
    height: auto;
  }
`
const Grid = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: hidden scroll;
  height: calc(var(--vh, 1vh) * 100);


  @media (min-width: 996px) {
    height: 100%;
    min-height: 900px;
    display: grid;
    grid-template-columns: 1fr 1fr 280px;
    grid-template-rows: 240px 200px 300px 300px;
    grid-template-areas:
      'chart chart wallet'
      'chart chart trade'
      'book history trade'
      'orders orders trade';

    & > section {
      // for demo
      &.demo {
        border: 1px dotted rgba(255, 255, 255, 0.125);
      }
    }
  }

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'chart book wallet'
      'chart book trade'
      'orders history trade';
  }

  @media (min-width: 1536px) {
    grid-template-columns: 1fr 3fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'chart chart book wallet'
      'chart chart book trade'
      'orders orders history trade';
  }

}
`

export default function PageLayout({
  children,
  description,
  title,
  headerPromise = import('components/layout-page-header'),
  headerProps,
  sidebarPromise = import('components/layout-page-sidebar'),
  sidebarProps,
  footerPromise = import('components/layout-page-footer'),
  footerProps,
  contentPromise = import('components/layout-page-content'),
  contentProps
}) {
  const { connect } = useMyAlgo()
  console.log('Redraw')
  const gridRef = useRef()
  const longTest = (comp) =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log('something')
        resolve(comp)
      }, 1000)
    })
  const Header = dynamic(() => longTest(headerPromise), { loading: Spinner })
  const Sidebar = dynamic(() => longTest(sidebarPromise), { loading: Spinner })
  const Footer = dynamic(() => longTest(footerPromise), { loading: Spinner })
  const Content = dynamic(() => longTest(contentPromise), { loading: Spinner })
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
    <Page>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"></meta>
      </Head>
      <Header {...headerProps} />
      <Grid ref={gridRef}>
        <PageWrapper>
          {/*{children}*/}
          <Content {...contentProps} />
          <Sidebar {...sidebarProps} />
          <Footer {...footerProps} />
        </PageWrapper>
      </Grid>
    </Page>
  )
}
