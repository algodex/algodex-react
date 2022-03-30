import PlaceOrderView from './view'
import useStore, { useStorePersisted } from 'store/use-store'
import PropTypes from 'prop-types'
import useAssetOrdersQuery from '@algodex/hooks/src/http/useAssetOrdersQuery'
import Spinner from '@/components/Spinner'
import Error from '@/components/ServiceError'
import { useMemo } from 'react'
import { BodyCopy, HeaderCaps } from '@/components/Typography'
import useTranslation from 'next-translate/useTranslation'
import { Header, Container } from './place-order.css'
function PlaceOrder({ asset }) {
  const { t } = useTranslation('place-order')
  const wallets = useStorePersisted((state) => state.wallets)
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)
  const { data: assetOrders, isLoading, isError } = useAssetOrdersQuery({ asset })

  const orderBook = useMemo(
    () => ({
      buyOrders: assetOrders?.buyASAOrdersInEscrow || [],
      sellOrders: assetOrders?.sellASAOrdersInEscrow || []
    }),
    [assetOrders]
  )
  if (!isSignedIn) {
    return (
      <Container data-testid="place-order">
        <Header>
          <HeaderCaps color="gray.500" mb={1}>
            {t('place-order')}
          </HeaderCaps>
        </Header>
        <BodyCopy data-testid="not-signed-in" color="gray.500" textAlign="center" m={16}>
          {t('not-signed-in')}
        </BodyCopy>
      </Container>
    )
  }
  if (isLoading) {
    return <Spinner flex />
  }
  if (isError) {
    return <Error />
  }

  return (
    <PlaceOrderView
      asset={asset}
      wallets={wallets}
      activeWalletAddress={activeWalletAddress}
      orderBook={orderBook}
    />
  )
}

PlaceOrder.propTypes = {
  asset: PropTypes.object.isRequired
}
export default PlaceOrder
