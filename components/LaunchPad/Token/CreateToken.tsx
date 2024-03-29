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

import { useState, useContext, ChangeEvent, useMemo } from 'react'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider'
import { useAlgodex } from '@/hooks'
import { CreatorAddress } from '../CreatorAddress'
import { Note, ServiceFeeNote } from '../note'

//MUI Components
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import toast from 'react-hot-toast'
import useTranslation from 'next-translate/useTranslation'
import CircularProgress from '@mui/material/CircularProgress'

// Custom Components
import OutlinedInput from '@/components/Input/OutlinedInput'
import { styles } from '../styles.css'
import { ErrorMessage } from '../ErrorMessage'
import { isValidAddr } from '@/components/helpers'
import { NumberFormatCustom } from '@/components/Wallet/PlaceOrder/Form/TradeInputs'
import { Tip } from '../Tip'

import createAsset, { hasAlgxBalance } from '../createAsset'
import * as InputTips from '../InputTips.json'
import { useMaxSpendableAlgoNew } from '@/hooks/useMaxSpendableAlgo'

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
  const { activeWallet } = useContext(WalletReducerContext)
  const { t } = useTranslation('place-order')
  const { algodex } = useAlgodex()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})
  const [formData, setFormData] = useState(initialValues)
  const maxSpendableAlgo = useMaxSpendableAlgoNew(activeWallet)
  const balance = useMemo(() => {
    return hasAlgxBalance(activeWallet)
  }, [activeWallet])

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

  const resetError = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError((prev) => ({ ...prev, [e.target.name]: '' }))
    setError((prev) => ({ ...prev, all: '' }))
  }
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    resetError(e)
  }

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked })
    resetError(e)
  }

  const isInteger = (value: number) => {
    return value % 1 == 0 ? true : false
  }

  const isValidURL = (url: string) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i'
    )

    return pattern.test(url)
  }

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    let _error = false
    if (
      !tokenName ||
      !unitName ||
      !totalSupply ||
      !decimals ||
      (showClawbackAddr && !clawbackAddr) ||
      (showReserveAddr && !reserveAddr) ||
      (showFreezeAddr && !freezeAddr) ||
      (showManagerAddr && !managerAddr)
    ) {
      setError((prev) => ({ ...prev, all: 'Please enter all the required field' }))
      _error = true
    }

    //Ensure it is a valid whole number
    if (isNaN(Number(totalSupply)) || !isInteger(Number(totalSupply)) || Number(totalSupply) < 1) {
      setError((prev) => ({ ...prev, totalSupply: 'Enter a valid whole number' }))

      _error = true
    }

    //Ensure it is a valid whole number and between 1 - 10
    if (
      isNaN(Number(decimals)) ||
      !isInteger(Number(decimals)) ||
      Number(decimals) < 0 ||
      Number(decimals) > 10
    ) {
      setError((prev) => ({ ...prev, decimals: 'Enter whole number between 0 and 10' }))

      _error = true
    }

    //Token name should not exceed 32 chars
    if (tokenName.trim().split('').length > 32) {
      setError((prev) => ({ ...prev, tokenName: "Can't exceed 32 characters" }))
      _error = true
    }

    //Unit name should not exceed 8 chars
    if (unitName.trim().split('').length > 8) {
      setError((prev) => ({ ...prev, unitName: "Can't exceed 8 characters" }))
      _error = true
    }

    //Check for string with no spaces
    if (/\s/g.test(tokenName.trim())) {
      setError((prev) => ({ ...prev, tokenName: 'Spaces not allowed between letters!' }))
      _error = true
    }
    if (/\s/g.test(unitName.trim())) {
      setError((prev) => ({ ...prev, unitName: 'Spaces not allowed between letters!' }))
      _error = true
    }

    //Check for valid url string
    if (assetURL && !isValidURL(assetURL.trim())) {
      setError((prev) => ({ ...prev, assetURL: 'Invalid URL string!' }))
      _error = true
    }

    //Confirm its a valid algorand address
    if (showClawbackAddr && clawbackAddr && !(await isValidAddr(clawbackAddr.trim()))) {
      setError((prev) => ({ ...prev, clawbackAddr: 'Invalid Algorand address!' }))
      _error = true
    }

    if (showReserveAddr && reserveAddr && !(await isValidAddr(reserveAddr.trim()))) {
      setError((prev) => ({ ...prev, reserveAddr: 'Invalid Algorand address!' }))
      _error = true
    }

    if (showFreezeAddr && freezeAddr && !(await isValidAddr(freezeAddr.trim()))) {
      setError((prev) => ({ ...prev, freezeAddr: 'Invalid Algorand address!' }))
      _error = true
    }

    if (showManagerAddr && managerAddr && !(await isValidAddr(managerAddr.trim()))) {
      setError((prev) => ({ ...prev, managerAddr: 'Invalid Algorand address!' }))
      _error = true
    }

    if (!_error) {
      setError(null)
      createToken({
        ...formData,
        freezeAddr: showFreezeAddr ? freezeAddr : '',
        clawbackAddr: showClawbackAddr ? clawbackAddr : '',
        managerAddr: showManagerAddr ? managerAddr : '',
        reserveAddr: showReserveAddr ? reserveAddr : ''
      })
    }
  }

  const createToken = (payload) => {
    if (maxSpendableAlgo === 0) {
      toast.error(
        'Insufficient Algo Balance: See algorand documentation for minimum balance requirements'
      )
      return
    }
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
    createAsset(payload, algodex.algod, activeWallet, notifier)
      .then(() => {
        setLoading(false)
        lastToastId = toast.success(t('asset-success'))
        setFormData(initialValues)
      })
      .catch((err) => {
        setLoading(false)

        toast.error(`${t('error-placing-order')}: ${err.message}`, {
          id: lastToastId,
          duration: 5000
        })
      })
  }

  return (
    <>
      <Typography variant="subtitle1" sx={styles.title}>
        Create an Algorand Standard Asset (ASA)
      </Typography>
      <Divider sx={styles.divider} />
      <CreatorAddress activeWallet={activeWallet ? activeWallet : undefined} />
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
              required
              value={tokenName}
              onChange={(e) => onChange(e)}
              sx={styles.input}
            />
            <ErrorMessage error={error} name="tokenName" />
          </Box>
          <Box className="mb-4 px-4">
            <OutlinedInput
              type="text"
              placeholder="Unit Name (ex. USDC)"
              name="unitName"
              required
              value={unitName}
              onChange={(e) => onChange(e)}
              sx={styles.input}
            />
            <ErrorMessage error={error} name="unitName" />
          </Box>
          <Box className="px-4 md:flex">
            <Box className="mb-4 md:pr-3 w-full md:w-1/2">
              <OutlinedInput
                inputComponent={NumberFormatCustom}
                placeholder="Total Supply"
                name="totalSupply"
                required
                value={totalSupply}
                onChange={(e) => onChange(e)}
                sx={styles.input}
              />
              <ErrorMessage error={error} name="totalSupply" />
            </Box>
            <Box className="mb-4 w-full md:w-1/2">
              <OutlinedInput
                inputComponent={NumberFormatCustom}
                placeholder="Decimals (0-10)"
                name="decimals"
                required
                value={decimals}
                onChange={(e) => onChange(e)}
                sx={styles.input}
              />
              <ErrorMessage error={error} name="decimals" />
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
            <ErrorMessage error={error} name="assetURL" />
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
            <ErrorMessage error={error} name="assetMetadata" />
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
                  <Tip tip={InputTips.clawbackAddr} />
                </Typography>
                <Switch
                  inputProps={{ 'aria-label': 'Switch demo' }}
                  color="success"
                  name="showClawbackAddr"
                  value={showClawbackAddr}
                  onChange={(e) => handleCheck(e)}
                />
              </Box>
              {showClawbackAddr && (
                <>
                  <OutlinedInput
                    type="text"
                    placeholder="Enter Clawback Address"
                    name="clawbackAddr"
                    value={clawbackAddr}
                    onChange={(e) => onChange(e)}
                    sx={styles.input}
                  />
                  <ErrorMessage error={error} name="clawbackAddr" />
                </>
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
                  <Tip tip={InputTips.reserveAddr} />
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
                <>
                  <OutlinedInput
                    type="text"
                    placeholder="Enter Reserve Address"
                    name="reserveAddr"
                    value={reserveAddr}
                    onChange={(e) => onChange(e)}
                    sx={styles.input}
                  />
                  <ErrorMessage error={error} name="reserveAddr" />
                </>
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
                  <Tip tip={InputTips.managerAddr} />
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
                <>
                  <OutlinedInput
                    type="text"
                    placeholder="Enter Manager Address"
                    name="managerAddr"
                    value={managerAddr}
                    onChange={(e) => onChange(e)}
                    sx={styles.input}
                  />
                  <ErrorMessage error={error} name="managerAddr" />
                </>
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
                  <Tip tip={InputTips.freezeAddr} />
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
                <>
                  <OutlinedInput
                    type="text"
                    placeholder="Enter Freeze Address"
                    name="freezeAddr"
                    value={freezeAddr}
                    onChange={(e) => onChange(e)}
                    sx={styles.input}
                  />
                  <ErrorMessage error={error} name="freezeAddr" />
                </>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
        <ErrorMessage error={error} name="all" />

        <Note
          className="my-6"
          content="It takes approximately 10 seconds to create your ASA after confirming. The Tokens will
        automatically transfer to the creator wallet or reserve wallet (if applicable) after the
        creation is successful. You are able to create a sale of your token on Algodex or use
        Mailbox to distribute."
        />

        <ServiceFeeNote fee={balance ? 0 : 0} />
        <Box className="text-center">
          <Button type="submit" disabled={loading || !activeWallet?.address} sx={styles.submitBtn}>
            CREATE TOKEN
            {loading && (
              <span className="ml-2">
                <CircularProgress size={13} color="inherit" />
              </span>
            )}
          </Button>
        </Box>
      </form>
    </>
  )
}
