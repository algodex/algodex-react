import PropTypes from 'prop-types'
import { Container } from './mobile-assets.css'
import { BodyCopySm } from 'components/type'
import AssetsTable from 'components/mobile-assets-table'
import { assetBalances } from 'components/utils/asset-balances'

function MobileAssets(props) {
  const data = assetBalances

  if (!data.length) {
    return (
      <Container>
        <BodyCopySm color="gray.500">You have no assets in your wallet.</BodyCopySm>
      </Container>
    )
  }
  return (
    <Container>
      <AssetsTable data={data} />
    </Container>
  )
}

export default MobileAssets

MobileAssets.propTypes = {}
MobileAssets.defaultProps = {}
