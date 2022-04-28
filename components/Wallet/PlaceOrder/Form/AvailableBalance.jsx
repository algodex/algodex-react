import Icon from '@/components/Icon'
import { Info } from 'react-feather'
import PropTypes from 'prop-types'
import Tooltip from '@/components/Tooltip'
import Typography from '@mui/material/Typography'
import fromBaseUnits from '@algodex/algodex-sdk/lib/utils/units/fromBaseUnits'
import styled from '@emotion/styled'
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
function AvailableBalance({ wallet, asset }) {
  const { t } = useTranslation('place-order')
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
            <Typography variant="labelMdSpaced" color="gray.300">
              {t('orders:available')}:
            </Typography>
            <IconTextContainer>
              <Typography variant="labelMdSpaced" color="gray.300">
                {fromBaseUnits(wallet.amount)}
              </Typography>
              <Icon use="algoLogo" size={0.625} />
            </IconTextContainer>
          </section>
          <BalanceRow>
            <Typography variant="labelMdSpaced" color="gray.300">
              {t('total')}:
            </Typography>
            <IconTextContainer>
              <Typography variant="labelMdSpaced" color="gray.300">
                {fromBaseUnits(wallet.amount)}
              </Typography>
              <Icon use="algoLogo" size={0.625} />
            </IconTextContainer>
          </BalanceRow>
          <BalanceRow>
            <Typography
              variant="labelSmForm"
              component="span"
              color="gray.300"
              textTransform="initial"
            >
              &nbsp;*
              {t('max-spend-explanation', {
                // amount: new Big(wallet.amount).minus(new Big(wallet.amount)).round(6).toString()
              })}
            </Typography>
          </BalanceRow>
        </Tooltip>
      </IconTextContainer>
      <BalanceRow>
        <Typography variant="labelMdLight" color="gray.400">
          ALGO
        </Typography>
        <Typography variant="labelMdLight" color="gray.300">
          {fromBaseUnits(wallet.amount)}
        </Typography>
      </BalanceRow>
      <BalanceRow>
        <Typography variant="labelMdLight" color="gray.400">
          <input style={{ display: 'none' }} disabled={true} name="asset" value={asset.id} />
          {asset.name || asset.id}
        </Typography>
        <Typography variant="labelMdLight" color="gray.300">
          {/*{hasBalance && wallet?.assets[asset.id]?.balance}*/}
        </Typography>
      </BalanceRow>
    </AvailableBalanceContainer>
  )
}
AvailableBalance.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  wallet: PropTypes.shape({
    amount: PropTypes.number.isRequired
  })
}
export default AvailableBalance
