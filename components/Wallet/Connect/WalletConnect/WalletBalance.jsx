import { Box, Typography } from '@mui/material'

import Icon from 'components/Icon/Icon'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Balance = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  text-align: right;
  font-weight: 500;
  line-height: 1.5;

  svg {
    opacity: 0.5;
  }

  > span {
    margin-left: 0.375rem;

    > span {
      opacity: 0.5;
    }
  }
`
export const WalletBalance = ({ balance }) => {
  const split = balance.toFixed(6).split('.')

  return (
    <Balance>
      <Box mr={0.5} mt={0.4}>
        <Icon color="gray" fillGradient="000" use="algoLogo" size={0.625} />
      </Box>
      <Box>
        <Typography variant="body_small" fontWeight="bold">{`${split[0]}.`}</Typography>
        <Typography variant="body_small" fontWeight="bold">
          {split[1]}
        </Typography>
      </Box>
    </Balance>
  )
}

WalletBalance.propTypes = {
  balance: PropTypes.number
}

WalletBalance.defaultProps = {
  balance: 0
}

export default WalletBalance
