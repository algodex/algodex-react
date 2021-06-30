import PropTypes from 'prop-types'
import { Container } from './mobile-assets-table.css'
import Asset from 'components/mobile-asset'

function MobileAssetsTable({ data }) {
  return (
    <Container data-testid="asset-table">
      {
        //eslint-disable-next-line
        data?.map((asset) => (
          <Asset key={asset.id} asset={asset} data-testid="asset-row" />
        ))
      }
    </Container>
  )
}

export default MobileAssetsTable

MobileAssetsTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  )
}
MobileAssetsTable.defaultProps = {}
