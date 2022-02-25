import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'
import Icon from 'components/Icon'
import Typography from '@mui/material/Typography'

export const PriceHeader = styled.div`
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
    <PriceHeader data-testid="header-item">
      {t('price')}
      <Typography variant="bodyCopyTiny">{t('price')}</Typography>
      <Icon use="algoLogo" size={0.625} />
    </PriceHeader>
  )
}

export default TablePriceHeader
