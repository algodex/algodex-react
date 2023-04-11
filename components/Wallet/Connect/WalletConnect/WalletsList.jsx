/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Box, Button, Stack, Typography } from '@mui/material'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Image from 'next/image'
import PropTypes from 'prop-types'
import WalletBalance from './WalletBalance'
import convertFromBaseUnits from '@algodex/algodex-sdk/lib/utils/units/fromBaseUnits'
import styled from '@emotion/styled'
import toast from 'react-hot-toast'
import { truncatedWalletAddress } from '@/components/helpers'
import { useCallback } from 'react'

const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.background.dark};
  padding: 0rem 0 1rem;
`

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

const WalletRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.375rem 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 0.125rem;
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  transition: color 50ms ease-out;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.gray['000'] : theme.palette.gray['500']};

  span,
  p {
    color: inherit;
    line-height: 1.25;
  }

  span {
    display: inline-flex;
    align-items: center;

    svg {
      margin-right: 0.375rem;
    }
  }

  &:hover,
  &:focus {
    color: ${({ theme, isActive }) =>
      isActive ? theme.palette.gray['000'] : theme.palette.gray['300']};
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(121, 255, 156, 0.5);
  }

  ${Balance} {
    span {
      > span {
        opacity: ${({ isActive }) => (isActive ? 0.5 : 0.68)};
      }
    }
  }
`

export const WalletsList = ({
  addresses,
  isTabbable,
  isWalletActive,
  handleWalletClick,
  handleKeyDown,
  getWalletLogo,
  walletDisconnectMap
}) => {
  const copyAddress = useCallback((address) => {
    navigator.clipboard.writeText(address).then(
      () => {
        toast.success('Copied wallet address to clipboard!')
      },
      () => {
        toast.error('Failed to copy wallet address to clipboard')
      }
    )
  }, [])

  return addresses.map((wallet) => (
    <Container key={wallet.address}>
      <WalletRow
        key={wallet.address}
        tabIndex={isTabbable(wallet.address)}
        role="button"
        isActive={isWalletActive(wallet.address)}
        onClick={() => handleWalletClick(wallet)}
        onKeyDown={(e) => handleKeyDown(e, wallet.address)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={getWalletLogo(wallet)}
            alt="Algorand Wallet Client Image"
            style={{ borderRadius: '50%' }}
            width={18}
            height={18}
          />
          &nbsp;
          <Typography variant="body_small" fontWeight="bold" title={wallet.address}>
            {truncatedWalletAddress(wallet.address, 4)}
          </Typography>
          &nbsp;
          <ContentCopyIcon
            onClick={() => copyAddress(wallet.address)}
            fontSize="small"
            sx={{ fontSize: 16 }}
          />
        </Box>
        <WalletBalance balance={convertFromBaseUnits(wallet.amount)} />
      </WalletRow>
      <Stack direction="row" justifyContent="center" alignItems="center">
        {/* <Button
          onClick={() => {
            walletDisconnectMap[wallet.type](wallet)
          }}
          // className="font-semibold hover:font-bold text-white border-white hover:border-white"
          variant="disconnect-wallet"
          size="small"
        >
          Disconnect {truncatedWalletAddress(wallet.address, 4)}
        </Button> */}
      </Stack>
    </Container>
  ))
}

WalletsList.propTypes = {
  addresses: PropTypes.array,
  isTabbable: PropTypes.func,
  isWalletActive: PropTypes.func,
  handleWalletClick: PropTypes.func,
  handleKeyDown: PropTypes.func,
  getWalletLogo: PropTypes.func,
  walletDisconnectMap: PropTypes.object
}

export default WalletsList
