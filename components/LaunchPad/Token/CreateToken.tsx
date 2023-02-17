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

import { useState, useContext } from 'react'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider'
import { useAlgodex } from '@/hooks'
import { CreatorAddress } from '../CreatorAddress'
import { Note } from '../note'

//MUI Components
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'

// Custom Styled Components
import OutlinedInput from '@/components/Input/OutlinedInput'
import { styles } from '../styles.css'

import createAsset from '../createAsset'
import toast from 'react-hot-toast'

type createTokenTypes = {
  tokenName: string
  unitName: string
  totalSupply: string
  decimals: string
  assetURL: string
  assetMetadata: string
  showClawbackAddr: boolean
  clawbackAddr: string
  showReserveAddr: boolean
  reserveAddr: string
  showManagerAddr: boolean
  managerAddr: string
  showFreezeAddr: boolean
  freezeAddr: string
}

const initialValues: createTokenTypes = {
  tokenName: '',
  unitName: '',
  totalSupply: '',
  decimals: '',
  assetURL: '',
  assetMetadata: '',
  showClawbackAddr: false,
  clawbackAddr: '',
  showReserveAddr: false,
  reserveAddr: '',
  showManagerAddr: false,
  managerAddr: '',
  showFreezeAddr: false,
  freezeAddr: ''
}

export const CreateToken = () => {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState(initialValues)
  const {
    tokenName,
    unitName,
    totalSupply,
    decimals,
    assetURL,
    assetMetadata,
    showClawbackAddr,
    clawbackAddr,
    showReserveAddr,
    reserveAddr,
    showManagerAddr,
    managerAddr,
    showFreezeAddr,
    freezeAddr
  } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleCheck = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    let lastToastId
    const notifier = (msg) => {
      if (lastToastId) {
        toast.dismiss(lastToastId)
      }
      if (msg === null) return
      lastToastId = toast.loading(msg, { duration: 30 * 60 * 1000 }) // Awaiting signature, or awaiting confirmations
    }
    // toast.loading('AWAITING SIGNATURE', { duration: 30 * 60 * 1000 })
    createAsset(formData, algodex.algod, activeWallet, notifier).then(
      (asset) => (lastToastId = toast.success('sucess'))
    )

    // toast.success('success')
  }

  const { activeWallet } = useContext(WalletReducerContext)
  const { algodex } = useAlgodex()

  // const handleAsset = () => {
  //   setLoading(true)
  //   setLoading(false)
  // }

  return (
    <>
      <Typography variant="subtitle1" sx={styles.title}>
        Create an Algorand Standard Asset (ASA)
      </Typography>
      <Divider sx={styles.divider} />
      <Box
        sx={{
          display: 'flex',
          columnGap: '20px',
          marginBlock: '20px 10px',
          alignItems: 'center'
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 600, color: 'white', lineHeight: 1.2 }}>
          Creator Address:
        </Typography>
        <CreatorAddress address={activeWallet?.address} />
      </Box>
      <Typography variant="body1" sx={{ ...styles.body1, marginBottom: '24px' }}>
        Creator Address defaults to the wallet that’s currently connected. If you want to create an
        ASA with a different wallet, you must disconnect this wallet and connect the correct one in
        the header.
      </Typography>

      <form onSubmit={onSubmit}>
        <Box className="mb-6">
          <Typography variant="subtitle2" sx={{ ...styles.subtitle2, marginBottom: '13px' }}>
            Token Setup
          </Typography>
          <Box className="mb-4 px-4">
            <OutlinedInput
              type="text"
              placeholder="Token Name"
              name="tokenName"
              value={tokenName}
              onChange={(e) => onChange(e)}
              sx={styles.input}
            />
          </Box>
          <Box className="mb-4 px-4">
            <OutlinedInput
              type="text"
              placeholder="Unit Name (ex. USDC)"
              name="unitName"
              value={unitName}
              onChange={(e) => onChange(e)}
              sx={styles.input}
            />
          </Box>
          <Box className="px-4 md:flex">
            <Box className="mb-4 md:pr-3 w-full md:w-1/2">
              <OutlinedInput
                type="text"
                placeholder="Total Supply"
                name="totalSupply"
                value={totalSupply}
                onChange={(e) => onChange(e)}
                sx={styles.input}
              />
            </Box>
            <Box className="mb-4 w-full md:w-1/2">
              <OutlinedInput
                type="text"
                placeholder="Decimals (0-10)"
                name="decimals"
                value={decimals}
                onChange={(e) => onChange(e)}
                sx={styles.input}
              />
            </Box>
          </Box>
        </Box>

        <Box className="mb-6">
          <Typography variant="subtitle2" sx={{ ...styles.subtitle2, mb: '13px' }}>
            Additional Optional Settings
          </Typography>
          <Box className="mb-4 px-4">
            <OutlinedInput
              type="text"
              placeholder="Asset URL Property"
              name="assetURL"
              value={assetURL}
              onChange={(e) => onChange(e)}
              sx={styles.input}
            />
            <Typography
              className="ml-4 mt-1"
              sx={{ fontSize: '11px', color: 'gray.500', fontStyle: 'italic' }}
            >
              Optional
            </Typography>
          </Box>
          <Box className="mb-4 px-4">
            <OutlinedInput
              type="text"
              placeholder="Asset Metadata Hash"
              name="assetMetadata"
              value={assetMetadata}
              onChange={(e) => onChange(e)}
              sx={styles.input}
            />
            <Typography
              className="ml-4 mt-1"
              sx={{ fontSize: '11px', color: 'gray.500', fontStyle: 'italic' }}
            >
              Optional
            </Typography>
          </Box>
        </Box>

        <Accordion sx={styles.accordionStyles}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="subtitle2" sx={styles.subtitle2}>
              Advanced Options
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: 0 }}>
            <Box className="mb-4 px-4">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}
              >
                <Typography
                  sx={{ fontWeight: 500, fontSize: '16px', color: 'white', fontStyle: 'italic' }}
                >
                  Clawback Address?
                  <InfoOutlinedIcon sx={{ color: 'gray.500', fontSize: '16px', ml: '5px' }} />
                </Typography>
                <Switch
                  inputProps={{ 'aria-label': 'Switch demo' }}
                  color="success"
                  name="showClawbackAddr"
                  value={showClawbackAddr}
                  onChange={(e) => {
                    const value = e.target.checked
                    onChange({
                      target: {
                        value,
                        name: 'showClawbackAddr'
                      }
                    })
                  }}
                />
              </Box>
              {showClawbackAddr && (
                <OutlinedInput
                  type="text"
                  placeholder="Enter Clawback Address"
                  name="clawbackAddr"
                  value={clawbackAddr}
                  onChange={(e) => onChange(e)}
                  sx={styles.input}
                />
              )}
            </Box>
            <Box className="mb-4 px-4">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}
              >
                <Typography
                  sx={{ fontWeight: 500, fontSize: '16px', color: 'white', fontStyle: 'italic' }}
                >
                  Reserve Address?
                  <InfoOutlinedIcon sx={{ color: 'gray.500', fontSize: '16px', ml: '5px' }} />
                </Typography>
                <Switch
                  inputProps={{ 'aria-label': 'Switch demo' }}
                  color="success"
                  name="showReserveAddr"
                  value={showReserveAddr}
                  onChange={(e) => handleCheck(e)}
                />
              </Box>
              {showReserveAddr && (
                <OutlinedInput
                  type="text"
                  placeholder="Enter Reserve Address"
                  name="reserveAddr"
                  value={reserveAddr}
                  onChange={(e) => onChange(e)}
                  sx={styles.input}
                />
              )}
            </Box>
            <Box className="mb-4 px-4">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}
              >
                <Typography
                  sx={{ fontWeight: 500, fontSize: '16px', color: 'white', fontStyle: 'italic' }}
                >
                  Manager Address?
                  <InfoOutlinedIcon sx={{ color: 'gray.500', fontSize: '16px', ml: '5px' }} />
                </Typography>
                <Switch
                  inputProps={{ 'aria-label': 'Switch demo' }}
                  color="success"
                  name="showManagerAddr"
                  value={showManagerAddr}
                  onChange={(e) => handleCheck(e)}
                />
              </Box>
              {showManagerAddr && (
                <OutlinedInput
                  type="text"
                  placeholder="Enter Manager Address"
                  name="managerAddr"
                  value={managerAddr}
                  onChange={(e) => onChange(e)}
                  sx={styles.input}
                />
              )}
            </Box>
            <Box className="mb-4 px-4">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}
              >
                <Typography
                  sx={{ fontWeight: 500, fontSize: '16px', color: 'white', fontStyle: 'italic' }}
                >
                  Freeze Address?
                  <InfoOutlinedIcon sx={{ color: 'gray.500', fontSize: '16px', ml: '5px' }} />
                </Typography>
                <Switch
                  inputProps={{ 'aria-label': 'Switch demo' }}
                  color="success"
                  name="showFreezeAddr"
                  value={showFreezeAddr}
                  onChange={(e) => handleCheck(e)}
                />
              </Box>
              {showFreezeAddr && (
                <OutlinedInput
                  type="text"
                  placeholder="Enter Freeze Address"
                  name="freezeAddr"
                  value={freezeAddr}
                  onChange={(e) => onChange(e)}
                  sx={styles.input}
                />
              )}
            </Box>
          </AccordionDetails>
        </Accordion>

        <Note
          className="my-6"
          content="It takes approximately 10 seconds to create your ASA after confirming. The Tokens will
        automatically transfer to the creator wallet or reserve wallet (if applicable) after the
        creation is successful. You are able to create a sale of your token on Algodex or use
        Mailbox to distribute."
        />
        <Box className="text-center">
          <Button type="submit" disabled={loading} sx={styles.submitBtn}>
            CREATE TOKEN
            {/* {loading && (
            <span className="ml-2">
              <Spinner size={1} color={'white'} />
            </span>
          )} */}
          </Button>
        </Box>
      </form>
    </>
  )
}
