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

const AsaBalance = ({ amount, asaName, type, decimal }) => {
  const _amount = type === 'others' ? fromBaseUnits(amount, decimal) : fromBaseUnits(amount)
  const _usdPrice = type === 'others' ? fromBaseUnits(amount, decimal) : fromBaseUnits(amount)
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="body_small_cap_medium" color="gray.400">
        {asaName}
      </Typography>
      <Stack direction="column" className="text-right">
        <Typography className="leading-5" variant="body_small_medium" color="gray.300">
          {_amount}
        </Typography>
        <Typography className="leading-5" color="gray.400" variant="body_tiny_cap">
          <USDPrice priceToConvert={_usdPrice} currency="$" />
        </Typography>
      </Stack>
    </Stack>
  )
}

AsaBalance.propTypes = {
  amount: PropTypes.number,
  asaName: PropTypes.string,
  type: PropTypes.string,
  decimal: PropTypes.number
}

export const AvailableBalance = ({ wallet, asset }) => {
  const { t } = useTranslation('place-order')
  const { address: activeWalletAddr } = wallet
  const storedAddrs =
    JSON.parse(localStorage.getItem('addresses')) !== null &&
    JSON.parse(localStorage.getItem('addresses')).length > 0 &&
    JSON.parse(localStorage.getItem('addresses'))

  const activeWallet = storedAddrs && storedAddrs.filter((a) => a.address == activeWalletAddr)[0]
  const assetBalance = useMemo(() => {
    let res = 0
    if (typeof activeWallet !== 'undefined' && Array.isArray(activeWallet.assets)) {
      const filter = activeWallet.assets.filter((a) => a['asset-id'] === asset.id)
      if (filter.length > 0) {
        res = filter[0].amount
      }
    }
    return res
  }, [storedAddrs, activeWallet])

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
      {asset.isStable ? (
        <>
          <AsaBalance
            asaName={asset.name || asset.id}
            type="others"
            decimal={asset.decimals}
            amount={assetBalance}
          />
          <AsaBalance asaName="ALGO" type="algo" amount={wallet.amount} />
        </>
      ) : (
        <>
          <AsaBalance asaName="ALGO" type="algo" amount={wallet.amount} />
          <AsaBalance
            asaName={asset.name || asset.id}
            type="others"
            decimal={asset.decimals}
            amount={assetBalance}
          />
        </>
      )}
    </AvailableBalanceContainer>
  )
}
AvailableBalance.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    decimals: PropTypes.number.isRequired,
    isStable: PropTypes.bool
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
export default AvailableBalance
