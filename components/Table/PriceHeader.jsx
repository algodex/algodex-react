import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'
import Icon from 'components/Icon'
import { BodyCopyTiny } from 'components/Typography'

export const PriceHeaderText = styled(BodyCopyTiny)`
  display: flex;
  align-items: center;
  margin: 0;
  color: ${({ theme }) => theme.colors.gray['500']};

  svg {
    margin-left: 0.25rem;
  }
`

export const TablePriceHeader = () => {
  const { t } = useTranslation('common')
  return (
    <PriceHeaderText>
      {t('price')}
      <Icon use="algoLogo" size={0.625} />
    </PriceHeaderText>
  )
}

export default TablePriceHeader
