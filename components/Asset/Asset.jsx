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

import { ArrowLeft, ExternalLink } from 'react-feather'
// import { Typography, Typography, Typography } from '@/components/Typography'
import { Fragment, useCallback } from 'react'

import Button from 'components/Button'
import Image from 'next/image'
import Link from '@/components/Nav/Link'
import PropTypes from 'prop-types'
import Spinner from '@/components/Spinner'
import SvgImage from '@/components/SvgImage'
import Typography from '@mui/material/Typography'
import convertFromBaseUnits from '@algodex/algodex-sdk/lib/utils/units/fromBaseUnits'
import floatToFixed from '@algodex/algodex-sdk/lib/utils/format/floatToFixed'
import { getActiveNetwork } from 'services/environment'
import styled from '@emotion/styled'
import theme from '../../theme/index'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'
import { withAssetPriceQuery } from '@algodex/algodex-hooks'

const Container = styled.div`
  flex: 1 1 0%;
  background-color: ${({ theme }) => theme.palette.gray[900]};
`

const InfoContainer = styled.div`
  padding: 4rem;
  max-width: 40rem;
  position: absolute;
`

const HeaderContainer = styled.div`
  padding-bottom: 2rem;
  margin-top: 1rem;
  h2 {
    > span {
      white-space: nowrap;

      svg {
        position: relative;
        top: -0.125rem;
      }
    }
  }
`

const AssetUrl = styled.div`
  a {
    color: ${({ theme }) => theme.palette.gray[400]};
    text-decoration: none;
    transition: color 100ms;

    &:hover {
      color: ${({ theme }) => theme.palette.gray[100]};
    }
  }
`

const InfoList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const InfoItem = styled.div`
  flex: ${({ halfWidth }) => (halfWidth ? '50%' : '100%')};
  margin-bottom: 2rem;
`

const ExternalLinkIcon = styled(ExternalLink)`
  stroke: ${({ theme }) => theme.palette.gray[500]};
  width: 1rem;
  height: 1rem;
`

const AlgoExplorerLink = styled.div`
  ${ExternalLinkIcon} {
    position: relative;
    top: -0.1875rem;
    margin-left: 0.5rem;
  }
`
export function AssetInfo({ asset }) {
  // console.log(`AssetInfo(`, arguments[0], `)`)
  const { t } = useTranslation('assets')
  const setShowAssetInfo = useUserStore((state) => state.setShowAssetInfo)
  const description = asset.description || asset?.verified_info?.description || 'N/A'
  const activeNetwork = getActiveNetwork();

  const explorerURL =
    activeNetwork === 'testnet'
      ? `https://testnet.algoexplorer.io/asset/`
      : `https://algoexplorer.io/asset/`

  const onClick = useCallback(() => {
    setShowAssetInfo(false)
  }, [setShowAssetInfo])

  const renderName = useCallback(() => {
    if (asset.verified) {
      return (
        <>
          {`${asset.fullName} `}
          <span>
            {`(${asset.name}) `}
            <SvgImage use="verified" w={2} h={2} />
          </span>
        </>
      )
    }
    return <>{`${asset.fullName} (${asset.name})`}</>
  }, [asset.fullName, asset.name, asset.verified])

  const renderLink = useCallback(() => {
    const expression =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,7}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    const regex = new RegExp(expression)

    if (asset.url && regex.test(asset.url)) {
      return (
        <AssetUrl>
          <Link href={asset.url} target="_blank" rel="noreferrer" color="gray.100">
            <Typography variant="subtitle_medium" data-testid="asset-url">
              {asset.url}
            </Typography>
          </Link>
        </AssetUrl>
      )
    }
    return null
  }, [asset.url])

  return (
    <Container>
      <InfoContainer>
        {asset?.price_info?.isTraded ? (
          <Button
            data-testid="asset-info-back-btn"
            color="secondary"
            variant="text"
            onClick={onClick}
          >
            <ArrowLeft />
            <div>{t('back-to-chart')}</div>
          </Button>
        ) : null}
        <HeaderContainer>
          <Typography className='leading-8' variant="h3" data-testid="asset-info-asa-name" color="gray.100" mb={2}>
            {renderName()}
          </Typography>
          {renderLink()}
        </HeaderContainer>
        <InfoList>
          <InfoItem>
            <Typography variant="body_tiny_cap" color="gray.500">
              {t('description')}
            </Typography>
            <Typography className="leading-normal" variant="h6" color="gray.400" data-testid="asset-info-desc">
              {description}
            </Typography>
          </InfoItem>
          <InfoItem halfWidth>
            <Typography variant="body_tiny_cap" color="gray.500">
              {t('circulating-supply')}
            </Typography>
            <Typography data-testid="asset-info-circ-supply" variant="h6" color="gray.400">
              {asset.circulating || 'NA'}
            </Typography>
          </InfoItem>
          <InfoItem halfWidth>
            <Typography variant="body_tiny_cap" color="gray.500">
              {t('total-supply')}
            </Typography>
            <Typography data-testid="asset-info-total-supply" variant="h6" color="gray.400">
              {asset.total}
            </Typography>
          </InfoItem>
          <InfoItem>
            <Typography variant="body_tiny_cap" color="gray.500">
              ASA ID
            </Typography>
            <Typography
              data-testid="asset-info-asa-id"
              fontFamily={theme.fontFamilies.monospace}
              variant="h6"
              color="gray.400"
            >
              {asset.id}
            </Typography>
          </InfoItem>
          {/*<InfoItem>*/}
          {/*  <Typography as="dt" color="gray.500">*/}
          {/*    {t('total-transactions')}*/}
          {/*  </Typography>*/}
          {/*  <Typography as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">*/}
          {/*    {asset.txns}*/}
          {/*  </Typography>*/}
          {/*</InfoItem>*/}
          {/* TODO: Verified Info */}
          {asset?.price_info?.isTraded ? (
            <Fragment>
              <InfoItem>
                <Typography variant="body_tiny_cap" color="gray.500">
                  Price
                </Typography>
                <Typography
                  data-testid="asset-info-price"
                  variant="h6"
                  color="gray.400"
                  fontFamily={theme.fontFamilies.monospace}
                >
                  {floatToFixed(
                    asset?.decimals !== 6
                      ? convertFromBaseUnits(asset?.price_info.price, asset.decimals)
                      : asset?.price_info.price
                  )}{' '}
                  ALGO
                </Typography>
              </InfoItem>
              <InfoItem>
                <Typography variant="body_tiny_cap" color="gray.500">
                  Change
                </Typography>
                <Typography
                  variant="h6"
                  color="gray.400"
                  data-testid="asset-info-pct-change"
                  fontFamily={theme.fontFamilies.monospace}
                >
                  {asset?.price_info.price24Change}%
                </Typography>
              </InfoItem>
            </Fragment>
          ) : null}
        </InfoList>
        <AlgoExplorerLink>
          {/*TODO: Accredit Explorer for Information Provided*/}
          <Link href={`${explorerURL}${asset.id}`} target="_blank" rel="noreferrer">
            <Image
              src="/algo-explorer.png"
              alt="View asset on Algo Explorer"
              width="100"
              height="15"
            />
            <ExternalLinkIcon />
          </Link>
        </AlgoExplorerLink>
      </InfoContainer>
    </Container>
  )
}
AssetInfo.propTypes = {
  asset: PropTypes.object.isRequired,
  price: PropTypes.object
}

export default withAssetPriceQuery(AssetInfo, {
  components: { ServiceError: AssetInfo, Loading: Spinner }
})
