// import { BodyCopy, BodyCopyTiny, HeaderCaps, LabelMd, LabelSm } from 'components/Typography'
import { NativeTabItem, NativeTabsList } from '@/components/Tabs/Tabs'
import { useCallback, useMemo, useState } from 'react'
import AdvancedOptions from './Form/AdvancedOptions'
import Slider from 'components/Input/Slider'
import Icon from 'components/Icon'
import { Info } from 'react-feather'
import { default as MUIInputAdornment } from '@mui/material/InputAdornment'
import OutlinedInput from '@/components/Input/OutlinedInput'
import { default as MaterialBox } from '@mui/material/Box'
import { default as MaterialButton } from '@mui/material/Button'
import PropTypes from 'prop-types'
import { TabsUnstyled } from '@mui/base'
import Tooltip from 'components/Tooltip'
// import { has } from 'lodash'
import { lighten } from 'polished'
import theme from '../../../theme'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'
import Typography from '@mui/material/Typography'
import { ButtonGroup } from '@mui/material'

const IconTextContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray['300']};
`

const AvailableBalance = styled.div`
  margin-bottom: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
`

const BalanceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`

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

// const DEFAULT_ORDER = {
//   type: 'buy',
//   price: 0,
//   amount: 0,
//   total: 0,
//   execution: 'both'
// }

/**
 * # 📝 Place Order Form
 *
 * Data for submitting an Order to the Algorand Network
 * onSubmit returns the event with the target values.
 *
 *       amount: e.target.amount.value,
 *       type: e.target.type.value,
 *       price: e.target.price.value,
 *       total: e.target.total.value,
 *       asset: e.target.asset.value
 *
 * @param showTitle
 * @param asset
 * @param wallet
 * @param onSubmit
 * @returns {JSX.Element}
 * @constructor
 */
export function PlaceOrderForm({ showTitle = true, asset, wallet, onSubmit, components: { Box } }) {
  // console.log(`PlaceOrderForm(`, arguments[0], `)`)
  const { t } = useTranslation('place-order')
  const [order, setOrder] = useState({
    type: 'buy',
    price: 0,
    amount: 0,
    total: 0,
    execution: 'both'
  })
  // console.log(order)
  // useEffect(() => {
  //   setOrder({
  //     ...DEFAULT_ORDER,
  //     asset
  //   })
  // }, [asset, setOrder])
  // const hasBalance = useMemo(() => {
  //   const { id } = asset
  //   const { assets } = wallet
  //   const hasAlgo = has(wallet, 'balance') && wallet.balance > 0
  //
  //   return order.type === 'buy' ? hasAlgo : has(assets, `${id}.balance`) && assets[id].balance > 0
  // }, [asset, wallet, order])

  const buttonProps = useMemo(
    () => ({
      buy: { variant: 'primary', text: `${t('buy')} ${asset.name || asset.id}` },
      sell: { variant: 'danger', text: `${t('sell')} ${asset.name || asset.id}` }
    }),
    [asset]
  )
  // const getMaxAmount = useCallback(() => {
  //   if (order.type === 'sell') {
  //     return wallet.assets[asset.id].balance || 0
  //   }
  //   if (order.type === 'buy') {
  //     return wallet.balance || 0
  //   }
  // }, [wallet, asset])

  const fixPrecision = useCallback(
    (e, key) => {
      const value = e.target.value
      switch (key) {
        case 'price':
          return parseFloat(value).toFixed(6)
        case 'amount':
          return parseFloat(value).toFixed(asset.decimals)
        case 'total':
          return parseFloat(value).toFixed(asset.decimals)
        default:
          return value
      }
    },
    [order]
  )

  const handleChange = useCallback(
    (e, field) => {
      const key = field || e.target.name
      // console.log(key, e)
      if (order[key] !== e.target.value) {
        setOrder({
          ...order,
          [key]: fixPrecision(e, key)
        })
      }
    },
    [setOrder, order]
  )

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.25rem'
      }}
      data-testid="place-order"
    >
      {showTitle && (
        <header className="pb-5">
          <Typography variant="headerCaps" color="gray.500" mb={1}>
            {t('place-order')}
          </Typography>
        </header>
      )}
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="w-full">
          <ButtonGroup fullWidth variant="contained">
            <MaterialButton
              disableElevation={order.type === 'buy'}
              disableRipple={true}
              variant="contained"
              color={order.type === 'buy' ? 'primary' : 'secondary'}
              fullWidth
              sx={{
                borderTopLeftRadius: '7px',
                borderBottomLeftRadius: '7px',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                '&:hover': {
                  backgroundColor:
                    order.type === 'buy'
                      ? lighten(0.05, theme.colors.green['500'])
                      : lighten(0.05, theme.colors.gray['700'])
                }
              }}
              onClick={handleChange}
              name="type"
              value="buy"
            >
              {t('buy')}
            </MaterialButton>
            <MaterialButton
              disableRipple={true}
              disableElevation={order.type === 'sell'}
              variant="contained"
              color={order.type === 'sell' ? 'error' : 'secondary'}
              fullWidth
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 7,
                borderBottomRightRadius: 7,
                '&:hover': {
                  backgroundColor:
                    order.type === 'sell'
                      ? lighten(0.05, theme.colors.red['500'])
                      : lighten(0.05, theme.colors.gray['700'])
                }
              }}
              onClick={handleChange}
              name="type"
              value="sell"
            >
              {t('sell')}
            </MaterialButton>
          </ButtonGroup>
        </div>

        <AvailableBalance>
          <IconTextContainer style={{ marginBottom: '10px' }}>
            <Typography variant="bodyCopyTiny" color="gray.500">
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
                    {wallet.balance}
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
                    {wallet.balance}
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
                    // amount: new Big(wallet.balance).minus(new Big(wallet.balance)).round(6).toString()
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
              {wallet.balance}
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
        </AvailableBalance>

        <TabsUnstyled sx={{ width: '100%' }}>
          <NativeTabsList
            style={{ marginBottom: '16px' }}
            textColor="primary"
            onChange={handleChange}
            aria-label="secondary tabs example"
          >
            <NativeTabItem label={t('limit')} />
          </NativeTabsList>
        </TabsUnstyled>
        {/*{!hasBalance && (*/}
        {/*  <Typography variant="bodyCopy" color="gray.500" textAlign="center" m={32}>*/}
        {/*    {t('insufficient-balance')}*/}
        {/*  </Typography>*/}
        {/*)}*/}
        {/*{hasBalance && (*/}
        <MaterialBox className="flex flex-col mb-4">
          <OutlinedInput
            sx={{
              backgroundColor: theme.colors.gray['900'],
              border: 2,
              borderColor: theme.colors.gray['700'],
              marginBottom: '1rem'
            }}
            inputProps={{
              name: 'price',
              type: 'number',
              // pattern: 'd*',
              autocomplete: false,
              min: 0,
              step: 0.000001,
              inputMode: 'decimal'
            }}
            name="price"
            type="number"
            pattern="\d*"
            value={order.price}
            onChange={(e) => handleChange(e)}
            startAdornment={
              <MUIInputAdornment position="start">
                <span className="text-sm font-bold text-gray-500">{t('price')}</span>
              </MUIInputAdornment>
            }
            endAdornment={
              <MUIInputAdornment position="end">
                <span className="text-sm font-bold text-gray-500">ALGO</span>
              </MUIInputAdornment>
            }
          />
          <OutlinedInput
            id="amount"
            type="number"
            pattern="\d*"
            name="amount"
            sx={{
              backgroundColor: theme.colors.gray['900'],
              border: 2,
              borderColor: theme.colors.gray['700'],
              marginBottom: '1rem'
            }}
            value={order.amount}
            onChange={handleChange}
            autocomplete="false"
            min="0"
            // step={new Big(10).pow(-1 * asset.decimals).toString()}
            inputMode="decimal"
            startAdornment={
              <MUIInputAdornment position="start">
                <span className="text-sm font-bold text-gray-500">{t('amount')}</span>
              </MUIInputAdornment>
            }
            endAdornment={
              <MUIInputAdornment position="end">
                <span className="text-sm font-bold text-gray-500">{asset.name}</span>
              </MUIInputAdornment>
            }
          />
          <Slider
            sx={{
              margin: '0px 0.5rem',
              width: '95%'
            }}
            // txnFee={txnFee}
            onChange={(e) => handleChange(e)}
            name="amount"
            value={order.amount}
            marks={true}
            step={10}
            min={0}
            max={100}
          />
          <OutlinedInput
            id="total"
            name="total"
            type="text"
            value={order.amount * order.price}
            readOnly
            disabled
            startAdornment={
              <MUIInputAdornment position="start">
                <span className="text-sm font-bold text-gray-500">{t('total')}</span>
              </MUIInputAdornment>
            }
            endAdornment={
              <MUIInputAdornment position="end">
                <span className="text-sm font-bold text-gray-500">ALGO</span>
              </MUIInputAdornment>
            }
          />
          {/* <TxnFeeContainer>
                <BodyCopyTiny color="gray.500" textTransform="none">
                  Algorand transaction fees: <Icon use="algoLogo" color="gray.500" size={0.5} />{' '}
                  {txnFee.toFixed(3)}
                </BodyCopyTiny>
              </TxnFeeContainer> */}
          <AdvancedOptions
            order={order}
            // onChange={handleOptionsChange}
            allowTaker={typeof asset !== 'undefined'}
          />
        </MaterialBox>
        {/*)}*/}
        <MaterialButton
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: order.type === 'sell' ? '#b23639' : '#4b9064',
            '&:hover': {
              backgroundColor:
                order.type === 'sell' ? lighten(0.05, '#b23639') : lighten(0.05, '#4b9064')
            }
          }}
          disabled={order.valid}
        >
          {buttonProps[order.type || 'buy']?.text}
        </MaterialButton>
      </form>
    </Box>
  )
}

PlaceOrderForm.propTypes = {
  /**
   * Display the Title for the Form
   */
  showTitle: PropTypes.bool,
  /**
   * Asset for the Order
   */
  components: PropTypes.object,
  asset: PropTypes.shape({
    id: PropTypes.number.isRequired,
    decimals: PropTypes.number.isRequired,
    name: PropTypes.string
  }).isRequired,
  /**
   * Wallet to execute Orders from
   */
  wallet: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    assets: PropTypes.objectOf(PropTypes.shape({ balance: PropTypes.number }))
  }),
  /**
   * Submit Handler
   */
  onSubmit: PropTypes.func
}
PlaceOrderForm.defaultProps = {
  showTitle: true,
  components: {
    Box: MaterialBox
  }
}
export default PlaceOrderForm
