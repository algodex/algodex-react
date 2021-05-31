import MobileInterface from 'components/MobileInterface'
import OrdersSection from 'components/orders'
import { Main, TradeSection, ChartSection, BookFeedSection, AssetsSection } from './MainLayout.css'

export default function MainLayout() {
  return (
    <Main>
      <MobileInterface />
      <TradeSection>
        <p>Trade</p>
      </TradeSection>
      <ChartSection>
        <p>Chart</p>
      </ChartSection>
      <BookFeedSection>
        <p>Order book &amp; Feed</p>
      </BookFeedSection>
      <OrdersSection />
      <AssetsSection>
        <p>Assets search</p>
      </AssetsSection>
    </Main>
  )
}
