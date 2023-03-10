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

import React from 'react'
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
import { truncatedWalletAddress } from '@/components/helpers'
import { ErrorMessage } from '../ErrorMessage'
import { TokenSearchInput } from '../TokenSearchInput'
import useManageToken from '../../../hooks/useManageToken'

export const ManageToken = () => {
  const {
    assetId,
    showClawbackAddr,
    clawbackAddr,
    tempClawbackAddr,
    showReserveAddr,
    reserveAddr,
    tempReserveAddr,
    showManagerAddr,
    managerAddr,
    tempManagerAddr,
    showFreezeAddr,
    freezeAddr,
    tempFreezeAddr,
    loading,
    selectedAsset,
    setSelectedAsset,
    activeWallet,
    error,
    rowData,
    columns,
    onSubmit,
    handleShow,
    onChange,
    resetForm,
    cancelEdit,
    confirmEdit,
    isEligible
  } = useManageToken()

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
        <CreatorAddress
          activeWallet={activeWallet ? activeWallet : undefined}
          resetForm={resetForm}
        />
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

          <TokenSearchInput
            name="assetId"
            value={assetId}
            placeholder="ASA Asset ID"
            onChange={onChange}
            columns={columns}
            rowData={rowData}
            disabled={!activeWallet}
            setSelectedAsset={setSelectedAsset}
          />
          <Typography variant="body1" sx={{ ...styles.body1, marginBottom: '29px' }}>
            Search with Asset Name or Asset ID - Only ASAs created by the currently connected wallet
            will show as options.
          </Typography>

          {selectedAsset && (
            <Box className="mb-10 px-4">
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Token Name</Typography>
                <Typography sx={styles.value}>
                  {selectedAsset.params.name} ({selectedAsset.params['unit-name']})
                </Typography>
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Token Supply</Typography>
                <Typography sx={styles.value}>
                  {selectedAsset.totalQuantity.toLocaleString()}
                </Typography>
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Decimals</Typography>
                <Typography sx={styles.value}>{selectedAsset.params.decimals}</Typography>
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Asset URL Property</Typography>
                <Typography sx={styles.value}>{selectedAsset.params.assetURL || '---'}</Typography>
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Asset Metdata Hash</Typography>
                <Typography sx={{ ...styles.value, fontSize: '12px' }}>
                  {selectedAsset.params.assetMetadataHash || '---'}
                </Typography>
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Clawback Address</Typography>
                <Box sx={styles.fillAvailable}>
                  {showClawbackAddr ? (
                    <Box className="flex items-center">
                      <OutlinedInput
                        type="text"
                        placeholder="Update Clawback Address"
                        name="tempClawbackAddr"
                        value={tempClawbackAddr}
                        onChange={(e) => onChange(e)}
                        sx={{
                          ...styles.input,
                          borderTop: 0,
                          borderInline: 0
                        }}
                      />
                      <Icon
                        icon="mdi:check-bold"
                        className="ml-3 cursor-pointer text-white"
                        onClick={() =>
                          confirmEdit(
                            'showClawbackAddr',
                            showClawbackAddr,
                            'clawbackAddr',
                            tempClawbackAddr,
                            'tempClawbackAddr'
                          )
                        }
                      />
                      <Icon
                        icon="mdi:cancel-bold"
                        className="ml-3 cursor-pointer text-white"
                        onClick={() =>
                          cancelEdit(
                            'showClawbackAddr',
                            showClawbackAddr,
                            'tempClawbackAddr',
                            clawbackAddr
                          )
                        }
                      />
                    </Box>
                  ) : (
                    <Typography className="flex items-center" sx={styles.value}>
                      {truncatedWalletAddress(clawbackAddr, 4)}{' '}
                      {clawbackAddr && <CopyIcon content={clawbackAddr} />}
                      {isEligible && (
                        <Icon
                          icon="material-symbols:edit"
                          className="ml-3 cursor-pointer"
                          onClick={() =>
                            handleShow({
                              target: {
                                name: 'showClawbackAddr',
                                value: !showClawbackAddr
                              }
                            })
                          }
                        />
                      )}
                    </Typography>
                  )}
                  <ErrorMessage error={error} name="tempClawbackAddr" />
                </Box>
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Reserve Address</Typography>
                <Box sx={styles.fillAvailable}>
                  {showReserveAddr ? (
                    <Box className="flex items-center">
                      <OutlinedInput
                        type="text"
                        placeholder="Update Reserve Address"
                        name="tempReserveAddr"
                        value={tempReserveAddr}
                        onChange={(e) => onChange(e)}
                        sx={{
                          ...styles.input,
                          borderTop: 0,
                          borderInline: 0
                        }}
                      />{' '}
                      <Icon
                        icon="mdi:check-bold"
                        className="ml-3 cursor-pointer text-white"
                        onClick={() =>
                          confirmEdit(
                            'showReserveAddr',
                            showReserveAddr,
                            'reserveAddr',
                            tempReserveAddr,
                            'tempReserveAddr'
                          )
                        }
                      />
                      <Icon
                        icon="mdi:cancel-bold"
                        className="ml-3 cursor-pointer text-white"
                        onClick={() =>
                          cancelEdit(
                            'showReserveAddr',
                            showReserveAddr,
                            'tempReserveAddr',
                            reserveAddr
                          )
                        }
                      />
                    </Box>
                  ) : (
                    <Typography className="flex items-center" sx={styles.value}>
                      {truncatedWalletAddress(reserveAddr, 4)}{' '}
                      {reserveAddr && <CopyIcon content={reserveAddr} />}
                      {isEligible && (
                        <Icon
                          icon="material-symbols:edit"
                          className="ml-3 cursor-pointer"
                          onClick={() =>
                            handleShow({
                              target: {
                                name: 'showReserveAddr',
                                value: !showReserveAddr
                              }
                            })
                          }
                        />
                      )}
                    </Typography>
                  )}
                  <ErrorMessage error={error} name="tempReserveAddr" />
                </Box>
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Manager Address</Typography>
                <Box sx={styles.fillAvailable}>
                  {showManagerAddr ? (
                    <Box className="flex items-center">
                      <OutlinedInput
                        type="text"
                        placeholder="Update Manager Address"
                        name="tempManagerAddr"
                        value={tempManagerAddr}
                        onChange={(e) => onChange(e)}
                        sx={{
                          ...styles.input,
                          borderTop: 0,
                          borderInline: 0
                        }}
                      />

                      <Icon
                        icon="mdi:check-bold"
                        className="ml-3 cursor-pointer text-white"
                        onClick={() =>
                          confirmEdit(
                            'showManagerAddr',
                            showManagerAddr,
                            'managerAddr',
                            tempManagerAddr,
                            'tempManagerAddr'
                          )
                        }
                      />
                      <Icon
                        icon="mdi:cancel-bold"
                        className="ml-3 cursor-pointer text-white"
                        onClick={() =>
                          cancelEdit(
                            'showManagerAddr',
                            showManagerAddr,
                            'tempManagerAddr',
                            managerAddr
                          )
                        }
                      />
                    </Box>
                  ) : (
                    <Typography className="flex items-center" sx={styles.value}>
                      {truncatedWalletAddress(managerAddr, 4)}{' '}
                      {managerAddr && <CopyIcon content={managerAddr} />}
                      {isEligible && (
                        <Icon
                          icon="material-symbols:edit"
                          className="ml-3 cursor-pointer"
                          onClick={() =>
                            handleShow({
                              target: {
                                name: 'showManagerAddr',
                                value: !showManagerAddr
                              }
                            })
                          }
                        />
                      )}
                    </Typography>
                  )}
                  <ErrorMessage error={error} name="tempManagerAddr" />
                </Box>
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Freeze Address</Typography>
                <Box sx={styles.fillAvailable}>
                  {showFreezeAddr ? (
                    <Box className="flex items-center">
                      <OutlinedInput
                        type="text"
                        placeholder="Update Freeze Address"
                        name="tempFreezeAddr"
                        value={tempFreezeAddr}
                        onChange={(e) => onChange(e)}
                        sx={{
                          ...styles.input,
                          borderTop: 0,
                          borderInline: 0
                        }}
                      />

                      <Icon
                        icon="mdi:check-bold"
                        className="ml-3 cursor-pointer text-white"
                        onClick={() =>
                          confirmEdit(
                            'showFreezeAddr',
                            showFreezeAddr,
                            'freezeAddr',
                            tempFreezeAddr,
                            'tempFreezeAddr'
                          )
                        }
                      />
                      <Icon
                        icon="mdi:cancel-bold"
                        className="ml-3 cursor-pointer text-white"
                        onClick={() =>
                          cancelEdit('showFreezeAddr', showFreezeAddr, 'tempFreezeAddr', freezeAddr)
                        }
                      />
                    </Box>
                  ) : (
                    <Typography className="flex items-center" sx={styles.value}>
                      {truncatedWalletAddress(freezeAddr, 4)}{' '}
                      {freezeAddr && <CopyIcon content={freezeAddr} />}
                      {isEligible && (
                        <Icon
                          icon="material-symbols:edit"
                          className="ml-3 cursor-pointer"
                          onClick={() =>
                            handleShow({
                              target: {
                                name: 'showFreezeAddr',
                                value: !showFreezeAddr
                              }
                            })
                          }
                        />
                      )}
                    </Typography>
                  )}
                  <ErrorMessage error={error} name="tempFreezeAddr" />
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {selectedAsset && (
          <>
            <Note
              className="my-6"
              content="It takes approximately 10 seconds to update your ASA after confirming."
            />
            <Box className="text-center">
              <Button type="submit" disabled={loading} sx={styles.submitBtn}>
                UPDATE TOKEN
              </Button>
            </Box>
          </>
        )}
      </form>
    </>
  )
}
