import PropTypes from 'prop-types'
import Image from 'next/image'
import { HeaderLg, BodyCopy, BodyCopyTiny } from 'components/type'
import SvgImage from 'components/svg-image'

import theme from 'theme'

import { ArrowLeft } from 'react-feather'

import {
  Container,
  InfoContainer,
  HeaderContainer,
  AssetUrl,
  InfoList,
  InfoItem,
  AlgoExplorerLink,
  ExternalLinkIcon,
  ButtonText
} from './asset-info.css'
import useTranslation from 'next-translate/useTranslation'
import { useAssetPriceQuery } from 'hooks/useAlgodex'
import { Fragment, useCallback } from 'react'
import { useUserStore } from '../../store'
import { floatToFixed } from 'services/display'
import { convertFromBaseUnits } from 'services/convert'

const AssetInfo = ({ asset, price }) => {
  const { t } = useTranslation('assets')
  const setShowAssetInfo = useUserStore((state) => state.setShowAssetInfo)
  const description = asset.description || asset?.verified_info?.description || 'N/A'
  const onClick = useCallback(() => {
    setShowAssetInfo(false)
  }, [asset])
  const { data: dexAsset } = useAssetPriceQuery({
    asset,
    options: {
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
              {asset.circulating || 'TODO'}
            </BodyCopy>
          </InfoItem>
          <InfoItem halfWidth>
            <BodyCopyTiny as="dt" color="gray.500">
              {t('total-supply')}
            </BodyCopyTiny>
            <BodyCopy as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">
              {asset.total}
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
                  {floatToFixed(convertFromBaseUnits(dexAsset.price, asset.decimals))} ALGO
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
          <a href={asset.explorerUrl} target="_blank" rel="noreferrer">
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
