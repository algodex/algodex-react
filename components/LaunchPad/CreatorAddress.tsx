import React from 'react'

//MUI Components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// Custom coponent
import { CopyIcon } from './copyIcon'
import { truncatedWalletAddress } from 'components/helpers'
import useWallets from '@/hooks/useWallets'

type activeWalletTypes = {
  address: string
  name: string
  type: string
  connector: {
    bridge: {
      options: {
        waitForReply: boolean
        timeout: number
      }
      bridge: {
        channelName: string
        _requests: object
        _nextId: number
        _defaultTimeout: number
      }
    }
    timeout: number
    url: string
    currentConnectPopup: unknown
    currentSigntxPopup: unknown
    currentSignLogicSigPopup: unknown
    options: {
      waitForReply: boolean
      timeout: number
    }
    disableLedgerNano: boolean
    connected: boolean
  }
  amount: number
  'amount-without-pending-rewards': number
  assets: Array<{
    amount: 44
    'asset-id': number
    deleted: boolean
    'is-frozen': boolean
    'opted-in-at-round': number
  }>
  'created-assets': Array<{
    'created-at-round': number
    deleted: boolean
    index: number
    params: {
      clawback: string
      creator: string
      decimals: number
      'default-frozen': boolean
      freeze: string
      manager: string
      name: string
      'name-b64': string
      total: number
      'unit-name': string
      'unit-name-b64': string
    }
  }>
  'created-at-round': number
  deleted: false
  'pending-rewards': number
  'reward-base': number
  rewards: number
  round: number
  'sig-type': string
  status: string
  'total-apps-opted-in': number
  'total-assets-opted-in': number
  'total-box-bytes': number
  'total-boxes': number
  'total-created-apps': number
  'total-created-assets': number
}

export const CreatorAddress = ({ activeWallet }: { activeWallet: activeWalletTypes }) => {
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
