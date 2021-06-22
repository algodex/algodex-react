import styled from 'styled-components'
import Icon from 'components/icon'
import { BodyCopyTiny } from 'components/type'

const Text = styled(BodyCopyTiny)`
  display: flex;
  align-items: center;
  margin: 0;
  color: ${({ theme }) => theme.colors.gray['500']};

  svg {
    margin-left: 0.25rem;
  }
`

export default function PriceHeader() {
  return (
    <Text>
      Price
      <Icon use="algoLogo" size={0.625} />
    </Text>
  )
}
