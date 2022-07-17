import { BodyCopyTiny } from 'components/Typography'
import Icon from 'components/Icon'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'
import PropTypes from 'prop-types'

export const PriceHeaderText = styled(BodyCopyTiny)`
  display: flex;
  align-items: center;
  ${(props) => (props.textAlign === 'right' ? 'margin-left: auto' : 'margin: 0')};
  color: ${({ theme }) => theme.palette.gray['500']};
  svg {
    margin-left: 0.25rem;
  }
`

export const TablePriceHeader = ({ title, textAlign }) => {
  const { t } = useTranslation('common')
  return (
    <PriceHeaderText data-testid="header-item" textAlign={textAlign}>
      {t(title)}
      <Icon color="gray" fillGradient={500} use="algoLogo" size={0.625} />
    </PriceHeaderText>
  )
}

TablePriceHeader.propTypes = {
  title: PropTypes.string.isRequired,
  textAlign: PropTypes.string.isRequired
}

export default TablePriceHeader
