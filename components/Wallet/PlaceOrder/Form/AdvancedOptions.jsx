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

import Button from '../../../Button'
import { ButtonGroup } from '@mui/material'
import { ChevronDown } from 'react-feather'
import Icon from 'components/Icon'
import { default as MUIInputAdornment } from '@mui/material/InputAdornment'
import { default as MaterialBox } from '@mui/material/Box'
// import InfoButton from 'components/info-button'
import { default as MaterialButton } from '@mui/material/Button'
import OrderSizeFilter from 'components/Input/Slider'
import OutlinedInput from '@/components/Input/OutlinedInput'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { lighten } from 'polished'
import styled from '@emotion/styled'
import theme from 'theme'
import { useRouter } from 'next/router'
import { useState, useMemo, useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '../../../../store/use-user-state'

export const ExpandToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  // border-radius: 3px;
  padding: 0.25rem 0.25rem;
  position: relative;
  left: -0.25rem;
  width: calc(100% + 0.5rem);
`
ExpandToggle.defaultProps = {
  execution: 'button'
}
export const ArrowContainer = styled.div`
  line-height: 0;
  transition: transform 200ms ease 0s;

  svg {
    color: ${({ theme }) => theme.palette.gray['500']};
    width: 1rem;
    height: 1rem;
    transition: transform 200ms ease-in-out;
  }
`

export const ExpandContainer = styled.div`
  z-index: 1;
  transition: height 200ms ease-in-out;
  position: relative;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${ExpandToggle} {
    &:focus {
      outline: 0;
    }
  }

  ${ArrowContainer} {
    transform: ${({ isExpanded }) => (isExpanded ? 'scaleY(-1)' : 'scaleY(1)')};
  }

  ${ExpandContainer} {
    height: ${({ isExpanded }) => (isExpanded ? 'auto' : '0')};
    overflow: ${({ isExpanded }) => (isExpanded ? 'visible' : 'auto')};
  }
`

export const ExpandContentWrapper = styled.div`
  inset: -0.5rem;
  padding: 0.5rem 0;
`

export const ExpandContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const OptionsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 1.9rem;
`

export const OptionsInput = styled.input`
  opacity: 0;
  position: absolute;
`

export const OptionsButton = styled(Button)`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  margin: 0;
  line-height: 1.25;
  border-radius: 0;
  padding: 0.375rem;
  font-size: 0.625rem;
  text-align: center;
  text-transform: none;
  margin-right: 1px;
  background-color: ${({ theme }) => theme.palette.gray['700']};

  &:hover {
    background-color: ${({ theme }) => lighten(0.05, theme.palette.gray['700'])};
  }

  &:nth-of-type(2) {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  &:last-of-type {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    margin-right: 0;
  }

  && {
    ${OptionsInput}:checked + & {
      background-color: ${({ theme, type }) => {
        const color = type === 'buy' ? 'green' : 'red'
        return theme.palette[color]['500']
      }};
    }

    ${OptionsInput}:checked + &:hover {
      background-color: ${({ theme, type }) => {
        const color = type === 'buy' ? 'green' : 'red'
        return lighten(0.05, theme.palette[color]['500'])
      }};
    }

    ${OptionsInput}:focus + & {
      box-shadow: ${({ theme, type }) => {
        const color = type === 'buy' ? 'green' : 'red'
        return `0 0 0 0.2rem ${theme.palette.focus[color]}`
      }};
    }

    ${OptionsInput}:disabled + & {
      opacity: 0.25;
      pointer-events: none;
      cursor: default;
    }
  }

  && {
    ${OptionsInput}:focus + & {
      z-index: 1;
      border-radius: 3px;
    }
  }
`

/**
 *
 * @param order
 * @param onChange
 * @param allowTaker
 * @returns {JSX.Element}
 * @constructor
 */
export function AdvancedOptions({ order, onChange }) {
  const { t } = useTranslation('place-order')
  const newOrderSizeFilter = useUserStore((state) => state.newOrderSizeFilter)
  const setNewOrderSizeFilter = useUserStore((state) => state.setNewOrderSizeFilter)
  const router = useRouter()
  const showMakerOnly = useMemo(() => router && router.query.showMakerOnly === 'true',
    [router])

  const [isExpanded, setIsExpanded] = useState(false)

  const handleChange = useCallback((e, key, value) => {
    onChange(e, key, value)
  }, [onChange])

  const handleKeyDown = useCallback((e) => {
    if (e.key === ' ') {
      setIsExpanded(!isExpanded)
    }
  }, [isExpanded])

  const renderMessage = useCallback(() => {
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
  }, [order.execution, t])

  const marks = useMemo(() => ([
    {
      value: 0
    },
    {
      value: 25
    },
    {
      value: 50
    },
    {
      value: 75
    },
    {
      value: 100
    }
  ]), [])

  return (
    <Container isExpanded={isExpanded} type={order.type}>
      <ExpandToggle
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={handleKeyDown}
        tabIndex="0"
      >
        <Typography variant="body_tiny_cap_bold" color="gray.500">
          {t('advanced-options')}
        </Typography>
        <ArrowContainer>
          <ChevronDown />
        </ArrowContainer>
      </ExpandToggle>
      <ExpandContainer aria-hidden={!isExpanded} aria-expanded={isExpanded}>
        <ExpandContentWrapper>
          <ExpandContent>
            <OptionsWrapper>
              <ButtonGroup variant="contained" size="small" fullWidth>
                <MaterialButton
                  variant={order.execution === 'both' ? 'primary' : 'default'}
                  className="px-2"
                  onClick={(e) => handleChange(e, 'execution', 'both')}
                  name="execution"
                  value="both"
                >
                  <Typography variant="body_tiny_bold">{t('maker-taker')}</Typography>
                </MaterialButton>
                {showMakerOnly && (
                  <>
                    <MaterialButton
                      variant={order.execution === 'maker' ? 'sell' : 'default'}
                      size="small"
                      className="py-2"
                      onClick={(e) => handleChange(e, 'execution', 'maker')}
                      name="execution"
                      value="maker"
                    >
                      <Typography variant="body_tiny_bold">Maker Only</Typography>
                    </MaterialButton>
                  </>
                )}
                <MaterialButton
                  disableRipple={true}
                  variant={order.execution === 'taker' ? 'sell' : 'default'}
                  size="small"
                  className="py-2"
                  onClick={(e) => handleChange(e, 'execution', 'taker')}
                  name="execution"
                  value="taker"
                >
                  <Typography variant="body_tiny_bold">{t('taker-only')}</Typography>
                </MaterialButton>
              </ButtonGroup>
              {/* <OptionsInput
                type="checkbox"
                id="order-both"
                value="both"
                checked={order.execution === 'both'}
                onChange={(e) => handleChange(e, 'execution', 'both')}
              />
              <OptionsButton as="label" htmlFor="order-both" size="small" type={order.type}>
                {t('maker-taker')}
              </OptionsButton> */}

              {/* {showMakerOnly && (
                <>
                  <OptionsInput
                    type="checkbox"
                    id="order-maker"
                    value="maker"
                    checked={order.execution === 'maker'}
                    onChange={(e) => handleChange(e, 'execution', 'maker')}
                  />
                  <OptionsButton as="label" htmlFor="order-maker" size="small" type={order.type}>
                    Maker Only
                  </OptionsButton>
                </>
              )} */}
              {/* <OptionsInput
                type="checkbox"
                disabled={!allowTaker}
                id="order-taker"
                value="taker"
                checked={order.execution === 'taker'}
                onChange={(e) => handleChange(e, 'execution', 'taker')}
              />
              <OptionsButton as="label" htmlFor="order-taker" size="small" type={order.type}>
                {t('taker-only')}
              </OptionsButton> */}
            </OptionsWrapper>
            <Typography variant="body_small_medium" color="gray.500" className="mt-2">
              {renderMessage()}
            </Typography>

            <div className="flex flex-row justify-between mt-5 align-middle">
              {/* <span className="text-sm font-semibold py-1">{t("order-size-filtering")}:</span> */}
              <Typography
                variant="body_tiny"
                color="gray.400"
                className="text-sm font-semibold py-1"
              >
                Order Size Filtering:
              </Typography>
              {/* <div className="relative">
                <label className="absolute right-2 top-1">
                  <input
                    className="bg-gray-900 h-7 w-14 rounded-sm border-2 border-gray-700 pr-5 text-right appearance-none"
                    type="number"
                    placeholder="0"
                    min="0"
                    max="100"
                    step="1"
                    inputMode="numeric"
                    pattern="\d*"
                    value={newOrderSizeFilter}
                    onChange={(e) => setNewOrderSizeFilter(e.target.value)}
                  />

                  <Icon use="algoLogo" size={0.625} />
                </label>
              </div> */}
              <OutlinedInput
                sx={{
                  backgroundColor: theme.palette.gray['900'],
                  border: 2,
                  borderColor: theme.palette.gray['700'],
                  m: '0px',
                  pl: '0px'
                }}
                classes={{ input: 'pl-0' }}
                className="h-7 w-16 pr-1 rtl"
                inputProps={{
                  name: 'Order Filter',
                  type: 'number',
                  min: 0,
                  step: 0.000001,
                  inputMode: 'decimal'
                }}
                name="price"
                type="number"
                value={newOrderSizeFilter}
                onChange={(e) => setNewOrderSizeFilter(e.target.value)}
                endAdornment={
                  <MUIInputAdornment position="end">
                    <Icon color="gray" fillGradient="400" use="algoLogo" size={0.625} />
                  </MUIInputAdornment>
                }
              />
            </div>
            {/* <span className="text-xs"><InfoButton className="inline fill-current text-gray-500 " size={12} /> See FAQ</span> */}

            <MaterialBox className="pt-5 flex justify-between text-gray-500 text-sm">
              <MaterialBox className="flex items-center">
                <Typography>0</Typography>
                <Icon
                  use="algoLogo"
                  color="gray"
                  fillGradient="500"
                  size={0.625}
                  className="ml-1"
                />
              </MaterialBox>
              <MaterialBox className="flex items-center">
                <Typography>100</Typography>
                <Icon
                  use="algoLogo"
                  color="gray"
                  fillGradient="500"
                  size={0.625}
                  className="ml-1"
                />
              </MaterialBox>
            </MaterialBox>
            <MaterialBox
              sx={{
                margin: '0 0.9rem'
              }}
            >
              <OrderSizeFilter
                order={order}
                type="line-marks"
                value={newOrderSizeFilter}
                onChange={(e) => setNewOrderSizeFilter(e.target.value)}
                marks={marks}
                max={100}
              />
            </MaterialBox>

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

AdvancedOptions.propTypes = {
  order: PropTypes.object.isRequired,
  onChange: PropTypes.func
}

AdvancedOptions.defaultProps = {}

export default AdvancedOptions
