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

// import { Typography, Typography, Typography } from 'components/Typography'
import { lighten, rgba } from 'polished'

import Icon from 'components/Icon'
import PropTypes from 'prop-types'
import SvgImage from 'components/SvgImage'
import Typography from '@mui/material/Typography'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'
import { useCallback } from 'react'
import floatToFixed from '@algodex/algodex-sdk/lib/utils/format/floatToFixed'

export const InfoPopup = styled.aside`
  width: ${({ isLarge }) => (isLarge ? '480px' : '360px')};
  background-color: ${({ theme }) => lighten(0.02, theme.colors.gray['800'])};
  box-shadow: 3px 3px 3px 3px ${({ theme }) => rgba(theme.colors.gray['900'], 0.25)};
`

const HeaderContainer = styled.div`
  h3 {
    > span {
      white-space: nowrap;

      svg {
        position: relative;
        top: -0.125rem;
        margin-left: 0.125rem;
      }
    }
  }
`

const InfoList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const InfoItem = styled.div`
  flex: ${({ halfWidth }) => (halfWidth ? '50%' : '100%')};

  &:not(:last-child) {
    margin-bottom: 1.1rem;
  }
`

const Algos = styled(Icon)`
  position: relative;
  margin-left: 0.225rem;
  fill: ${({ theme }) => theme.palette.gray['500']};
`

export function SearchFlyover(props) {
  const { row } = props
  const { decimals } = row
  const { t } = useTranslation('assets')

  // Assumes asaAmount is formatted, i.e. has decimal formatting in it
  const getAsaDecimals = useCallback((asaAmount) => {
    if (decimals === undefined) {
      throw 'decimals is undefined!'
    }
    if (asaAmount < 1) {
      return floatToFixed(asaAmount, decimals, decimals)
    }
    if (asaAmount < 1000) {
      return floatToFixed(asaAmount, Math.min(2, decimals), Math.min(2, decimals))
    }
    return Math.round(asaAmount)
  }, [decimals])

  const renderName = useCallback(() => {
    if (row.verified) {
      return (
        <>
          {`${row.fullName || row.name} `}
          <span>
            {`(${row.name}) `}
            <SvgImage use="verified" w={1.5} h={1.5} />
          </span>
        </>
      )
    }
    return <>{`${row.fullName || row.name} (${row.name})`}</>
  }, [row.fullName, row.name, row.verified])

  const getLocaleString = (num) => {
    const fnum = typeof num === 'string' ? parseFloat(num) : num
    return fnum.toLocaleString()
  }
  const renderChange = useCallback(() => {
    const color = row.change === '--' ? 'gray.400' : row.change < 0 ? 'red.500' : 'green.500'
    const display = row.change === '--' ? '--' : `${row.change}%`

    return (
      <InfoItem halfWidth>
        <Typography variant="body_tiny_cap" color="gray.500">
          {t('24-hr-change')}
        </Typography>
        <Typography
          variant="h6"
          fontFamily="'Roboto Mono', monospace"
          fontSize="1.125rem"
          color={color}
        >
          {display}
        </Typography>
      </InfoItem>
    )
  }, [row.change, t])

  return (
    <InfoPopup className="bg-gray-800 p-4 ml-4 rounded" isLarge={row?.hasBeenOrdered}>
      {row && (
        <>
          <HeaderContainer>
            <Typography className='leading-8' variant="h5" color="gray.100" mb={3} data-testid="flyover-asa-name">
              {renderName()}
            </Typography>
          </HeaderContainer>
          <InfoList>
            <InfoItem>
              <Typography variant="body_tiny_cap" color="gray.500">
                ASA ID
              </Typography>
              <Typography
                variant="h6"
                color="gray.400"
                data-testid="flyover-asa-id"
                fontFamily="'Roboto Mono', monospace"
              >
                {row.id}
              </Typography>
            </InfoItem>

            {row.price?.length > 0 && (
              <>
                <InfoItem halfWidth>
                  <Typography
                    variant="body_tiny_cap"
                    color="gray.500"
                    className="flex items-center"
                  >
                    {t('price')} <Algos use="algoLogo" size={0.625} />
                  </Typography>
                  <Typography
                    variant="h6"
                    color="gray.400"
                    data-testid="flyover-asa-price"
                    fontFamily="'Roboto Mono', monospace"
                  >
                    {row.price}
                  </Typography>
                </InfoItem>
                {renderChange()}
              </>
            )}

            {row.hasBeenOrdered && (
              <>
                <InfoItem halfWidth>
                  <Typography variant="body_tiny_cap" color="gray.500">
                    {t('liquidity')} (Algos)
                  </Typography>
                  <Typography
                    variant="h6"
                    color="gray.400"
                    data-testid="flyover-algo-liquidity"
                    fontFamily="'Roboto Mono', monospace"
                  >
                    {getLocaleString(floatToFixed(row.liquidityAlgo, 2, 2))}
                  </Typography>
                </InfoItem>
                <InfoItem halfWidth>
                  <Typography variant="body_tiny_cap" color="gray.500">
                    {`${t('liquidity')} (${row.name})`}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="gray.400"
                    data-testid="flyover-asa-liqidity"
                    fontFamily="'Roboto Mono', monospace"
                  >
                    {decimals && getLocaleString(getAsaDecimals(row.liquidityAsa))}
                  </Typography>
                </InfoItem>
              </>
            )}
          </InfoList>
        </>
      )}
    </InfoPopup>
  )
}

SearchFlyover.propTypes = {
  row: PropTypes.object
}

export default SearchFlyover
