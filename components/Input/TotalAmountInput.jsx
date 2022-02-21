import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { UsdPrice } from '../Wallet/PriceConversion/UsdPrice'

const Input = styled.input`
  flex: 1 1 auto;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.gray['900']};
  border: 2px solid ${({ theme }) => theme.palette.gray['700']};
  border-radius: 3px;
  padding: 0.5rem 0.75rem;
  padding-right: 4.5rem;
  color: ${({ theme }) => theme.palette.gray['000']};
  text-align: right;
  font-size: 1rem;
  line-height: 1;
  height: '3rem;
  padding-bottom:'1.2rem';

  &:focus {
    outline: 0;
    border-color: ${({ theme }) => theme.palette.gray['400']};
  }

  &:disabled {
    outline: 0;
    border-color: transparent;
    background-color: ${({ theme }) => theme.palette.gray['700']};
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.gray['600']};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;

  &[read-only] {
    pointer-events: none;
  }
`

const Container = styled.div`
  flex: 1 1 auto;
  display: flex;
  position: relative;
  align-items: center;
  // margin-bottom: 1rem;
`

const InputLabel = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.palette.gray['500']};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
`

const Label = styled(InputLabel)`
  left: 0.875rem;
`

const Asset = styled(InputLabel)`
  right: 1.25rem;
  width: 2.75rem;
  top: '39%';
  font-family: ${({ isCondensed }) => (isCondensed ? `'Open Sans Condensed'` : 'inherit')};
`
const PriceContainer = styled.div`
  position: absolute;
  display: flex;
  right: 2.2rem;
  top: 1.7rem;
  color: ${({ theme }) => theme.palette.gray['500']};
  font-size: 0.875rem;
  font-weight: 600;
  p {
    margin-left: 0.5rem;
  }
`

/**
 *
 * @param {object} props Component Properties
 * @param {string} props.label Input Label
 * @param {string} props.currency Display Currency
 * @returns {JSX.Element}
 * @constructor
 */
export function TotalAmountInput({ label, currency, value, ...props }) {
  const condenseAssetName = currency?.length > 5

  return (
    <Container>
      <Input placeholder="0.00" {...props} />
      <Label>{label}</Label>
      <Asset isCondensed={condenseAssetName}>{currency}</Asset>
      <PriceContainer>
        <UsdPrice priceToConvert={value} fontSize={'0.875rem'} />
        <p>USD</p>
      </PriceContainer>
    </Container>
  )
}

TotalAmountInput.propTypes = {
  label: PropTypes.string,
  currency: PropTypes.string,
  isCondensed: PropTypes.bool,
  value: PropTypes.number
}

export default TotalAmountInput
