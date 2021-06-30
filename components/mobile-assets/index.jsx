import PropTypes from 'prop-types'
import { Container } from './mobile-assets.css'
import { BodyCopySm } from 'components/type'
import AssetsTable from 'components/mobile-assets-table'

function MobileAssets({ data }) {
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

MobileAssets.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  )
}
