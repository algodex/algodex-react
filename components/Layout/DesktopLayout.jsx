import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { useStore /*, useStorePersisted */ } from '@/store/use-store'

import AssetOrderBook from '@/components/Asset/OrderBook'
import AssetTradeHistory from '@/components/Asset/TradeHistory'
import { Controls as DefaultControls } from './Controls'
import NavSearchSidebar from '@/components/Nav/SearchSidebar'
// import PlaceOrder from '@/components/Wallet/PlaceOrder'
import Spinner from '@/components/Spinner'
import WalletConnect from '@/components/Wallet/Connect/WalletConnect'
import WalletTabs from '@/components/Wallet/WalletTabs'

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
        @media (min-width: 996px) {
          grid-template-columns: 1fr 1fr 280px;
          grid-template-rows: 240px 200px 300px 300px;
          grid-template-areas:
            'content content controls'
            'content content controls'
            'footer footer controls'
            'footer footer controls';
        }

        @media (min-width: 1023px) {
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
        @media (min-width: 996px) {
          grid-template-columns: 1fr 1fr 280px;
          grid-template-rows: 240px 200px 300px 300px;
          grid-template-areas:
            'content content controls'
            'content content controls'
            'footer footer controls'
            'footer footer controls';
        }
        @media (min-width: 1023px) {
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
          @media (min-width: 996px) {
            grid-template-columns: 1fr 1fr 280px;
            grid-template-rows: 240px 200px 300px 300px;
            grid-template-areas:
              'content content controls'
              'content content controls'
              'footer footer controls';
          }
          @media (min-width: 1023px) {
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
          @media (min-width: 996px) {
            grid-template-columns: 1fr 1fr 280px;
            grid-template-rows: 240px 200px 300px 300px;
            grid-template-areas:
              'content content controls'
              'content content controls'
              'footer footer controls'
              'footer footer controls';
          }
          @media (min-width: 1023px) {
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
        @media (min-width: 996px) {
          grid-template-columns: 1fr 1fr 280px;
          grid-template-rows: 240px 200px 300px 300px;
          grid-template-areas:
            'content content controls'
            'content content controls'
            'footer footer controls'
            'footer footer controls';
        }
        @media (min-width: 1023px) {
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
          @media (min-width: 996px) {
            grid-template-columns: 1fr 1fr 280px;
            grid-template-rows: 240px 200px 300px 300px;
            grid-template-areas:
              'content content controls'
              'content content controls'
              'footer footer controls'
              'footer footer controls';
          }
          @media (min-width: 1023px) {
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
          @media (min-width: 996px) {
            grid-template-columns: 1fr 1fr 280px;
            grid-template-rows: 240px 200px 300px 300px;
            grid-template-areas:
              'content content controls'
              'content content controls'
              'footer footer controls'
              'footer footer controls';
          }
          @media (min-width: 1023px) {
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
        @media (min-width: 996px) {
          grid-template-columns: 1fr 1fr 280px;
          grid-template-rows: 240px 200px 300px 300px;
          grid-template-areas:
            'content content controls'
            'content content controls'
            'footer footer controls'
            'footer footer controls';
        }
        @media (min-width: 1023px) {
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
          @media (min-width: 996px) {
            grid-template-columns: 1fr 1fr 280px;
            grid-template-rows: 240px 200px 300px 300px;
            grid-template-areas:
              'content content controls'
              'content content controls'
              'footer footer controls'
              'footer footer controls';
          }
          @media (min-width: 1023px) {
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
          @media (min-width: 996px) {
            grid-template-columns: 1fr 1fr 280px;
            grid-template-rows: 240px 200px 300px 300px;
            grid-template-areas:
              'content content controls'
              'content content controls'
              'footer footer controls'
              'footer footer controls';
          }
          @media (min-width: 1023px) {
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
          @media (min-width: 996px) {
            grid-template-columns: 1fr 1fr 280px;
            grid-template-rows: 240px 200px 300px 300px;
            grid-template-areas:
              'content content controls'
              'content content controls'
              'footer footer controls'
              'footer footer controls';
          }
          @media (min-width: 1023px) {
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
        @media (min-width: 996px) {
          grid-template-columns: 1fr 1fr 280px;
          grid-template-rows: 240px 200px 300px 300px;
          grid-template-areas:
            'content content controls'
            'content content controls'
            'footer footer controls'
            'footer footer controls';
        }
        @media (min-width: 1023px) {
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
        @media (min-width: 996px) {
          grid-template-columns: 1fr 1fr 280px;
          grid-template-rows: 240px 200px 300px 300px;
          grid-template-areas:
            'content content controls'
            'content content controls'
            'footer footer controls'
            'footer footer controls';
        }
        @media (min-width: 1023px) {
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
/**
 * @param asset
 * @param children
 * @param components
 * @returns {JSX.Element}
 * @constructor
 */
export function DesktopLayout({
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
  console.debug(`Desktop Render Asset: ${asset?.id || 'Missing'}`)

  const {
    Sidebar = NavSearchSidebar,
    Footer = WalletTabs,
    Controls = DefaultControls,
    Content = DefaultContent
  } = components

  const isSignedIn = useStore((state) => state.isSignedIn)
  // const wallets = useStorePersisted((state) => state.wallets)
  // const address = useStorePersisted((state) => state.activeWalletAddress)
  // const wallet = wallets.find((wallet) => wallet.address === address)

  if (!asset) {
    return <Spinner flex={true} />
  }

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

      <Content area="content" border="dashed" borderColor="green">
        {children}
      </Content>

      <Controls
        active={!controlsCollapsed}
        area="controls"
        mdAndUp={true}
        border="dashed"
        borderColor="purple"
      >
        <AssetTradeHistory active={!controlsCollapsed} area="bottomLeft" asset={asset} />
        {isSignedIn && (
          <div>TODO Place Order</div>
          // <PlaceOrder
          //   active={!controlsCollapsed}
          //   asset={asset}
          //   wallet={wallet}
          //   area="bottomRight"
          // />
        )}
        <AssetOrderBook asset={asset} area="topLeft" />
        <WalletConnect area="topRight" />
      </Controls>
    </Grid>
  )
}
DesktopLayout.propTypes = {
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
DesktopLayout.defaultProps = {
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
export default DesktopLayout
