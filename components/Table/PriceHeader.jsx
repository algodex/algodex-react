// import { Typography } from 'components/Typography'
import Typography from '@mui/material/Typography'
import Icon from 'components/Icon'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'

export const PriceHeaderText = styled(Typography)`
  display: flex;
  align-items: center;
  margin: 0;
  color: ${({ theme }) => theme.palette.gray['500']};

  svg {
    margin-left: 0.25rem;
  }
`

export const TablePriceHeader = () => {
  const { t } = useTranslation('common')
  return (
    <PriceHeaderText data-testid="header-item">
      {t('price')}
      <Icon color="gray" fillGradient={500} use="algoLogo" size={0.625} />
    </PriceHeaderText>
  )
}

export default TablePriceHeader
