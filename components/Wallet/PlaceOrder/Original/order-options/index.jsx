import {
  ArrowContainer,
  Container,
  ExpandContainer,
  ExpandContent,
  ExpandContentWrapper,
  ExpandToggle,
  OptionsButton,
  OptionsInput,
  OptionsWrapper
} from './order-options.css'
import { BodyCopyTiny, LabelSm } from '@/components/Typography'
/* eslint-disable */
import { useMemo, useState } from 'react'

import { ChevronDown } from 'react-feather'
import Icon from 'components/Icon'
// import InfoButton from 'components/info-button'
import OrderSizeFilter from '../order-size-filter'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

function OrderOptions(props) {
  const { order, onChange, allowTaker, orderFilter, setOrderFilter, asset } = props
  const { t } = useTranslation('place-order')
  const router = useRouter()
  const showMakerOnly = router && router.query.showMakerOnly === 'true'

  const [isExpanded, setIsExpanded] = useState(false)

  const handleChange = (e) => {
    onChange(e)
  }

  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      setIsExpanded(!isExpanded)
    }
  }

  const renderMessage = () => {
    switch (order.execution) {
      case 'maker':
        return `Your order will only execute as a maker order.`

      case 'taker':
        return t('taker-only-desc')

      case 'both':
        return t('maker-taker-desc')

      default:
        return null
    }
  }

  return (
    <Container isExpanded={isExpanded} type={order.type}>
      <ExpandToggle
        onClick={() => asset.isAssetTradable ? setIsExpanded(!isExpanded) : () => {}}
        onKeyDown={() => asset.isAssetTradable ? handleKeyDown : () => {}}
        tabIndex="0"
      >
        <LabelSm color="gray.500">{t('advanced-options')}</LabelSm>
        <ArrowContainer>
          <ChevronDown />
        </ArrowContainer>
      </ExpandToggle>
      <ExpandContainer aria-hidden={!isExpanded} aria-expanded={isExpanded}>
        <ExpandContentWrapper>
          <ExpandContent>
            <OptionsWrapper>
              <OptionsInput
                type="checkbox"
                id="order-both"
                value="both"
                checked={order.execution === 'both'}
                onChange={handleChange}
              />
              <OptionsButton as="label" htmlFor="order-both" size="small" type={order.type}>
                {t('maker-taker')}
              </OptionsButton>

              {showMakerOnly && (
                <>
                  <OptionsInput
                    type="checkbox"
                    id="order-maker"
                    value="maker"
                    checked={order.execution === 'maker'}
                    onChange={handleChange}
                  />
                  <OptionsButton as="label" htmlFor="order-maker" size="small" type={order.type}>
                    Maker Only
                  </OptionsButton>
                </>
              )}
              <OptionsInput
                type="checkbox"
                disabled={!allowTaker}
                id="order-taker"
                value="taker"
                checked={order.execution === 'taker'}
                onChange={handleChange}
              />
              <OptionsButton as="label" htmlFor="order-taker" size="small" type={order.type}>
                {t('taker-only')}
              </OptionsButton>
            </OptionsWrapper>
            <BodyCopyTiny color="gray.500" textTransform="none">
              {renderMessage()}
            </BodyCopyTiny>

            <div className="flex flex-row justify-between mt-5 align-middle">
              {/* <span className="text-sm font-semibold py-1">{t("order-size-filtering")}:</span> */}
              <span className="text-sm font-semibold py-1">Order Size Filtering:</span>
              <div className="relative">
                <input
                  className="text-white text-lg bg-gray-900 h-7 w-14 rounded-sm border-2 border-gray-700 pr-5 text-right appearance-none"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  step="1"
                  inputMode="numeric"
                  pattern="\d*"
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                ></input>
                <label className="absolute right-2 top-2">
                  <Icon color="gray" fillGradient={400} use="algoLogo" size={0.625} />
                </label>
              </div>
            </div>
            {/* <span className="text-xs"><InfoButton className="inline fill-current text-gray-500 " size={12} /> See FAQ</span> */}

            <div className="pt-5 flex justify-between text-gray-500 text-sm">
              <span className="flex items-center block align-middle">
                0<Icon color="gray" fillGradient={500} use="algoLogo" size={0.625} className="ml-1"></Icon>
              </span>
              <span className="flex items-center block align-middle">
                100<Icon color="gray" fillGradient={500} use="algoLogo" size={0.625} className="ml-1"></Icon>
              </span>
            </div>
            <OrderSizeFilter value={orderFilter} onChange={setOrderFilter}></OrderSizeFilter>
            <div className="flex justify-between text-gray-500 text-sm">
              <span className="block">Better Execution</span>
              <span className="block">Less Lag</span>

              {/* <span class="block">{t("better-execution")}</span>   */}
              {/* <span class="block">{t("less-lag")}</span> */}
            </div>
          </ExpandContent>
        </ExpandContentWrapper>
      </ExpandContainer>
    </Container>
  )
}

OrderOptions.propTypes = {
  order: PropTypes.object.isRequired,
  asset: PropTypes.object,
  orderFilter: PropTypes.any,
  setOrderFilter: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  allowTaker: PropTypes.bool
}

OrderOptions.defaultProps = {
  allowTaker: true
}

export default OrderOptions
