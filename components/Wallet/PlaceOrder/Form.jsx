import { BodyCopy, BodyCopyTiny, HeaderCaps, LabelMd, LabelSm } from 'components/Typography'
import { BtnTabItem, BtnTabsList, NativeTabItem, NativeTabsList } from 'components/Tabs/Tabs'
import { useMemo, useState } from 'react'

import AdvancedOptions from './Form/AdvancedOptions'
import { default as AmountRange } from 'components/Input/Slider'
// import Button from '../../Button'
import { FormControl } from '@mui/material'
import Icon from 'components/Icon'
import { Info } from 'react-feather'
import { default as MUIInputAdornment } from '@mui/material/InputAdornment'
import { default as MUIOutlinedInput } from '@mui/material/OutlinedInput'
import { default as MaterialBox } from '@mui/material/Box'
import { default as MaterialButton } from '@mui/material/Button'
import PropTypes from 'prop-types'
// import { Section } from '@/components/Layout/Section'
import { TabsUnstyled } from '@mui/base'
import Tooltip from 'components/Tooltip'
import { has } from 'lodash'
import { lighten } from 'polished'
import styled from 'styled-components'
import theme from '../../../theme'
import useTranslation from 'next-translate/useTranslation'

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

const MainInput = styled(MUIOutlinedInput)(({ theme }) => ({
  '.MuiOutlinedInput-input': {
    color: theme.colors.gray['000'],
    marginRight: '0.5rem',
    textAlign: 'right'
  },

  '.Mui-disabled': {
    color: theme.colors.gray[500]
  },
  '& input': {
    ':disabled': {
      '-webkit-text-fill-color': 'unset'
    },
    '&[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  }
}))

MainInput.defaultProps = {
  size: 'small',
  placeholder: '0.00',
  className: 'text-sm font-bold ',
  fullWidth: true
}

const DEFAULT_ORDER = {
  type: 'buy',
  price: 0,
  amount: 0,
  total: 0,
  execution: 'both'
}

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
  const [activeTab, setActiveTab] = useState(0)
  const { t } = useTranslation('place-order')
  const [order, setOrder] = useState(DEFAULT_ORDER)

  const hasBalance = useMemo(() => {
    const { id } = asset
    const { assets } = wallet
    const hasAlgo = has(wallet, 'balance') && wallet.balance > 0

    return order.type === 'buy' ? hasAlgo : has(assets, `${id}.balance`) && assets[id].balance > 0
  }, [asset, wallet, order])

  const buttonProps = {
    buy: { variant: 'primary', text: `${t('buy')} ${asset.name || asset.id}` },
    sell: { variant: 'danger', text: `${t('sell')} ${asset.name || asset.id}` }
  }

  const handleChange = (e, field) => {
    setOrder({
      ...order,
      [field || e.target.name]: e.target.value
    })
  }

  const handleChangeFn = (event, value) => {
    setActiveTab(value)
  }

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
          <HeaderCaps color="gray.500" mb={1}>
            {t('place-order')}
          </HeaderCaps>
        </header>
      )}
      <FormControl onSubmit={onSubmit} autocomplete="off">
        <div className="w-full">
          <TabsUnstyled className="w-full" defaultValue={0} onChange={handleChangeFn}>
            <BtnTabsList value={activeTab}>
              <BtnTabItem className="first-item">
                <MaterialButton
                  disableElevation={activeTab === 0}
                  variant="contained"
                  fullWidth
                  sx={{
                    borderTopLeftRadius: '7px',
                    borderBottomLeftRadius: '7px',
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor:
                      activeTab === 0 ? theme.colors.green['500'] : theme.colors.gray['700'],
                    '&:hover': {
                      backgroundColor:
                        activeTab === 0
                          ? lighten(0.05, theme.colors.green['500'])
                          : lighten(0.05, theme.colors.gray['700'])
                    }
                  }}
                  onClick={(e) => handleChange(e, 'type')}
                  name="buy"
                  value="buy"
                >
                  {t('buy')}
                </MaterialButton>
              </BtnTabItem>
              <BtnTabItem className="last-item">
                <MaterialButton
                  disableElevation={activeTab === 1}
                  variant="contained"
                  fullWidth
                  sx={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 7,
                    borderBottomRightRadius: 7,
                    backgroundColor:
                      activeTab === 1 ? theme.colors.red['500'] : theme.colors.gray['700'],
                    '&:hover': {
                      backgroundColor:
                        activeTab === 1
                          ? lighten(0.05, theme.colors.red['500'])
                          : lighten(0.05, theme.colors.gray['700'])
                    }
                  }}
                  onClick={(e) => handleChange(e, 'type')}
                  name="sell"
                  value="sell"
                >
                  {t('sell')}
                </MaterialButton>
              </BtnTabItem>
            </BtnTabsList>
          </TabsUnstyled>
        </div>

        <AvailableBalance>
          <IconTextContainer style={{ marginBottom: '10px' }}>
            <BodyCopyTiny color="gray.500">{t('available-balance')}</BodyCopyTiny>
            <Tooltip
              renderButton={(setTriggerRef) => (
                <IconButton ref={setTriggerRef} type="button">
                  <Info />
                </IconButton>
              )}
            >
              <section className="flex items-center justify-between mb-1">
                <LabelMd color="gray.300" fontWeight="500" letterSpacing="0.2em">
                  {t('orders:available')}:
                </LabelMd>
                <IconTextContainer>
                  <LabelMd color="gray.300" fontWeight="500" letterSpacing="0.2em">
                    {wallet.balance}
                  </LabelMd>
                  <Icon use="algoLogo" size={0.625} />
                </IconTextContainer>
              </section>
              <BalanceRow>
                <LabelMd color="gray.300" fontWeight="500" letterSpacing="0.2em">
                  {t('total')}:
                </LabelMd>
                <IconTextContainer>
                  <LabelMd color="gray.300" fontWeight="500" letterSpacing="0.2em">
                    {wallet.balance}
                  </LabelMd>
                  <Icon use="algoLogo" size={0.625} />
                </IconTextContainer>
              </BalanceRow>
              <BalanceRow>
                <LabelSm
                  color="gray.300"
                  fontWeight="400"
                  textTransform="initial"
                  lineHeight="0.9rem"
                  letterSpacing="0.1em"
                >
                  &nbsp;*
                  {t('max-spend-explanation', {
                    // amount: new Big(wallet.balance).minus(new Big(wallet.balance)).round(6).toString()
                  })}
                </LabelSm>
              </BalanceRow>
            </Tooltip>
          </IconTextContainer>
          <BalanceRow>
            <LabelMd color="gray.400" fontWeight="500">
              ALGO
            </LabelMd>
            <LabelMd color="gray.300" fontWeight="500">
              {wallet.balance}
            </LabelMd>
          </BalanceRow>
          <BalanceRow>
            <LabelMd color="gray.400" fontWeight="500">
              <input style={{ display: 'none' }} disabled={true} name="asset" value={asset.id} />
              {asset.name || asset.id}
            </LabelMd>
            <LabelMd color="gray.300" fontWeight="500">
              {hasBalance && wallet?.assets[asset.id]?.balance}
            </LabelMd>
          </BalanceRow>
        </AvailableBalance>

        <TabsUnstyled defaultValue={0} sx={{ width: '100%' }}>
          <NativeTabsList
            style={{ marginBottom: '16px' }}
            value={activeTab}
            textColor="primary"
            onChange={handleChange}
            aria-label="secondary tabs example"
          >
            <NativeTabItem value={0} label={t('limit')} />
          </NativeTabsList>
        </TabsUnstyled>
        {!hasBalance && (
          <BodyCopy color="gray.500" textAlign="center" m={32}>
            {t('insufficient-balance')}
          </BodyCopy>
        )}
        {hasBalance && (
          <MaterialBox className="flex flex-col mb-4">
            <MainInput
              sx={{
                backgroundColor: theme.colors.gray['900'],
                border: 2,
                borderColor: theme.colors.gray['700'],
                marginBottom: '1rem'
              }}
              type="number"
              pattern="\d*"
              id="price"
              name="price"
              decimals={6}
              orderType={order.type}
              value={order.price}
              onChange={handleChange}
              autocomplete="false"
              min="0"
              step="0.000001"
              inputMode="decimal"
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
            <MainInput
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
            <AmountRange
              sx={{
                margin: '0px 0.5rem',
                width: '95%'
              }}
              // txnFee={txnFee}
              onChange={(e) => handleChange(e, 'type')}
              value={order.amount}
              marks={true}
              step={10}
              min={0}
              max={100}
            />
            <MainInput
              id="total"
              name="total"
              type="text"
              decimals={6}
              color="primary"
              sx={{
                backgroundColor: theme.colors.gray['900'],
                border: 2,
                borderColor: theme.colors.gray['700'],
                marginBottom: '1rem'
              }}
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
        )}
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
          {buttonProps[order.type].text}
        </MaterialButton>
      </FormControl>
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
