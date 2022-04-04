import { Asset, AssetUSD, Container, Input, Label } from './order-input.css'

import { LabelSm } from '@/components/Typography'
import PropTypes from 'prop-types'
import USDPrice from '@/components/Wallet/PriceConversion/USDPrice'
import { ValidationMessage } from '@/components/InputValidations/ValidationMessage'

function OrderInput({ label, asset, orderType, usdEquivalent, hasError, errorMessage, ...props }) {
  const condenseAssetName = asset?.length > 5

  if (usdEquivalent) {
    return (
      <>
        <Container hasError={hasError} orderType={orderType} isUsd={usdEquivalent}>
          <Input placeholder="0.00" {...props} isUsd={usdEquivalent} />
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
        {hasError && <ValidationMessage message={errorMessage} />}
      </>
    )
  }
  return (
    <>
      <Container orderType={orderType}>
        <Input placeholder="0.00" {...props} />
        <Label>{label}</Label>
        <Asset isCondensed={condenseAssetName}>{asset}</Asset>
        <Asset isCondensed={condenseAssetName}>{asset}</Asset>
      </Container>
      {hasError && <ValidationMessage message={errorMessage} />}
    </>
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
