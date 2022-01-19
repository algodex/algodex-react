import styled from 'styled-components'
import { rgba, lighten } from 'polished'
import { BodyCopy, BodyCopyTiny, HeaderSm } from 'components/Typography'
import Icon from 'components/Icon'

export const InfoPopup = styled.aside`
  position: fixed;
  top: 100px;
  left: calc(320px + 1.125rem);
  width: ${({ isLarge }) => (isLarge ? '480px' : '360px')};
  background-color: ${({ theme }) => lighten(0.02, theme.colors.gray['800'])};
  z-index: 999;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
  transform: translateY(${({ isActive }) => (isActive ? '0' : '5%')});
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
  padding: 1rem 1.5rem;
  padding-bottom: ${({ isLarge }) => (isLarge ? '0.25rem' : '1.25rem')};
  box-shadow: 3px 3px 3px 3px ${({ theme }) => rgba(theme.colors.gray['900'], 0.25)};

  @media (min-width: 1536px) {
    // top: ${({ searchHeight }) => `${searchHeight + 36}px`};
    left: calc(100% + 1.125rem);
  }
`

export const HeaderContainer = styled.div`
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

export const InfoList = styled.dl`
  display: flex;
  flex-wrap: wrap;
`

export const InfoItem = styled.div`
  flex: ${({ halfWidth }) => (halfWidth ? '50%' : '100%')};

  &:not(:last-child) {
    margin-bottom: 1.25rem;
  }
`

export const Algos = styled(Icon)`
  position: relative;
  top: -0.125rem;
  margin-left: 0.125rem;
`

// this is imported by components/main-layout
export const ChartOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.25);
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
  transition: opacity 150ms ease-in-out;
  z-index: 998;
`

import PropTypes from 'prop-types'
import SvgImage from 'components/SvgImage'
import useTranslation from 'next-translate/useTranslation'

function InfoFlyover(props) {
  const { assetInfo } = props
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
    <InfoPopup isActive={!!assetInfo} isLarge={assetInfo?.hasBeenOrdered}>
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
  assetInfo: PropTypes.object
}

export default InfoFlyover
