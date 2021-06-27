import PropTypes from 'prop-types'
import useStore, { mobileTabs } from 'store/use-store'
import { Wrapper, Container, NavItem } from './mobile-bottom-nav.css'
import { BodyCopySm } from 'components/type'

function MobileBottomNav() {
  const setActiveItem = (item) => {
    useStore.setState({ activeMobileTab: item })
  }
  const activeItem = useStore.getState().activeMobileTab

  return (
    <Wrapper>
      <Container>
        <NavItem
          isActive={activeItem === mobileTabs.CHART}
          onClick={() => setActiveItem(mobileTabs.CHART)}
        >
          <BodyCopySm
            color={activeItem === mobileTabs.CHART ? 'gray.100' : 'gray.500'}
            textTransform="uppercase"
          >
            Chart
          </BodyCopySm>
        </NavItem>
        <NavItem
          isActive={activeItem === mobileTabs.BOOK}
          onClick={() => setActiveItem(mobileTabs.BOOK)}
        >
          <BodyCopySm
            color={activeItem === mobileTabs.BOOK ? 'gray.100' : 'gray.500'}
            textTransform="uppercase"
          >
            Book
          </BodyCopySm>
        </NavItem>
        <NavItem
          isActive={activeItem === mobileTabs.TRADE}
          onClick={() => setActiveItem(mobileTabs.TRADE)}
        >
          <BodyCopySm
            color={activeItem === mobileTabs.TRADE ? 'gray.100' : 'gray.500'}
            textTransform="uppercase"
          >
            Trade
          </BodyCopySm>
        </NavItem>
        <NavItem
          isActive={activeItem === mobileTabs.ORDERS}
          onClick={() => setActiveItem(mobileTabs.ORDERS)}
        >
          <BodyCopySm
            color={activeItem === mobileTabs.ORDERS ? 'gray.100' : 'gray.500'}
            textTransform="uppercase"
          >
            Orders
          </BodyCopySm>
        </NavItem>
        <NavItem
          isActive={activeItem === mobileTabs.HISTORY}
          onClick={() => setActiveItem(mobileTabs.HISTORY)}
        >
          <BodyCopySm
            color={activeItem === mobileTabs.HISTORY ? 'gray.100' : 'gray.500'}
            textTransform="uppercase"
          >
            TRADES
          </BodyCopySm>
        </NavItem>
      </Container>
    </Wrapper>
  )
}

export default MobileBottomNav

MobileBottomNav.propTypes = {}
MobileBottomNav.defaultProps = {}
