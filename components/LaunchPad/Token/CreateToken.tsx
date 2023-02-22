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

import { useState, useContext, useEffect } from 'react'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider'
import { useAlgodex } from '@/hooks'
import { CreatorAddress } from '../CreatorAddress'
import { Note } from '../note'

// Wallet related imports
import useMyAlgoConnector from '@/hooks/useMyAlgoConnector'
import useWallets from '@/hooks/useWallets'
import { PeraWalletConnect } from '@perawallet/connect'
import { peraSigner } from '@/hooks/usePeraConnection'

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
import { ErrorMessage } from '../ErrorMessage'
import { algodClient } from '@/components/helpers'

import createAsset from '../createAsset'
import toast from 'react-hot-toast'

const peraWalletRehydate = new PeraWalletConnect()

type createTokenTypes = {
  tokenName: string
  unitName: string
  totalSupply: number
  decimals: number
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
  totalSupply: 0,
  decimals: 0,
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
  const {
    setMyAlgoAddresses,
    setAddressesNew,
    setActiveWallet,
    peraWallet,
    setPeraWallet,
    activeWallet
  } = useContext(WalletReducerContext)
  const { algodex } = useAlgodex()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})
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

  const resetError = (e) => {
    setError((prev) => ({ ...prev, [e.target.name]: '' }))
    setError((prev) => ({ ...prev, all: '' }))
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    resetError(e)
  }

  const handleCheck = (e) => {
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

  const isValidAddr = async (addr: string) => {
    //Check your if account exist on Algorand
    try {
      await algodClient().accountInformation(addr).do()
      return true
    } catch (error) {
      return false
    }
  }

  // const { myAlgoConnector, peraConnector } = useWallets()
  const { peraConnector } = useWallets(null)
  const myAlgoConnector = useMyAlgoConnector()

  useEffect(() => {
    const _myAlgoAddresses = JSON.parse(localStorage.getItem('myAlgoAddresses'))
    const _peraWallet = JSON.parse(localStorage.getItem('peraWallet'))

    if (_peraWallet?.type === 'wallet-connect' && peraWallet === null && peraConnector) {
      peraWalletRehydate.reconnectSession().then((accounts) => {
        // Setup the disconnect event listener
        // peraWallet.connector?.on("disconnect", handleDisconnectWalletClick)})
        const _rehyrdratedPeraWallet = {
          ..._peraWallet,
          connector: { ...peraConnector.connector, connected: true, sign: peraSigner }
        }
        setPeraWallet(_rehyrdratedPeraWallet)
        setAddressesNew({ type: 'peraWallet', addresses: [_rehyrdratedPeraWallet] })
        setActiveWallet(_rehyrdratedPeraWallet)
        console.log(accounts)
      })
    }

    if (
      Array.isArray(_myAlgoAddresses) &&
      _myAlgoAddresses.length > 0 &&
      myAlgoConnector !== null
    ) {
      myAlgoConnector.connected = true
      const _rehydratedMyAlgo = _myAlgoAddresses.map((addrObj) => {
        return { ...addrObj, connector: myAlgoConnector }
      })
      setMyAlgoAddresses(_rehydratedMyAlgo)
      setAddressesNew({ type: 'myAlgo', addresses: _rehydratedMyAlgo })
      setActiveWallet(_rehydratedMyAlgo[0])
    }
  }, [myAlgoConnector, peraConnector])

  const onSubmit = async (e) => {
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
    if (isNaN(totalSupply) || !isInteger(totalSupply) || totalSupply < 1) {
      setError((prev) => ({ ...prev, totalSupply: 'Enter a valid whole number' }))

      _error = true
    }

    //Ensure it is a valid whole number and between 1 - 10
    if (isNaN(decimals) || !isInteger(decimals) || decimals < 1 || decimals > 10) {
      setError((prev) => ({ ...prev, decimals: 'Enter whole number between 1 and 10' }))

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
      createToken()
    }
  }

  const createToken = () => {
    setLoading(true)
    const payload = { ...formData, decimals: Number(decimals), totalSupply: Number(totalSupply) }
    delete payload.showClawbackAddr
    delete payload.showFreezeAddr
    delete payload.showManagerAddr
    delete payload.showReserveAddr
    console.log('Create token', payload)
    setLoading(false)
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
                type="number"
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
                type="number"
                placeholder="Decimals (1-10)"
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
        <Box className="text-center">
          <Button type="submit" disabled={loading || !activeWallet?.address} sx={styles.submitBtn}>
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
