import PropTypes from 'prop-types'
import { useState } from 'react'
import {
  HeaderSection,
  Container,
  TableSection,
  DateSection,
  TypeSection,
  PairSection,
  SideSection,
  PriceSection,
  AmountSection,
  TotalSection,
  CancelSection,
  Label,
  CancelButton
} from './orders.css'
import NavItem from 'components/nav-item'

function Orders(props) {
  const [activeSection, setActiveSection] = useState('orders')

  return (
    <Container>
      <HeaderSection>
        <div onClick={() => setActiveSection('orders')}>
          <NavItem isActive={activeSection === 'orders'} border={true}>
            Orders
          </NavItem>
        </div>
        <div onClick={() => setActiveSection('history')}>
          <NavItem isActive={activeSection === 'history'} border={true}>
            Order History
          </NavItem>
        </div>
        <div onClick={() => setActiveSection('assets')}>
          <NavItem isActive={activeSection === 'assets'} border={true}>
            Assets
          </NavItem>
        </div>
      </HeaderSection>
      <TableSection>
        <DateSection>
          <Label>Date</Label>
        </DateSection>
        <PairSection>
          <Label>Pair</Label>
        </PairSection>
        <TypeSection>
          <Label>Type</Label>
        </TypeSection>
        <SideSection>
          <Label>Side</Label>
        </SideSection>
        <PriceSection>
          <Label>Price</Label>
        </PriceSection>
        <AmountSection>
          <Label>Amount</Label>
        </AmountSection>
        <TotalSection>
          <Label>Total</Label>
        </TotalSection>
        <CancelSection>
          <CancelButton>Cancel</CancelButton>
        </CancelSection>
      </TableSection>
    </Container>
  )
}

export default Orders

Orders.propTypes = {}
Orders.defaultProps = {}
