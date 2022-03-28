import { ArrowLeft, ExternalLink } from 'react-feather'
import { BodyCopy, BodyCopyTiny, HeaderLg } from '@/components/Typography'
import { Fragment, useCallback } from 'react'

import Image from 'next/image'
import PropTypes from 'prop-types'
import SvgImage from '@/components/SvgImage'
import { convertFromBaseUnits } from '@/services/convert'
import { floatToFixed } from '@/services/display'
import styled from '@emotion/styled'
import theme from '../../theme/index'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'
import { withAssetPriceQuery } from '@/hooks/withAlgodex'
import Spinner from '@/components/Spinner'

const Container = styled.div`
  flex: 1 1 0%;
  background-color: ${({ theme }) => theme.palette.gray[900]};
`

const InfoContainer = styled.div`
  padding: 4rem;
  max-width: 40rem;
`

const ButtonText = styled.button`
  background-color: transparent;
  padding: 0;
  border: none;
  display: flex;
  align-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.gray[400]};
  padding: 5px 0;

  div {
    line-height: 24px;
    margin-left: 5px;
  }
`

const HeaderContainer = styled.div`
  padding-bottom: 2rem;

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

const AssetUrl = styled.p`
  a {
    color: ${({ theme }) => theme.palette.gray[400]};
    text-decoration: none;
    transition: color 100ms;

    &:hover {
      color: ${({ theme }) => theme.palette.gray[100]};
    }
  }
`

const InfoList = styled.dl`
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
  margin-top: 1.25rem;

  a {
    display: inline-flex;
    align-items: center;

    img {
      opacity: 0.75;
      transition: opacity 100ms;
    }

    &:hover {
      img {
        opacity: 1;
      }
    }

    ${ExternalLinkIcon} {
      position: relative;
      top: -0.1875rem;
      margin-left: 0.5rem;
    }
  }
`
export function AssetInfo({ asset }) {
  // console.log(`AssetInfo(`, arguments[0], `)`)
  const { t } = useTranslation('assets')
  const setShowAssetInfo = useUserStore((state) => state.setShowAssetInfo)
  const description = asset.description || asset?.verified_info?.description || 'N/A'
  const activeNetwork = useUserStore((state) => state.activeNetwork)

  const explorerURL =
    activeNetwork === 'testnet'
      ? `https://testnet.algoexplorer.io/asset/`
      : `https://algoexplorer.io/asset/`

  const onClick = useCallback(() => {
    setShowAssetInfo(false)
  }, [setShowAssetInfo])

  const renderName = () => {
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
  }

  const renderLink = () => {
    const expression =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,7}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    const regex = new RegExp(expression)

    if (asset.url && regex.test(asset.url)) {
      return (
        <AssetUrl>
          <a href={asset.url} target="_blank" rel="noreferrer">
            <BodyCopy data-testid="asset-url" as="span">
              {asset.url}
            </BodyCopy>
          </a>
        </AssetUrl>
      )
    }
    return null
  }

  return (
    <Container>
      <InfoContainer>
        {asset?.price_info?.isTraded ? (
          <button data-testid="asset-info-back-btn" onClick={onClick}>
            <ButtonText type="button">
              <ArrowLeft />
              <div>{t('back-to-chart')}</div>
            </ButtonText>
          </button>
        ) : null}
        <HeaderContainer>
          <HeaderLg data-testid="asset-info-asa-name" color="gray.100" mb={2}>
            {renderName()}
          </HeaderLg>
          {renderLink()}
        </HeaderContainer>
        <InfoList>
          <InfoItem>
            <BodyCopyTiny as="dt" color="gray.500">
              {t('description')}
            </BodyCopyTiny>
            <BodyCopy
              data-testid="asset-info-desc"
              as="dd"
              fontFamily={theme.fontFamilies.heading}
              fontWeight="400"
            >
              {description}
            </BodyCopy>
          </InfoItem>
          <InfoItem halfWidth>
            <BodyCopyTiny as="dt" color="gray.500">
              {t('circulating-supply')}
            </BodyCopyTiny>
            <BodyCopy
              data-testid="asset-info-circ-supply"
              as="dd"
              fontFamily={theme.fontFamilies.monospace}
              fontSize="1.25rem"
            >
              {asset.circulating || 'NA'}
            </BodyCopy>
          </InfoItem>
          <InfoItem halfWidth>
            <BodyCopyTiny as="dt" color="gray.500">
              {t('total-supply')}
            </BodyCopyTiny>
            <BodyCopy
              data-testid="asset-info-total-supply"
              as="dd"
              fontFamily={theme.fontFamilies.monospace}
              fontSize="1.25rem"
            >
              {asset.total}
            </BodyCopy>
          </InfoItem>
          <InfoItem>
            <BodyCopyTiny as="dt" color="gray.500">
              ASA ID
            </BodyCopyTiny>
            <BodyCopy
              data-testid="asset-info-asa-id"
              as="dd"
              fontFamily={theme.fontFamilies.monospace}
              fontSize="1.25rem"
            >
              {asset.id}
            </BodyCopy>
          </InfoItem>
          {/*<InfoItem>*/}
          {/*  <BodyCopyTiny as="dt" color="gray.500">*/}
          {/*    {t('total-transactions')}*/}
          {/*  </BodyCopyTiny>*/}
          {/*  <BodyCopy as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">*/}
          {/*    {asset.txns}*/}
          {/*  </BodyCopy>*/}
          {/*</InfoItem>*/}
          {/* TODO: Verified Info */}
          {asset?.price_info?.isTraded ? (
            <Fragment>
              <InfoItem>
                <BodyCopyTiny as="dt" color="gray.500">
                  Price
                </BodyCopyTiny>
                <BodyCopy
                  data-testid="asset-info-price"
                  as="dd"
                  fontFamily={theme.fontFamilies.monospace}
                  fontSize="1.25rem"
                >
                  {floatToFixed(
                    asset?.decimals !== 6
                      ? convertFromBaseUnits(asset?.price_info.price, asset.decimals)
                      : asset?.price_info.price
                  )}{' '}
                  ALGO
                </BodyCopy>
              </InfoItem>
              <InfoItem>
                <BodyCopyTiny as="dt" color="gray.500">
                  Change
                </BodyCopyTiny>
                <BodyCopy
                  data-testid="asset-info-pct-change"
                  as="dd"
                  fontFamily={theme.fontFamilies.monospace}
                  fontSize="1.25rem"
                >
                  {asset?.price_info.price24Change}%
                </BodyCopy>
              </InfoItem>
            </Fragment>
          ) : null}
        </InfoList>
        <AlgoExplorerLink>
          {/*TODO: Accredit Explorer for Information Provided*/}
          <a href={`${explorerURL}${asset.id}`} target="_blank" rel="noreferrer">
            <Image
              src="/algo-explorer.png"
              alt="View asset on Algo Explorer"
              width="100"
              height="15"
            />
            <ExternalLinkIcon />
          </a>
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
