import Head from 'next/head'
import dynamic from 'next/dynamic'
import theme from '../../theme'
import { default as DefaultHeader } from 'components/layout-page-header'
import Spinner from 'components/spinner'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Page = styled.div`
  display: flex;
  flex-direction: column;

  max-height: 100vh;
  height: 100vh;

  @media (min-width: 996px) {
    overflow: scroll;
    max-height: none;
  }
`

const Grid = styled.div`
  height: 100%;
  overflow: hidden;
  background-color: ${theme.colors.gray['900']};
`
const Row = styled.div`
  background-color: transparent;
  display: flex;
  width: 100%;
  transition: 'height 2s ease-out';
  height: ${({ height = '100%' }) => height};
`
const media = {
  xs: (styles) => `
    @media only screen and (max-width: 480px) {
      ${styles}
    }    
  `
}
const Col = styled.div`
  outline: 2px dashed blue;
  background-color: transparent;
  flex: ${({ size = 1 }) => size};
  ${({ collapse }) =>
    collapse &&
    media[collapse](`
    display: none;
  `)}
`
const CenterSpinner = styled.div`
  background-color: transparent;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const loading = () => (
  <CenterSpinner>
    <Spinner />
  </CenterSpinner>
)

export default function PageLayout({
  children,
  description,
  title,
  Header = DefaultHeader,
  headerProps,
  sidebarPromise = import('components/layout-page-sidebar'),
  sidebarProps,
  footerPromise = import('components/layout-page-footer'),
  footerProps,
  contentPromise = import('components/layout-page-content'),
  contentProps,
  controlsPromise = import('components/layout-page-controls'),
  controlsProps
}) {
  // Mock slow network or large components
  const longTest = (comp, delay) =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log('something')
        resolve(comp)
      }, delay)
    })

  // Import Components
  const Sidebar = dynamic(() => longTest(sidebarPromise, 1000), { loading })
  const Footer = dynamic(() => longTest(footerPromise, 2000), { loading })
  const Content = dynamic(() => longTest(contentPromise, 5000), { loading })
  const Controls = dynamic(() => longTest(controlsPromise, 5000), { loading })
  return (
    <Page>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
      </Head>
      <Header {...headerProps} />
      <Grid>
        <Row>
          {/* Search, Chart, Footer */}
          <Col size={2}>
            <Row height={'60%'}>
              <Row>
                <Col size={1} collapse="xs">
                  <Sidebar transitionIn={false} {...sidebarProps} />
                </Col>
                <Col size={2}>{children || <Content {...contentProps} />}</Col>
              </Row>
            </Row>
            <Row height={'40%'}>
              <Col size={1}>
                <Footer {...footerProps} />
              </Col>
            </Row>
          </Col>
          {/* Book, Controls, Wallet */}
          <Col collapse="xs">
            <Controls {...controlsProps} />
          </Col>
        </Row>
      </Grid>
    </Page>
  )
}

PageLayout.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.any]),
  Header: PropTypes.any,
  headerPromise: PropTypes.instanceOf(Promise),
  headerProps: PropTypes.any,
  sidebarPromise: PropTypes.instanceOf(Promise),
  sidebarProps: PropTypes.any,
  footerPromise: PropTypes.instanceOf(Promise),
  footerProps: PropTypes.any,
  contentPromise: PropTypes.instanceOf(Promise),
  contentProps: PropTypes.any,
  controlsPromise: PropTypes.instanceOf(Promise),
  controlsProps: PropTypes.any
}
