import PropTypes from 'prop-types'
import { HeaderSm, BodyCopy, BodyCopyTiny } from 'components/type'
import SvgImage from 'components/svg-image'

import { InfoPopup, HeaderContainer, InfoList, InfoItem } from './info-flyover.css'

function InfoFlyover(props) {
  const { assetInfo, searchHeight } = props

  const renderName = () => {
    if (assetInfo.verified) {
      return (
        <>
          {`${assetInfo.fullName} `}
          <span>
            {`(${assetInfo.name}) `}
            <SvgImage use="verified" w={2} h={2} />
          </span>
        </>
      )
    }
    return <>{`${assetInfo.fullName} (${assetInfo.name})`}</>
  }

  return (
    <InfoPopup isActive={!!assetInfo} searchHeight={searchHeight}>
      {assetInfo && (
        <HeaderContainer>
          <HeaderSm color="gray.100" mb={2}>
            {renderName()}
          </HeaderSm>
          <InfoList>
            <InfoItem>
              <BodyCopyTiny as="dt" color="gray.500">
                ASA ID
              </BodyCopyTiny>
              <BodyCopy as="dd" fontFamily="'Roboto Mono', monospace" fontSize="1.125rem">
                {assetInfo.id}
              </BodyCopy>
            </InfoItem>
          </InfoList>
        </HeaderContainer>
      )}
    </InfoPopup>
  )
}

InfoFlyover.propTypes = {
  assetInfo: PropTypes.object,
  searchHeight: PropTypes.number
}

export default InfoFlyover
