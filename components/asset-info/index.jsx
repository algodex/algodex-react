// import Image from 'next/image'
import { HeaderLg, BodyCopy, BodyCopyTiny } from 'components/type'
import SvgImage from 'components/svg-image'
import useStore from 'store/use-store'
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

export default function AssetInfo() {
  const { t } = useTranslation('assets')
  const asset = useStore((state) => state.asset)

  const setShowAssetInfo = useStore((state) => state.setShowAssetInfo)

  const description = asset.info.description || 'N/A'

  const renderName = () => {
    if (asset.verified) {
      return (
        <>
          {`${asset.info.fullName} `}
          <span>
            {`(${asset.name}) `}
            <SvgImage use="verified" w={2} h={2} />
          </span>
        </>
      )
    }
    return <>{`${asset.info.fullName} (${asset.name})`}</>
  }

  const renderLink = () => {
    const expression =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,7}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    const regex = new RegExp(expression)

    if (asset.info.url && regex.test(asset.info.url)) {
      return (
        <AssetUrl>
          <a href={asset.info.url} target="_blank" rel="noreferrer">
            <BodyCopy as="span">{asset.info.url}</BodyCopy>
          </a>
        </AssetUrl>
      )
    }
    return null
  }

  return (
    <Container>
      <InfoContainer>
        {asset.isTraded ? (
          <ButtonText type="button" onClick={() => setShowAssetInfo(false)}>
            <ArrowLeft />
            <div>{t('back-to-chart')}</div>
          </ButtonText>
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
              {asset.info.supply.circulating}
            </BodyCopy>
          </InfoItem>
          <InfoItem halfWidth>
            <BodyCopyTiny as="dt" color="gray.500">
              {t('total-supply')}
            </BodyCopyTiny>
            <BodyCopy as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">
              {asset.info.supply.total}
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
        </InfoList>
        <AlgoExplorerLink>
          <a href={asset.info.algoExplorerUrl} target="_blank" rel="noreferrer">
            {/*<Image*/}
            {/*  // loader={myLoader}*/}
            {/*  src="/algo-explorer.png"*/}
            {/*  // src={explorerPic}*/}
            {/*  alt="View asset on Algo Explorer"*/}
            {/*  width="100"*/}
            {/*  height="15"*/}
            {/*/>*/}
            <ExternalLinkIcon />
          </a>
        </AlgoExplorerLink>
      </InfoContainer>
    </Container>
  )
}
