import { BodyCopy, BodyCopyTiny, HeaderCaps, LabelMd, LabelSm } from 'components/Typography'
import { BtnTabItem, BtnTabsList, NativeTabItem, NativeTabsList } from 'components/Tabs/Tabs'
import { useMemo, useState } from 'react'

import AdvancedOptions from './Form/AdvancedOptions'
import { default as AmountRange } from 'components/Input/Slider'
import Button from '../../Button'
import CurrencyInput from '../../Input/CurrencyInput'
import { FormControl } from '@mui/material'
import Icon from 'components/Icon'
import { Info } from 'react-feather'
import PropTypes from 'prop-types'
import { Section } from '@/components/Layout/Section'
import { TabsUnstyled } from '@mui/base'
import Tooltip from 'components/Tooltip'
import { has } from 'lodash'
// import { lighten } from 'polished'
import styled from 'styled-components'
import useTranslation from 'next-translate/useTranslation'

const Container = styled(Section)`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.dark};
  overflow: hidden scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

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

const SubmitButton = styled(Button)`
  &:focus {
    box-shadow: 0 0 0 0.2rem ${({ orderType }) => (orderType === 'sell' ? '#b23639' : '#4b9064')};
  }
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
export function PlaceOrderForm({ showTitle = true, asset, wallet, onSubmit }) {
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
    <Container data-testid="place-order">
      {showTitle && (
        <header className="p-5">
          <HeaderCaps color="gray.500" mb={1}>
            {t('place-order')}
          </HeaderCaps>
        </header>
      )}
      <FormControl onSubmit={onSubmit} autocomplete="off">
        {/* <section className="flex pb-6">
          <ToggleInput
            type="radio"
            name="type"
            id="type-buy"
            value="buy"
            checked={order.type === 'buy'}
            onChange={(e) => handleChange(e, 'type')}
          />
          <BuyButton>
            <label htmlFor="type-buy">{t('buy')}</label>
          </BuyButton>
          <ToggleInput
            type="radio"
            name="type"
            id="type-sell"
            value="sell"
            checked={order.type === 'sell'}
            onChange={(e) => handleChange(e, 'type')}
          />
          <SellButton>
            <label htmlFor="type-sell">{t('sell')}</label>
          </SellButton>
        </section> */}
        <div className="w-full">
          <TabsUnstyled className="w-full" defaultValue={0} onChange={handleChangeFn}>
            <BtnTabsList value={activeTab}>
              <BtnTabItem className="first-item">
                <button
                  size="small"
                  className={`py-2 py-3 w-full ${
                    activeTab === 0
                      ? 'bg-green-700 rounded-l-md hover:bg-green-800'
                      : 'bg-gray-700 rounded-l-md hover:bg-gray-600'
                  }`}
                  onClick={(e) => handleChange(e, 'type')}
                  name="buy"
                  value="buy"
                >
                  {t('buy')}
                </button>
              </BtnTabItem>
              <BtnTabItem className="last-item">
                <button
                  className={`py-2 py-3 w-full ${
                    activeTab === 1
                      ? 'bg-red-600 rounded-r-lg hover:bg-red-700'
                      : 'bg-gray-700 rounded-r-md hover:bg-gray-600'
                  }`}
                  onClick={(e) => handleChange(e, 'type')}
                  name="sell"
                  value="sell"
                >
                  {t('sell')}
                </button>
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
          <section className="flex flex-col mb-4">
            <CurrencyInput
              type="number"
              pattern="\d*"
              id="price"
              name="af2Km9q"
              label={t('price')}
              asset="ALGO"
              currecy="ALGO"
              decimals={6}
              orderType={order.type}
              // value={order.price}
              // onChange={handleChange}
              autocomplete="false"
              min="0"
              step="0.000001"
              inputMode="decimal"
            />
            <CurrencyInput
              type="number"
              pattern="\d*"
              name="amount"
              label={t('amount')}
              currency={asset.name}
              value={order.amount}
              onChange={handleChange}
              autocomplete="false"
              min="0"
              // step={new Big(10).pow(-1 * asset.decimals).toString()}
              inputMode="decimal"
            />
            <AmountRange
              // txnFee={txnFee}
              onChange={(e) => handleChange(e, 'type')}
              value={order.amount}
              marks={true}
              step={10}
              min={0}
              max={100}
            />
            <CurrencyInput
              name="total"
              type="text"
              label={t('total')}
              currency="ALGO"
              decimals={6}
              value={order.amount * order.price}
              readOnly
              disabled
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
          </section>
        )}
        <SubmitButton
          type="submit"
          variant={buttonProps[order.type].variant}
          size="large"
          block
          orderType={order.type}
          disabled={order.valid}
        >
          {buttonProps[order.type].text}
        </SubmitButton>
      </FormControl>
    </Container>
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
  showTitle: true
}
export default PlaceOrderForm
