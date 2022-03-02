import { BodyCopy, BodyCopyTiny, HeaderSm } from 'components/Typography'
import { lighten, rgba } from 'polished'

import Icon from 'components/Icon'
import PropTypes from 'prop-types'
import SvgImage from 'components/SvgImage'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'

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

const InfoList = styled.dl`
  display: flex;
  flex-wrap: wrap;
`

const InfoItem = styled.div`
  flex: ${({ halfWidth }) => (halfWidth ? '50%' : '100%')};

  &:not(:last-child) {
    margin-bottom: 1.25rem;
  }
`

const Algos = styled(Icon)`
  position: relative;
  margin-left: 0.225rem;
  fill: ${({ theme }) => theme.palette.gray['500']};
`

export function SearchFlyover(props) {
  const { row } = props
  const { t } = useTranslation('assets')

  const renderName = () => {
    if (row.verified) {
      return (
        <>
          {`${row.fullName} `}
          <span>
            {`(${row.name}) `}
            <SvgImage use="verified" w={1.5} h={1.5} />
          </span>
        </>
      )
    }
    return <>{`${row.fullName} (${row.name})`}</>
  }

  const renderChange = () => {
    const color = row.change === '--' ? 'gray.400' : row.change < 0 ? 'red.500' : 'green.500'
    const display = row.change === '--' ? '--' : `${row.change}%`

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
    <InfoPopup className="bg-gray-800 p-4 ml-4 rounded" isLarge={row?.hasBeenOrdered}>
      {row && (
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
                {row.id}
              </BodyCopy>
            </InfoItem>

            {row.price?.length > 0 && (
              <>
                <InfoItem halfWidth>
                  <BodyCopyTiny as="dt" color="gray.500" className="flex items-center">
                    {t('price')} <Algos use="algoLogo" size={0.625} />
                  </BodyCopyTiny>
                  <BodyCopy as="dd" fontFamily="'Roboto Mono', monospace" fontSize="1.125rem">
                    {row.price}
                  </BodyCopy>
                </InfoItem>
                {renderChange()}
              </>
            )}

            {row.hasBeenOrdered && (
              <>
                <InfoItem halfWidth>
                  <BodyCopyTiny as="dt" color="gray.500">
                    {t('liquidity')} (Algos)
                  </BodyCopyTiny>
                  <BodyCopy as="dd" fontFamily="'Roboto Mono', monospace" fontSize="1.125rem">
                    {row.liquidityAlgo}
                  </BodyCopy>
                </InfoItem>
                <InfoItem halfWidth>
                  <BodyCopyTiny as="dt" color="gray.500">
                    {`${t('liquidity')} (${row.name})`}
                  </BodyCopyTiny>
                  <BodyCopy as="dd" fontFamily="'Roboto Mono', monospace" fontSize="1.125rem">
                    {row.liquidityAsa}
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

SearchFlyover.propTypes = {
  row: PropTypes.object
}

export default SearchFlyover
