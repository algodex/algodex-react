import { ArrowLeft, ExternalLink } from 'react-feather'
import { Fragment, useCallback } from 'react'
import { convertFromAsaUnits, numberFormatter } from 'services/convert'

import { floatToFixed } from 'services/display'
import styled from 'styled-components'
import theme from 'theme'
import { useAssetPriceQuery } from 'hooks/useAlgodex'
import useTranslation from 'next-translate/useTranslation'
import { useUserStore } from 'store'

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
export const AssetInfo = ({ asset, price }) => {
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
  const { data: dexAsset } = useAssetPriceQuery({
    asset,
    options: {
      refetchInterval: 5000,
      enabled: price?.isTraded || false,
      initialData: price
    }
  })
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
            <BodyCopy as="span">{asset.url}</BodyCopy>
          </a>
        </AssetUrl>
      )
    }
    return null
  }

  return (
    <Container>
      <InfoContainer>
        {dexAsset?.isTraded ? (
          <button onClick={onClick}>
            <ButtonText type="button">
              <ArrowLeft />
              <div>{t('back-to-chart')}</div>
            </ButtonText>
          </button>
        ) : null}
        <HeaderContainer>
          <HeaderLg color="gray.100" mb={2}>
            {renderName()}
          </HeaderLg>
          {renderLink()}
        </HeaderContainer>
        <InfoList>
          <InfoItem>
            <BodyCopyTiny as="dt" color="gray.500">
              {t('description')}
            </BodyCopyTiny>
            <BodyCopy as="dd" fontFamily={theme.fontFamilies.heading} fontWeight="400">
              {description}
            </BodyCopy>
          </InfoItem>
          <InfoItem halfWidth>
            <BodyCopyTiny as="dt" color="gray.500">
              {t('circulating-supply')}
            </BodyCopyTiny>
            <BodyCopy as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">
              {numberFormatter(asset.circulating)}
            </BodyCopy>
          </InfoItem>
          <InfoItem halfWidth>
            <BodyCopyTiny as="dt" color="gray.500">
              {t('total-supply')}
            </BodyCopyTiny>
            <BodyCopy as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">
              {numberFormatter(asset.total)}
            </BodyCopy>
          </InfoItem>
          <InfoItem>
            <BodyCopyTiny as="dt" color="gray.500">
              ASA ID
            </BodyCopyTiny>
            <BodyCopy as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">
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
          {dexAsset?.isTraded ? (
            <Fragment>
              <InfoItem>
                <BodyCopyTiny as="dt" color="gray.500">
                  Price
                </BodyCopyTiny>
                <BodyCopy as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">
                  {floatToFixed(
                    asset.decimals !== 6
                      ? convertFromAsaUnits(dexAsset.price, asset.decimals)
                      : dexAsset.price
                  )}{' '}
                  ALGO
                </BodyCopy>
              </InfoItem>
              <InfoItem>
                <BodyCopyTiny as="dt" color="gray.500">
                  Change
                </BodyCopyTiny>
                <BodyCopy as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">
                  {dexAsset.price24Change}%
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

export default AssetInfo
