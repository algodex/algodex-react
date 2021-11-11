import PropTypes from 'prop-types'
import { HeaderSm, BodyCopy, BodyCopyTiny } from 'components/type'
import SvgImage from 'components/svg-image'
import useTranslation from 'next-translate/useTranslation'
import { InfoPopup, HeaderContainer, InfoList, InfoItem, Algos } from './info-flyover.css'

function InfoFlyover(props) {
  const { assetInfo, searchHeight } = props
  const { t } = useTranslation('assets')

  const renderName = () => {
    if (assetInfo.verified) {
      return (
        <>
          {`${assetInfo.fullName} `}
          <span>
            {`(${assetInfo.name}) `}
            <SvgImage use="verified" w={1.5} h={1.5} />
          </span>
        </>
      )
    }
    return <>{`${assetInfo.fullName} (${assetInfo.name})`}</>
  }

  const renderChange = () => {
    const color =
      assetInfo.change === '--' ? 'gray.400' : assetInfo.change < 0 ? 'red.500' : 'green.500'
    const display = assetInfo.change === '--' ? '--' : `${assetInfo.change}%`

    return (
      <InfoItem halfWidth>
        <BodyCopyTiny as="dt" color="gray.500">
          {t('24-hr-change')}
        </BodyCopyTiny>
        <BodyCopy as="dd" fontFamily="'Roboto Mono', monospace" fontSize="1.125rem" color={color}>
          {display}
        </BodyCopy>
      </InfoItem>
    )
  }

  return (
    <InfoPopup
      isActive={!!assetInfo}
      searchHeight={searchHeight}
      isLarge={assetInfo?.hasBeenOrdered}
    >
      {assetInfo && (
        <>
          <HeaderContainer>
            <HeaderSm color="gray.100" mb={3}>
              {renderName()}
            </HeaderSm>
          </HeaderContainer>
          <InfoList>
            <InfoItem>
              <BodyCopyTiny as="dt" color="gray.500">
                ASA ID
              </BodyCopyTiny>
              <BodyCopy as="dd" fontFamily="'Roboto Mono', monospace" fontSize="1.125rem">
                {assetInfo.id}
              </BodyCopy>
            </InfoItem>

            {assetInfo.price?.length > 0 && (
              <>
                <InfoItem halfWidth>
                  <BodyCopyTiny as="dt" color="gray.500">
                    {t('price')} <Algos use="algoLogo" size={0.625} />
                  </BodyCopyTiny>
                  <BodyCopy as="dd" fontFamily="'Roboto Mono', monospace" fontSize="1.125rem">
                    {assetInfo.price}
                  </BodyCopy>
                </InfoItem>
                {renderChange()}
              </>
            )}

            {assetInfo.hasBeenOrdered && (
              <>
                <InfoItem halfWidth>
                  <BodyCopyTiny as="dt" color="gray.500">
                    {t('liquidity')} (Algos)
                  </BodyCopyTiny>
                  <BodyCopy as="dd" fontFamily="'Roboto Mono', monospace" fontSize="1.125rem">
                    {assetInfo.liquidityAlgo}
                  </BodyCopy>
                </InfoItem>
                <InfoItem halfWidth>
                  <BodyCopyTiny as="dt" color="gray.500">
                    {`${t('liquidity')} (${assetInfo.name})`}
                  </BodyCopyTiny>
                  <BodyCopy as="dd" fontFamily="'Roboto Mono', monospace" fontSize="1.125rem">
                    {assetInfo.liquidityAsa}
                  </BodyCopy>
                </InfoItem>
              </>
            )}
          </InfoList>
        </>
      )}
    </InfoPopup>
  )
}

InfoFlyover.propTypes = {
  assetInfo: PropTypes.object,
  searchHeight: PropTypes.number
}

export default InfoFlyover
