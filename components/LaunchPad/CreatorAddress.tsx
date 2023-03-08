import React from 'react'

//MUI Components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// Custom coponent
import { CopyIcon } from './copyIcon'
import { truncatedWalletAddress } from 'components/helpers'
import useWallets from '@/hooks/useWallets'
import { activeWalletTypes } from '../types'

export const CreatorAddress = ({
  activeWallet,
  resetForm
}: {
  activeWallet: activeWalletTypes
  resetForm?: () => void
}) => {
  const { peraDisconnect, myAlgoDisconnect } = useWallets(null)
  const walletDisconnectMap = {
    'my-algo-wallet': myAlgoDisconnect,
    'wallet-connect': peraDisconnect
  }

  const isConnected = typeof activeWallet !== 'undefined'
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: 'solid',
          borderColor: 'white',
          color: 'white',
          columnGap: '5px',
          borderRadius: '3px',
          padding: '5px'
        }}
      >
        {isConnected ? (
          <>
            <Typography
              sx={{
                display: 'block',
                paddingBlock: '0',
                fontSize: '15px',
                fontWeight: 500
              }}
            >
              {truncatedWalletAddress(activeWallet.address, 4)}
            </Typography>
            <CopyIcon content={activeWallet.address} />
          </>
        ) : (
          <Typography
            sx={{
              display: 'block',
              paddingBlock: '0',
              fontSize: '15px',
              fontWeight: 500
            }}
          >
            Connect creator wallet above
          </Typography>
        )}
      </Box>
      {isConnected && (
        <Button
          type="button"
          onClick={() => {
            walletDisconnectMap[activeWallet.type](activeWallet)
            resetForm && resetForm()
          }}
          sx={{
            color: 'white',
            backgroundColor: 'gray.150',
            px: '10px',
            py: '1px',
            fontWeight: 500,
            fontSize: '12px',
            border: '2px solid',
            transition: 'all ease .3s',
            '&:hover': {
              color: 'white'
            }
          }}
        >
          DISCONNECT
        </Button>
      )}
    </>
  )
}
