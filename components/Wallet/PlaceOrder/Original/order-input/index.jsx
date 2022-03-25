import { LabelSm } from '@/components/Typography'
import USDPrice from '@/components/Wallet/PriceConversion/USDPrice'
import PropTypes from 'prop-types'
import { Container, Input, Label, Asset, AssetUSD } from './order-input.css'

function OrderInput({ label, asset, orderType, usdEquivalent, ...props }) {
  const condenseAssetName = asset?.length > 5

  if (usdEquivalent) {
    return (
      <Container orderType={orderType} isTotal={usdEquivalent}>
        <Input placeholder="0.00" {...props} isTotal={usdEquivalent} />
        <Label>{label}</Label>
        <Asset isCondensed={condenseAssetName}>
          {asset}
          {usdEquivalent && (
            <>
              <br />
              <LabelSm className="mt-3">USD</LabelSm>
            </>
          )}
        </Asset>
        {usdEquivalent && (
          <AssetUSD isCondensed={condenseAssetName}>
            <USDPrice priceToConvert={usdEquivalent} />
          </AssetUSD>
        )}
      </Container>
    )
  }
  return (
    <Container orderType={orderType}>
      <Input placeholder="0.00" {...props} />
      <Label>{label}</Label>
      <Asset isCondensed={condenseAssetName}>{asset}</Asset>
      <Asset isCondensed={condenseAssetName}>{asset}</Asset>
    </Container>
  )
}

OrderInput.propTypes = {
  label: PropTypes.string,
  asset: PropTypes.string,
  decimals: PropTypes.number,
  orderType: PropTypes.oneOf(['buy', 'sell']),
  usdEquivalent: PropTypes.string
}

export default OrderInput
