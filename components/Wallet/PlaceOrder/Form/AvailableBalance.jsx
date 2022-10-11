/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Big from 'big.js'
import Icon from '@/components/Icon'
import { Info } from 'react-feather'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'
import Tooltip from '@/components/Tooltip'
import Typography from '@mui/material/Typography'
import USDPrice from '../../PriceConversion/USDPrice'
import fromBaseUnits from '@algodex/algodex-sdk/lib/utils/units/fromBaseUnits'
import styled from '@emotion/styled'
import { useMemo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { withAssetPriceQuery } from '@algodex/algodex-hooks'

// TODO: Move to <Grid>/<Box>
const IconTextContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray['300']};
`
// TODO: Move to <Grid>/<Box>
const AvailableBalanceContainer = styled.div`
  margin-bottom: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
`
// TODO: Move to <Grid>/<Box>
const BalanceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`
// TODO: Move to MUI Icon
const IconButton = styled.button`
  cursor: pointer;
  pointer-events: all;
  border: none;
  background: transparent;
  margin-left: 0.125rem;
  padding: 0;
  height: 15px;

  svg {
    height: 15px;
    fill: ${({ theme }) => theme.colors.gray[500]};
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`

export const AvailableBalance = ({ wallet, asset }) => {
  const { t } = useTranslation('place-order')
  const price_info = asset?.price_info
  const assetValue = useMemo(() => {
    let res = 0
    if (typeof wallet !== 'undefined' && Array.isArray(wallet.assets)) {
      const filter = wallet.assets.filter((a) => a['asset-id'] === asset.id)
      if (filter.length > 0) {
        res = price_info ? filter[0].amount  * (price_info.price) : filter[0].amount
      }
    }
    return res
  }, [wallet, asset])

  return (
    <AvailableBalanceContainer>
      <IconTextContainer style={{ marginBottom: '10px' }}>
        <Typography variant="body_tiny_cap" color="gray.500">
          {t('available-balance')}
        </Typography>
        <Tooltip
          renderButton={(setTriggerRef) => (
            <IconButton ref={setTriggerRef} type="button">
              <Info />
            </IconButton>
          )}
        >
          <section className="flex items-center justify-between mb-1">
            <Typography
              sx={{ letterSpacing: '0.2em' }}
              variant="body_small_cap_medium"
              color="gray.300"
            >
              {t('orders:available')}:
            </Typography>
            <IconTextContainer>
              <Typography variant="body_small_cap_medium" color="gray.300">
                {fromBaseUnits(wallet.amount)}
              </Typography>
              <Icon color="gray" fillGradient={300} use="algoLogo" size={0.625} />
            </IconTextContainer>
          </section>
          <BalanceRow>
            <Typography
              sx={{ letterSpacing: '0.2em' }}
              variant="body_small_cap_medium"
              color="gray.300"
            >
              {t('total')}:
            </Typography>
            <IconTextContainer>
              <Typography variant="body_small_cap_medium" color="gray.300">
                {fromBaseUnits(wallet.amount)}
              </Typography>
              <Icon color="gray" fillGradient={300} use="algoLogo" size={0.625} />
            </IconTextContainer>
          </BalanceRow>
          <BalanceRow>
            <Typography variant="body_tiny" color="gray.300">
              &nbsp;*
              {t('max-spend-explanation', {
                amount: new Big(wallet.amount).minus(new Big(wallet.amount)).round(6).toString()
              })}
            </Typography>
          </BalanceRow>
        </Tooltip>
      </IconTextContainer>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body_small_cap_medium" color="gray.400">
          ALGO
        </Typography>
        <Stack direction="column" className="text-right">
          <Typography className="leading-5" variant="body_small_medium" color="gray.300">
            {fromBaseUnits(wallet.amount)}
          </Typography>
          <Typography className="leading-5" color="gray.400" variant="body_tiny_cap">
            <USDPrice priceToConvert={fromBaseUnits(wallet.amount)} currency="$" />
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Typography variant="body_small_cap_medium" color="gray.400">
          <input style={{ display: 'none' }} disabled={true} name="asset" value={asset.id} />
          {asset.name || asset.id}
        </Typography>
        <Stack direction="column" className="text-right">
          <Typography className="leading-5" variant="body_small_medium" color="gray.300">
            {fromBaseUnits(assetValue, asset.decimals)}
            {/* {assetValue} */}
          </Typography>
          <Typography className="leading-5" color="gray.400" variant="body_tiny_cap">
            <USDPrice priceToConvert={fromBaseUnits(assetValue, asset.decimals)} currency="$" />
          </Typography>
        </Stack>
      </Stack>
    </AvailableBalanceContainer>
  )
}
AvailableBalance.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    decimals: PropTypes.number.isRequired,
    price_info: PropTypes.object
  }),
  wallet: PropTypes.shape({
    address: PropTypes.string,
    amount: PropTypes.number.isRequired,
    assets: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired
      })
    )
  })
}
export default withAssetPriceQuery(AvailableBalance)
