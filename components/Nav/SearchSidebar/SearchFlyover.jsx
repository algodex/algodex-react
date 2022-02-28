import Icon from '@/components/Icon'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'
import Typography from '@mui/material/Typography'
import SvgImage from '@/components/SvgImage'

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
  top: -0.125rem;
  margin-left: 0.125rem;
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
        <Typography variant="bodyCopyTiny" component="dt" color="gray.500">
          {t('24-hr-change')}
        </Typography>
        <Typography variant="bodyCopyMono" component="dd" color={color}>
          {display}
        </Typography>
      </InfoItem>
    )
  }

  return (
    <div className="bg-gray-800 p-4 ml-4 rounded w-96" isLarge={row?.hasBeenOrdered}>
      {row && (
        <>
          <HeaderContainer>
            <Typography variant="headerSm" component="h3" color="gray.100">
              {renderName()}
            </Typography>
          </HeaderContainer>
          <InfoList>
            <InfoItem>
              <Typography variant="bodyCopyTiny" component="dt" color="gray.500">
                ASA ID
              </Typography>
              <Typography variant="bodyCopyMono" component="dd">
                {row.id}
              </Typography>
            </InfoItem>

            {row.price?.length > 0 && (
              <>
                <InfoItem halfWidth>
                  <Typography variant="bodyCopyTiny" component="dt" color="gray.500">
                    {t('price')} <Algos use="algoLogo" size={0.625} />
                  </Typography>
                  <Typography variant="bodyCopyMono" component="dd">
                    {row.price}
                  </Typography>
                </InfoItem>
                {renderChange()}
              </>
            )}

            {row.hasBeenOrdered && (
              <>
                <InfoItem halfWidth>
                  <Typography variant="bodyCopyTiny" component="dt" color="gray.500">
                    {t('liquidity')} (Algos)
                  </Typography>
                  <Typography variant="bodyCopyMono" component="dd">
                    {row.liquidityAlgo}
                  </Typography>
                </InfoItem>
                <InfoItem halfWidth>
                  <Typography variant="bodyCopyTiny" component="dt" color="gray.500">
                    {`${t('liquidity')} (${row.name})`}
                  </Typography>
                  <Typography variant="bodyCopyMono" component="dd">
                    {row.liquidityAsa}
                  </Typography>
                </InfoItem>
              </>
            )}
          </InfoList>
        </>
      )}
    </div>
  )
}

SearchFlyover.propTypes = {
  row: PropTypes.object
}

export default SearchFlyover
