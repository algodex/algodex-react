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

import React, { useState } from 'react'
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
import { CopyIcon } from '../copyIcon'
import { LinearProgressWithLabel } from '../progressBar'
import { TokenSearchInput } from '../TokenSearchInput'
import { useTokenSale } from '@/hooks/useTokenSale'

const initialValues = {
  assetId: '',
  pricePerToken: 0.75,
  showPricePerToken: false,
  totalForSale: 14600,
  showTotalForSale: false
}

export const ManageTokenSale = () => {
  const [formData, setFormData] = useState(initialValues)
  const { assetId, pricePerToken, showPricePerToken, totalForSale, showTotalForSale } = formData
  const {
    rowData,
    onSubmit,
    selectedAsset,
    setSelectedAsset,
    activeWallet,
    columns,
    windowHost,
    resetForm
  } = useTokenSale(setFormData, initialValues)
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleViewChanges = (name) => {
    onChange({
      target: {
        name,
        value: !Number(name)
      }
    })
  }

  const handleShow = (e: { target: { name: string; value: boolean } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Typography variant="subtitle1" sx={styles.title}>
        Manage an ASA Sale
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
        You can only manage sales that have been created with the connected wallet. If you do not
        see an expected asset, confirm the correct wallet is connected above.
      </Typography>
      <form onSubmit={onSubmit}>
        <Box className="mb-6">
          <Typography variant="subtitle2" sx={{ ...styles.subtitle2, mb: '13px' }}>
            Choose Sale to Manage:
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
            <Box
              className="mb-10 px-4 py-8"
              sx={{
                border: '1px solid',
                borderColor: 'gray.250',
                borderRadius: '3px'
              }}
            >
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Token Name</Typography>
                <Typography sx={styles.value}>
                  {selectedAsset.params.name} ({selectedAsset.params['unit-name']})
                </Typography>
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Token Sale Link</Typography>
                <Typography
                  sx={{ ...styles.value, fontSize: '12px', display: 'flex', columnGap: '5px' }}
                >
                  {`${windowHost}/trade/${selectedAsset.assetId}`}
                  <CopyIcon content={`${windowHost}/trade/${selectedAsset.assetId}`} />
                </Typography>
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box>
                <Typography
                  sx={{ ...styles.title, fontSize: '21px', textAlign: 'center', mb: '20px' }}
                >
                  Sale Progress:
                </Typography>
                <LinearProgressWithLabel value={83.344} label={`${Math.round(83.344)}% sold`} />
                <Box
                  className="flex justify-between"
                  sx={{
                    color: 'white'
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '11px' }}>
                    {selectedAsset.availableBalance.toLocaleString()} ALGO
                  </Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: '11px' }}>
                    {selectedAsset.totalQuantity.toLocaleString()}{' '}
                    {selectedAsset.params['unit-name']} remaining
                  </Typography>
                </Box>
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Total For Sale</Typography>
                {showTotalForSale ? (
                  <Box className="flex items-center">
                    <OutlinedInput
                      type="text"
                      placeholder="Enter No. of Tokens on Sale"
                      name="totalForSale"
                      value={totalForSale}
                      onChange={(e) => onChange(e)}
                      sx={{
                        ...styles.input,
                        borderTop: 0,
                        borderInline: 0
                      }}
                    />
                    <Icon
                      icon="mdi:cancel-bold"
                      className="ml-3 cursor-pointer text-white"
                      onClick={() =>
                        handleShow({
                          target: {
                            name: 'showTotalForSale',
                            value: !showTotalForSale
                          }
                        })
                      }
                    />
                  </Box>
                ) : (
                  <Typography className="flex items-center" sx={styles.value}>
                    {totalForSale} ALGO
                    <Icon
                      icon="material-symbols:edit"
                      className="ml-3 cursor-pointer"
                      onClick={() => handleViewChanges('showTotalForSale')}
                    />
                  </Typography>
                )}
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Price Per Token</Typography>
                {showPricePerToken ? (
                  <Box className="flex items-center">
                    <OutlinedInput
                      type="text"
                      placeholder="Enter Price per Token"
                      name="pricePerToken"
                      value={pricePerToken}
                      onChange={(e) => onChange(e)}
                      sx={{
                        ...styles.input,
                        borderTop: 0,
                        borderInline: 0
                      }}
                    />{' '}
                    <Icon
                      icon="mdi:cancel-bold"
                      className="ml-3 cursor-pointer text-white"
                      onClick={() =>
                        handleShow({
                          target: {
                            name: 'showPricePerToken',
                            value: !showPricePerToken
                          }
                        })
                      }
                    />
                  </Box>
                ) : (
                  <Typography className="flex items-center" sx={styles.value}>
                    {pricePerToken} ALGO
                    <Icon
                      icon="material-symbols:edit"
                      className="ml-3 cursor-pointer"
                      onClick={() => handleViewChanges('showPricePerToken')}
                    />
                  </Typography>
                )}
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="flex justify-center gap-4 mt-7">
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{
                    ...styles.btnOutline,
                    borderColor: 'green.500',
                    '&:hover': {
                      backgroundColor: 'green.500'
                    }
                  }}
                >
                  Update Sale
                </Button>
                <Button
                  type="button"
                  sx={{
                    ...styles.btnOutline,
                    borderColor: 'red.600',
                    '&:hover': {
                      backgroundColor: 'red.600'
                    }
                  }}
                >
                  End Sale
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </form>
    </>
  )
}
