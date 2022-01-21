import { Fragment, useState } from 'react'
import { HeaderLg, HeaderSm } from 'components/Typography'
import styled, { css } from 'styled-components'
import { useStore, useStorePersisted } from '../store/use-store'

import AssetOrderBook from 'components/Asset/OrderBook'
import AssetTradeHistory from 'components/Asset/TradeHistory'
import Button from 'components/Button'
import { Controls as DefaultControls } from './Controls'
import NavSearchSidebar from 'components/Nav/SearchSidebar'
import PlaceOrder from './Wallet/PlaceOrder'
import PropTypes from 'prop-types'
import Spinner from 'components/Spinner'
import SvgImage from 'components/SvgImage'
import WalletConnect from './Wallet/Connect/WalletConnect'
import WalletTabs from 'components/Wallet/WalletTabs'
import { useEvent } from 'hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'

export const FlexContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const FlexColumn = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
`

const DefaultContent = styled.section`
  grid-area: content;
  position: relative;
  border: dashed;
  border-color: green;
  height: auto;
`

export const Grid = styled.main`
  position: relative;
  display: grid;
  grid-template-columns: none;
  grid-auto-columns: auto;

  overflow: hidden;

  height: 100%;
  width: 100%;

  ${({
    sidebarExpanded,
    sidebarCollapsed,
    controlsCollapsed,
    controlsExpanded,
    footerCollapsed,
    rowHeight
  }) => {
    const footer = footerCollapsed === false
    const controls = controlsCollapsed === false
    const sidebar = sidebarCollapsed === false

    const withoutFooter = !footer && sidebar && controls
    const withoutSidebar = footer && !sidebar && controls
    const withoutControls = footer && sidebar && !controls

    const withFooterOnly = footer && !sidebar && !controls
    const withSidebarOnly = !footer && sidebar && !controls
    const withControlsOnly = !footer && !sidebar && controls

    const withEverything = footer && sidebar && controls
    const withoutEverything = !footer && !sidebar && !controls

    const withExpandedControls = controls && controlsExpanded
    const withExpandedSidebar = sidebar && sidebarExpanded

    // Without footer we use a three column layout and return
    if (withoutFooter) {
      return css`
        @media (max-width: 996px) {
          grid-template-columns: 1fr;
          grid-template-rows: 100%;
          grid-template-areas:
            'content'
            'footer';
        }
        @media (min-width: 996px) {
          grid-template-columns: 1fr 1fr 280px;
          grid-template-rows: 240px 200px 300px 300px;
          grid-template-areas:
            'content content controls'
            'content content controls'
            'footer footer controls'
            'footer footer controls';
        }

        @media (min-width: 1024px) {
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 100%;
          grid-template-areas: 'content controls controls';
        }
        @media (min-width: 1536px) {
          grid-template-columns: 1fr 3fr 1fr 1fr;
          grid-template-rows: 100%;
          grid-template-areas: 'sidebar content controls controls';
        }
      `
    }
    if (withFooterOnly) {
      return css`
        @media (max-width: 996px) {
          grid-template-columns: 1fr;
          grid-template-rows: 100%;
          grid-template-areas:
            'content'
            'footer';
        }
        @media (min-width: 996px) {
          grid-template-columns: 1fr 1fr 280px;
          grid-template-rows: 240px 200px 300px 300px;
          grid-template-areas:
            'content content controls'
            'content content controls'
            'footer footer controls'
            'footer footer controls';
        }
        @media (min-width: 1024px) {
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          grid-template-areas:
            'content controls controls'
            'content controls controls'
            'footer footer footer';
        }
        @media (min-width: 1536px) {
          grid-template-columns: 1fr 3fr 1fr 1fr;
          grid-template-rows: ${`${rowHeight}% ${100 - rowHeight}%`};
          grid-template-areas:
            'content content content content'
            'footer footer footer footer';
        }
      `
    }

    if (withoutSidebar) {
      // Expanded Controls
      if (withExpandedControls) {
        return css`
          @media (max-width: 996px) {
            grid-template-columns: 1fr;
            grid-template-rows: 100%;
            grid-template-areas:
              'content'
              'footer';
          }
          @media (min-width: 996px) {
            grid-template-columns: 1fr 1fr 280px;
            grid-template-rows: 240px 200px 300px 300px;
            grid-template-areas:
              'content content controls'
              'content content controls'
              'footer footer controls';
          }
          @media (min-width: 1024px) {
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-template-areas:
              'content controls controls'
              'content controls controls'
              'footer controls controls';
          }
          @media (min-width: 1536px) {
            grid-template-columns: 1fr 3fr 1fr 1fr;
            grid-template-rows: ${`${rowHeight}% ${100 - rowHeight}%`};
            grid-template-areas:
              'content content controls controls'
              'footer footer controls controls';
          }
        `
      } else {
        return css`
          @media (max-width: 996px) {
            grid-template-columns: 1fr;
            grid-template-rows: 100%;
            grid-template-areas:
              'content'
              'footer';
          }
          @media (min-width: 996px) {
            grid-template-columns: 1fr 1fr 280px;
            grid-template-rows: 240px 200px 300px 300px;
            grid-template-areas:
              'content content controls'
              'content content controls'
              'footer footer controls'
              'footer footer controls';
          }
          @media (min-width: 1024px) {
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-template-areas:
              'content controls controls'
              'content controls controls'
              'footer footer footer';
          }
          @media (min-width: 1536px) {
            grid-template-columns: 1fr 3fr 1fr 1fr;
            grid-template-rows: ${`${rowHeight}% ${100 - rowHeight}%`};
            grid-template-areas:
              'content content controls controls'
              'footer footer footer footer';
          }
        `
      }
    }
    if (withSidebarOnly) {
      return css`
        @media (max-width: 996px) {
          grid-template-columns: 1fr;
          grid-template-rows: 100%;
          grid-template-areas:
            'content'
            'footer';
        }
        @media (min-width: 996px) {
          grid-template-columns: 1fr 1fr 280px;
          grid-template-rows: 240px 200px 300px 300px;
          grid-template-areas:
            'content content controls'
            'content content controls'
            'footer footer controls'
            'footer footer controls';
        }
        @media (min-width: 1024px) {
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          grid-template-areas:
            'content controls controls'
            'content controls controls'
            'footer footer footer';
        }
        @media (min-width: 1536px) {
          grid-template-columns: 1fr 3fr 1fr 1fr;
          grid-template-rows: 100%;
          grid-template-areas: 'sidebar content content content';
        }
      `
    }

    if (withoutControls) {
      if (withExpandedSidebar) {
        return css`
          @media (max-width: 996px) {
            grid-template-columns: 1fr;
            grid-template-rows: 100%;
            grid-template-areas:
              'content'
              'footer';
          }
          @media (min-width: 996px) {
            grid-template-columns: 1fr 1fr 280px;
            grid-template-rows: 240px 200px 300px 300px;
            grid-template-areas:
              'content content controls'
              'content content controls'
              'footer footer controls'
              'footer footer controls';
          }
          @media (min-width: 1024px) {
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-template-areas:
              'content controls controls'
              'content controls controls'
              'footer footer footer';
          }
          @media (min-width: 1536px) {
            grid-template-columns: 1fr 3fr 1fr 1fr;
            grid-template-rows: ${`${rowHeight}% ${100 - rowHeight}%`};
            grid-template-areas:
              'sidebar content content content'
              'sidebar footer footer footer';
          }
        `
      } else {
        return css`
          @media (max-width: 996px) {
            grid-template-columns: 1fr;
            grid-template-rows: 100%;
            grid-template-areas:
              'content'
              'footer';
          }
          @media (min-width: 996px) {
            grid-template-columns: 1fr 1fr 280px;
            grid-template-rows: 240px 200px 300px 300px;
            grid-template-areas:
              'content content controls'
              'content content controls'
              'footer footer controls'
              'footer footer controls';
          }
          @media (min-width: 1024px) {
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-template-areas:
              'content controls controls'
              'content controls controls'
              'footer footer footer';
          }
          @media (min-width: 1536px) {
            grid-template-columns: 1fr 3fr 1fr 1fr;
            grid-template-rows: ${`${rowHeight}% ${100 - rowHeight}%`};
            grid-template-areas:
              'sidebar content content content'
              'footer footer footer footer';
          }
        `
      }
    }

    if (withControlsOnly) {
      return css`
        @media (max-width: 996px) {
          grid-template-columns: 1fr;
          grid-template-rows: 100%;
          grid-template-areas:
            'content'
            'footer';
        }
        @media (min-width: 996px) {
          grid-template-columns: 1fr 1fr 280px;
          grid-template-rows: 240px 200px 300px 300px;
          grid-template-areas:
            'content content controls'
            'content content controls'
            'footer footer controls'
            'footer footer controls';
        }
        @media (min-width: 1024px) {
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          grid-template-areas:
            'content controls controls'
            'content controls controls'
            'footer footer footer';
        }
        @media (min-width: 1536px) {
          grid-template-columns: 1fr 3fr 1fr 1fr;
          grid-template-rows: 100%;
          grid-template-areas: 'content content controls controls';
        }
      `
    }
    if (withEverything) {
      if (withExpandedSidebar && withExpandedControls) {
        return css`
          @media (max-width: 996px) {
            grid-template-columns: 1fr;
            grid-template-rows: 100%;
            grid-template-areas:
              'content'
              'footer';
          }
          @media (min-width: 996px) {
            grid-template-columns: 1fr 1fr 280px;
            grid-template-rows: 240px 200px 300px 300px;
            grid-template-areas:
              'content content controls'
              'content content controls'
              'footer footer controls'
              'footer footer controls';
          }
          @media (min-width: 1024px) {
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-template-areas:
              'content controls controls'
              'content controls controls'
              'footer footer footer';
          }
          @media (min-width: 1536px) {
            grid-template-columns: 1fr 3fr 1fr 1fr;
            grid-template-rows: ${`${rowHeight}% ${100 - rowHeight}%`};
            grid-template-areas:
              'sidebar content controls controls'
              'sidebar footer controls controls';
          }
        `
      }
      if (withExpandedSidebar && !withExpandedControls) {
        return css`
          @media (max-width: 996px) {
            grid-template-columns: 1fr;
            grid-template-rows: 100%;
            grid-template-areas:
              'content'
              'footer';
          }
          @media (min-width: 996px) {
            grid-template-columns: 1fr 1fr 280px;
            grid-template-rows: 240px 200px 300px 300px;
            grid-template-areas:
              'content content controls'
              'content content controls'
              'footer footer controls'
              'footer footer controls';
          }
          @media (min-width: 1024px) {
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-template-areas:
              'content controls controls'
              'content controls controls'
              'footer footer footer';
          }
          @media (min-width: 1536px) {
            grid-template-columns: 1fr 3fr 1fr 1fr;
            grid-template-rows: ${`${rowHeight}% ${100 - rowHeight}%`};
            grid-template-areas:
              'sidebar content controls controls'
              'sidebar footer footer footer';
          }
        `
      }
      if (!withExpandedSidebar && withExpandedControls) {
        return css`
          @media (max-width: 996px) {
            grid-template-columns: 1fr;
            grid-template-rows: 100%;
            grid-template-areas:
              'content'
              'footer';
          }
          @media (min-width: 996px) {
            grid-template-columns: 1fr 1fr 280px;
            grid-template-rows: 240px 200px 300px 300px;
            grid-template-areas:
              'content content controls'
              'content content controls'
              'footer footer controls'
              'footer footer controls';
          }
          @media (min-width: 1024px) {
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-template-areas:
              'content controls controls'
              'content controls controls'
              'footer controls controls';
          }
          @media (min-width: 1536px) {
            grid-template-columns: 1fr 3fr 1fr 1fr;
            grid-template-rows: ${`${rowHeight}% ${100 - rowHeight}%`};
            grid-template-areas:
              'sidebar content controls controls'
              'footer footer controls controls';
          }
        `
      }

      // Return unexpanded
      return css`
        @media (max-width: 996px) {
          grid-template-columns: 1fr;
          grid-template-rows: 100%;
          grid-template-areas:
            'content'
            'footer';
        }
        @media (min-width: 996px) {
          grid-template-columns: 1fr 1fr 280px;
          grid-template-rows: 240px 200px 300px 300px;
          grid-template-areas:
            'content content controls'
            'content content controls'
            'footer footer controls'
            'footer footer controls';
        }
        @media (min-width: 1024px) {
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          grid-template-areas:
            'content controls controls'
            'content controls controls'
            'footer footer footer';
        }
        @media (min-width: 1536px) {
          grid-template-columns: 1fr 3fr 1fr 1fr;
          grid-template-rows: ${`${rowHeight}% ${100 - rowHeight}%`};
          grid-template-areas:
            'sidebar content controls controls'
            'footer footer footer footer';
        }
      `
    }

    if (withoutEverything) {
      return css`
        @media (max-width: 996px) {
          grid-template-columns: 1fr;
          grid-template-rows: 100%;
          grid-template-areas:
            'content'
            'footer';
        }
        @media (min-width: 996px) {
          grid-template-columns: 1fr 1fr 280px;
          grid-template-rows: 240px 200px 300px 300px;
          grid-template-areas:
            'content content controls'
            'content content controls'
            'footer footer controls'
            'footer footer controls';
        }
        @media (min-width: 1024px) {
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          grid-template-areas:
            'content controls controls'
            'content controls controls'
            'footer footer footer';
        }
        @media (min-width: 1536px) {
          grid-template-columns: 1fr 3fr 1fr 1fr;
          grid-template-rows: 100%;
          grid-template-areas: 'content content content content';
        }
      `
    }

    throw new Error('No valid layout state!!!')
  }}
`

const MobileMenu = styled.nav`
  height: 50px;
  width: 100%;

  & > ul {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  & > ul > li {
    flex: 1 0 auto;
    height: 100%;
  }

  z-index: 99;

  @media (min-width: 996px) {
    display: none;
  }
`

const MobileMenuButton = styled(Button)`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray['800']};
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.gray['700']};
  max-width: ${({ characterLength }) => (characterLength > 8 ? '4rem' : '7rem')};
  min-width: ${({ characterLength }) => (characterLength > 8 ? '3.5rem' : '3.5rem')};
  font-size: ${({ characterLength }) => (characterLength > 6 ? '10px' : '0.875rem')};
  overflow-wrap: anywhere;
`

const Container = styled.div`
  height: 100%;
  background: url('/coming-soon-bg.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    display: none;
  }
`

const TypeContainer = styled.div`
  padding: 15vh 2rem 0;
  text-align: center;
`

const LogoContainer = styled.div`
  padding: 4rem;
`

export function MobileInterface() {
  return (
    <Container>
      <TypeContainer>
        <HeaderLg fontSize="3.25rem" fontWeight="800" color="gray.000" mb={4}>
          Coming soon
        </HeaderLg>
        <HeaderSm as="p" fontSize="1.25rem" fontWeight="500" letterSpacing="0" color="gray.000">
          The Algodex mobile experience will be available in a later release.
        </HeaderSm>
      </TypeContainer>
      <LogoContainer>
        <SvgImage use="logoLg" w={7.5} />
      </LogoContainer>
    </Container>
  )
}

/**
 * @param asset
 * @param children
 * @param components
 * @returns {JSX.Element}
 * @constructor
 */
export function Layout({
  asset,
  children,
  components,
  rowHeight,
  sidebarCollapsed,
  sidebarExpanded,
  controlsCollapsed,
  controlsExpanded,
  footerCollapsed
}) {
  console.debug(`Main Layout Render ${asset?.id || 'Missing'}`)
  const {
    Sidebar = NavSearchSidebar,
    Footer = WalletTabs,
    Controls = DefaultControls,
    Content = DefaultContent
  } = components

  const { t } = useTranslation('common')
  const isSignedIn = useStore((state) => state.isSignedIn)
  const wallets = useStorePersisted((state) => state.wallets)
  const address = useStorePersisted((state) => state.activeWalletAddress)
  const wallet = wallets.find((wallet) => wallet.address === address)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 996
  // const isMedium = typeof window !== 'undefined' && window.innerWidth >= 996
  // const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 996

  const TABS = {
    CHART: 'CHART',
    BOOK: 'BOOK',
    TRADE: 'TRADE',
    ORDERS: 'ORDERS',
    HISTORY: 'HISTORY'
  }

  const [activeMobile, setActiveMobile] = useState(TABS.CHART)
  /**
   * Use Clicked Events
   *
   * This is only used to switch to MobileMenu Chart view
   * when the Next/Router navigates to a shallow route
   */
  useEvent('clicked', (data) => {
    if (data === 'asset') {
      console.log('CLicked', data, activeMobile)
      setActiveMobile(TABS.CHART)
    }
    if (data === 'order') {
      setActiveMobile(TABS.TRADE)
    }
  })
  if (!asset) {
    return <Spinner flex={true} />
  }
  const renderPanels = () => (
    <Fragment>
      <AssetTradeHistory
        active={!controlsCollapsed}
        area={!isMobile ? 'bottomLeft' : 'content'}
        asset={asset}
      />
      {isSignedIn && (
        <PlaceOrder
          active={!controlsCollapsed}
          asset={asset}
          wallet={wallet}
          area={!isMobile ? 'bottomRight' : 'content'}
        />
      )}
      <AssetOrderBook asset={asset} area={!isMobile ? 'topLeft' : 'content'} />
      <WalletConnect area={!isMobile ? 'topRight' : 'content'} />
    </Fragment>
  )
  return (
    <Grid
      controlsCollapsed={controlsCollapsed}
      controlsExpanded={controlsExpanded}
      sidebarCollapsed={sidebarCollapsed}
      sidebarExpanded={sidebarExpanded}
      footerCollapsed={footerCollapsed}
      rowHeight={rowHeight}
    >
      <Sidebar
        active={!sidebarCollapsed}
        area="sidebar"
        border="dashed"
        borderColor="blue"
        lgOnly={true}
      />

      <Footer active={!footerCollapsed} area="footer" border="dashed" borderColor="white" />
      {!isMobile && (
        <Content area="content" border="dashed" borderColor="green">
          {children}
        </Content>
      )}
      {isMobile ? (
        renderPanels()
      ) : (
        <Controls
          active={!controlsCollapsed}
          area="controls"
          mdAndUp={true}
          border="dashed"
          borderColor="purple"
        >
          {renderPanels()}
        </Controls>
      )}

      <MobileMenu>
        <ul>
          <li>
            <MobileMenuButton
              characterLength={t('mobilefooter-CHART').length}
              type="button"
              onClick={() => setActiveMobile(TABS.CHART)}
            >
              {t('mobilefooter-CHART')}
            </MobileMenuButton>
          </li>
          <li>
            <MobileMenuButton
              characterLength={t('mobilefooter-BOOK').length}
              type="button"
              onClick={() => setActiveMobile(TABS.BOOK)}
            >
              {t('mobilefooter-BOOK')}
            </MobileMenuButton>
          </li>
          <li>
            <MobileMenuButton
              characterLength={t('mobilefooter-TRADE').length}
              type="button"
              onClick={() => setActiveMobile(TABS.TRADE)}
            >
              {t('mobilefooter-TRADE')}
            </MobileMenuButton>
          </li>
          <li>
            <MobileMenuButton
              characterLength={t('mobilefooter-ORDERS').length}
              type="button"
              onClick={() => setActiveMobile(TABS.ORDERS)}
            >
              {t('mobilefooter-ORDERS')}
            </MobileMenuButton>
          </li>
          {/*
            <li>
              // Trade history. Disable for now until it is refactored into the Orders tab
              <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.HISTORY)}>
                History
              </MobileMenuButton>
            </li>
            */}
          <li>
            <MobileMenuButton
              type="button"
              characterLength={t('mobilefooter-WALLET').length}
              onClick={() => setActiveMobile(TABS.WALLET)}
            >
              {t('mobilefooter-WALLET')}
            </MobileMenuButton>
          </li>
        </ul>
      </MobileMenu>
    </Grid>
  )
}
Layout.propTypes = {
  asset: PropTypes.object,
  rowHeight: PropTypes.number,
  sidebarCollapsed: PropTypes.bool,
  onSidebarToggle: PropTypes.func,
  sidebarExpanded: PropTypes.bool,
  onSidebarExpand: PropTypes.func,
  controlsCollapsed: PropTypes.bool,
  controlsExpanded: PropTypes.bool,
  footerCollapsed: PropTypes.bool,
  children: PropTypes.any,
  components: PropTypes.shape({
    Controls: PropTypes.elementType,
    Sidebar: PropTypes.elementType,
    Footer: PropTypes.elementType,
    Content: PropTypes.elementType
  })
}
Layout.defaultProps = {
  rowHeight: 70,
  sidebarCollapsed: false,
  sidebarExpanded: false,
  controlsCollapsed: false,
  controlsExpanded: true,
  footerCollapsed: false,
  components: {
    Controls: DefaultControls,
    Footer: WalletTabs
  }
}
export default Layout
