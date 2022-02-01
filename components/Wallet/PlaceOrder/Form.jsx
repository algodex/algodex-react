import { BodyCopy, BodyCopyTiny, HeaderCaps, LabelMd, LabelSm } from 'components/Typography'
// import { Tab as _Tab, Header as _Tabs } from '../../Tabs/orders.css'
import { useMemo, useState } from 'react'

// import Tabs from 'components/Tabs'
import AdvancedOptions from './Form/AdvancedOptions'
import { default as AmountRange } from 'components/Input/Slider'
// import Big from 'big.js'
import Button from '../../Button'
import CurrencyInput from '../../Input/CurrencyInput'
import { FormControl } from '@mui/material'
import Icon from 'components/Icon'
import { Info } from 'react-feather'
import PropTypes from 'prop-types'
import { Section } from '@/components/Layout/Section'
import Tabs from 'components/Tabs/Tabs'
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

// const ToggleInput = styled.input`
//   opacity: 0;
//   position: absolute;
// `

// const ToggleBtn = styled(Button)`
//   flex: 1 1 auto;
//   display: flex;
//   justify-content: center;
//   margin: 0;
//   line-height: 1.25;
//   background-color: ${({ theme }) => theme.colors.gray['700']};

//   &:hover {
//     background-color: ${({ theme }) => lighten(0.05, theme.colors.gray['700'])};
//   }
//   label {
//     cursor: pointer;
//     width: 100%;
//   }
//   && {
//     ${ToggleInput}:focus + & {
//       z-index: 1;
//       border-radius: 3px;
//     }
//   }
// `

// const BuyButton = styled(ToggleBtn)`
//   border-top-right-radius: 0;
//   border-bottom-right-radius: 0;

//   && {
//     ${ToggleInput}:checked + & {
//       background-color: ${({ theme }) => theme.colors.green['500']};
//     }

//     ${ToggleInput}:checked + &:hover {
//       background-color: ${({ theme }) => lighten(0.05, theme.colors.green['500'])};
//     }

//     ${ToggleInput}:focus + & {
//       box-shadow: 0 0 0 0.2rem #4b9064;
//     }
//   }
// `

// const SellButton = styled(ToggleBtn)`
//   border-top-left-radius: 0;
//   border-bottom-left-radius: 0;

//   && {
//     ${ToggleInput}:checked + & {
//       background-color: ${({ theme }) => theme.colors.red['500']};
//     }

//     ${ToggleInput}:checked + &:hover {
//       background-color: ${({ theme }) => lighten(0.05, theme.colors.red['500'])};
//     }

//     ${ToggleInput}:focus + & {
//       box-shadow: 0 0 0 0.2rem #b23639;
//     }
//   }
// `

const BalanceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`

// const Tab = styled(_Tab)`
//   font-size: 0.875rem;
//   padding: 0.625rem 0;
//   letter-spacing: 0.12rem;
//   border-bottom-width: 4px;
// `

// const Tabs = styled(_Tabs)`
//   padding: 0;
//   margin-bottom: 1rem;

//   ${Tab} {
//     border-bottom-color: ${({ orderType, theme }) =>
//       orderType === 'sell' ? theme.colors.red['500'] : theme.colors.green['500']};
//   }
// `

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
          {
            // Tabs List (We can have multiple tabs)
            // Action for each tab when the tab is clicked
            // has Panel (if the page should render a panel else return active tab index)
            // size (small, medium, large)
            // other props
          }
          <Tabs
            type="button"
            onClick={(e) => handleChange(e, 'type')}
            size="medium"
            hasPanel={false}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
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

        {/* <Tabs orderType={order.type}>
          <Tab isActive>{t('limit')}</Tab>
        </Tabs> */}
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
