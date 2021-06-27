import PropTypes from 'prop-types'
import { Container } from './mobile-assets-table.css'
import Asset from 'components/mobile-asset'

function MobileAssetsTable({ data }) {
  return (
    <Container>
      {data?.map((asset) => (
        <Asset key={asset.name} name={asset.name} token={asset.token} amount={asset.amount} />
      ))}
    </Container>
  )
}

export default MobileAssetsTable

MobileAssetsTable.propTypes = {}
MobileAssetsTable.defaultProps = {}
