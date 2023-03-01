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

import React, { useContext, useState } from 'react'
import { CreatorAddress } from '../CreatorAddress'
import { Icon } from '@iconify/react'

//MUI Components
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// Custom Styled Components
import OutlinedInput from '@/components/Input/OutlinedInput'
import { styles } from '../styles.css'
import { Note } from '../note'
import { CopyIcon } from '../copyIcon'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider'
import { truncatedWalletAddress } from '@/components/helpers'

const initialValues = {
  tokenName: '',
  assetURL: 'thegoosetoken.com',
  showClawbackAddr: false,
  clawbackAddr: 'V537CZGHERY87634WVQCAGFYTRYH',
  showReserveAddr: false,
  reserveAddr: 'V537CZGHERY87634WVQCAGFYTRYH',
  showManagerAddr: false,
  managerAddr: 'V537CZGHERY87634WVQCAGFYTRYH',
  showFreezeAddr: false,
  freezeAddr: 'V537CZGHERY87634WVQCAGFYTRYH'
}

export const ManageToken = () => {
  const { activeWallet } = useContext(WalletReducerContext)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(initialValues)
  const {
    tokenName,
    assetURL,
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

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setLoading(false)
  }

  return (
    <>
      <Typography variant="subtitle1" sx={styles.title}>
        Manage an Algorand Standard Asset (ASA)
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
      <Typography variant="body1" sx={{ ...styles.body1, marginBottom: '30px' }}>
        You can only manage ASAs that have been created with the connected wallet. If you do not see
        an expected asset, confirm the correct wallet is connected above.
      </Typography>
      <form onSubmit={onSubmit}>
        <Box className="mb-6">
          <Typography variant="subtitle2" sx={{ ...styles.subtitle2, mb: '13px' }}>
            Choose Token to Manage:
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
          <Typography variant="body1" sx={{ ...styles.body1, marginBottom: '29px' }}>
            Search with Asset Name or Asset ID - Only ASAs created by the currently connected wallet
            will show as options.
          </Typography>

          <Box className="mb-10 px-4">
            <Box className="md:flex gap-x-2">
              <Typography sx={styles.name}>Token Name</Typography>
              <Typography sx={styles.value}>The Goose Token (GOOSE)</Typography>
            </Box>
            <Divider className="my-5 opacity-40" sx={styles.divider} />
            <Box className="md:flex gap-x-2">
              <Typography sx={styles.name}>Token Supply</Typography>
              <Typography sx={styles.value}>101,117.0000</Typography>
            </Box>
            <Divider className="my-5 opacity-40" sx={styles.divider} />
            <Box className="md:flex gap-x-2">
              <Typography sx={styles.name}>Decimals</Typography>
              <Typography sx={styles.value}>4</Typography>
            </Box>
            <Divider className="my-5 opacity-40" sx={styles.divider} />
            <Box className="md:flex gap-x-2">
              <Typography sx={styles.name}>Asset URL Property</Typography>
              <Typography sx={styles.value}>{assetURL}</Typography>
            </Box>
            <Divider className="my-5 opacity-40" sx={styles.divider} />
            <Box className="md:flex gap-x-2">
              <Typography sx={styles.name}>Asset Metdata Hash</Typography>
              <Typography sx={{ ...styles.value, fontSize: '12px' }}>
                A28C2F09C0211E165AE9DC3A60A490C0
              </Typography>
            </Box>
            <Divider className="my-5 opacity-40" sx={styles.divider} />
            <Box className="md:flex gap-x-2">
              <Typography sx={styles.name}>Clawback Address</Typography>
              {showClawbackAddr ? (
                <OutlinedInput
                  type="text"
                  placeholder="Update Clawback Address"
                  name="clawbackAddr"
                  value={clawbackAddr}
                  onChange={(e) => onChange(e)}
                  sx={{
                    ...styles.input,
                    borderTop: 0,
                    borderInline: 0
                  }}
                />
              ) : (
                <Typography className="flex items-center" sx={styles.value}>
                  {truncatedWalletAddress(clawbackAddr, 4)} <CopyIcon content={clawbackAddr} />
                  <Icon
                    icon="material-symbols:edit"
                    className="ml-3 cursor-pointer"
                    onClick={() =>
                      onChange({
                        target: {
                          name: 'showClawbackAddr',
                          value: !showClawbackAddr
                        }
                      })
                    }
                  />
                </Typography>
              )}
            </Box>
            <Divider className="my-5 opacity-40" sx={styles.divider} />
            <Box className="md:flex gap-x-2">
              <Typography sx={styles.name}>Reserve Address</Typography>
              {showReserveAddr ? (
                <OutlinedInput
                  type="text"
                  placeholder="Update Reserve Address"
                  name="reserveAddr"
                  value={reserveAddr}
                  onChange={(e) => onChange(e)}
                  sx={{
                    ...styles.input,
                    borderTop: 0,
                    borderInline: 0
                  }}
                />
              ) : (
                <Typography className="flex items-center" sx={styles.value}>
                  {truncatedWalletAddress(reserveAddr, 4)} <CopyIcon content={reserveAddr} />
                  <Icon
                    icon="material-symbols:edit"
                    className="ml-3 cursor-pointer"
                    onClick={() =>
                      onChange({
                        target: {
                          name: 'showReserveAddr',
                          value: !showReserveAddr
                        }
                      })
                    }
                  />
                </Typography>
              )}
            </Box>
            <Divider className="my-5 opacity-40" sx={styles.divider} />
            <Box className="md:flex gap-x-2">
              <Typography sx={styles.name}>Manager Address</Typography>
              {showManagerAddr ? (
                <OutlinedInput
                  type="text"
                  placeholder="Update Manager Address"
                  name="managerAddr"
                  value={managerAddr}
                  onChange={(e) => onChange(e)}
                  sx={{
                    ...styles.input,
                    borderTop: 0,
                    borderInline: 0
                  }}
                />
              ) : (
                <Typography className="flex items-center" sx={styles.value}>
                  {truncatedWalletAddress(managerAddr, 4)} <CopyIcon content={managerAddr} />
                  <Icon
                    icon="material-symbols:edit"
                    className="ml-3 cursor-pointer"
                    onClick={() =>
                      onChange({
                        target: {
                          name: 'showManagerAddr',
                          value: !showManagerAddr
                        }
                      })
                    }
                  />
                </Typography>
              )}
            </Box>
            <Divider className="my-5 opacity-40" sx={styles.divider} />
            <Box className="md:flex gap-x-2">
              <Typography sx={styles.name}>Freeze Address</Typography>
              {showFreezeAddr ? (
                <OutlinedInput
                  type="text"
                  placeholder="Update Freeze Address"
                  name="freezeAddr"
                  value={freezeAddr}
                  onChange={(e) => onChange(e)}
                  sx={{
                    ...styles.input,
                    borderTop: 0,
                    borderInline: 0
                  }}
                />
              ) : (
                <Typography className="flex items-center" sx={styles.value}>
                  {truncatedWalletAddress(freezeAddr, 4)} <CopyIcon content={freezeAddr} />
                  <Icon
                    icon="material-symbols:edit"
                    className="ml-3 cursor-pointer"
                    onClick={() =>
                      onChange({
                        target: {
                          name: 'showFreezeAddr',
                          value: !showFreezeAddr
                        }
                      })
                    }
                  />
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        <Note
          className="my-6"
          content="It takes approximately 10 seconds to update your ASA after confirming."
        />
        <Box className="text-center">
          <Button type="submit" disabled={loading} sx={styles.submitBtn}>
            UPDATE TOKEN
          </Button>
        </Box>
      </form>
    </>
  )
}
