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

import React, { useMemo, useState } from 'react'
import { CreatorAddress } from '../CreatorAddress'

//MUI Components
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

// Custom Styled Components
import { styles } from '../styles.css'
import { CopyIcon } from '../copyIcon'
import { LinearProgressWithLabel } from '../progressBar'
import { TokenSearchInput } from '../TokenSearchInput'
import { useTokenSale } from '@/hooks/useTokenSale'
import { EditableField } from './EditableField'

const initialValues = {
  assetId: '',
  perUnit: '',
  // tempPerUnit: '',
  quantity: '',
  tempQuantity: ''
}

export const ManageTokenSale = () => {
  const [formData, setFormData] = useState(initialValues)
  const { assetId, perUnit, quantity, tempQuantity } = formData
  const {
    rowData,
    resetError,
    onSubmit,
    selectedAsset,
    setSelectedAsset,
    activeWallet,
    columns,
    windowHost,
    resetForm,
    error,
    loading,
    isEdit,
    cancelEdit,
    confirmEdit,
    handleEdit,
    endSale
  } = useTokenSale(formData, setFormData, initialValues, 'manage')

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    //Clear out error message if any
    resetError(e)
  }

  const percentSold = useMemo(() => {
    if (selectedAsset) {
      return Math.round(
        ((selectedAsset.totalQuantity - selectedAsset.availableBalance) /
          selectedAsset.totalQuantity) *
          100
      )
    }
    return 0
  }, [selectedAsset])

  return (
    <>
      <Typography variant="subtitle1" sx={styles.title}>
        Manage an ASA Sale
      </Typography>
      <Divider sx={styles.divider} />

      <CreatorAddress
        activeWallet={activeWallet ? activeWallet : undefined}
        resetForm={resetForm}
      />
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
                  <Link
                    target="_blank"
                    color={'white'}
                    href={`${windowHost}/trade/${selectedAsset.assetId}`}
                    rel="noreferrer"
                  >
                    {`${windowHost}/trade/${selectedAsset.assetId}`}
                  </Link>
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
                <LinearProgressWithLabel value={percentSold} label={`${percentSold}% sold`} />
                <Box
                  className="flex justify-between"
                  sx={{
                    color: 'white'
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '11px' }}>
                    {(
                      selectedAsset.totalQuantity - selectedAsset.availableBalance
                    ).toLocaleString()}{' '}
                    {selectedAsset.params['unit-name']}
                  </Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: '11px' }}>
                    {selectedAsset.availableBalance.toLocaleString()}{' '}
                    {selectedAsset.params['unit-name']} remaining
                  </Typography>
                </Box>
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Total For Sale</Typography>
                <EditableField
                  confirmEdit={confirmEdit}
                  handleEdit={handleEdit}
                  cancelEdit={cancelEdit}
                  isEligible={true}
                  isEdit={isEdit}
                  error={error}
                  inputValue={quantity}
                  inputName={'quantity'}
                  tempInputValue={tempQuantity}
                  tempInputName={'tempQuantity'}
                  onChange={onChange}
                  placeholder={'Enter No. of Tokens on Sale'}
                  additionalText={selectedAsset.params['unit-name']}
                />
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Price Per Token</Typography>
                <Typography className="flex items-center" sx={styles.value}>
                  {perUnit} ALGO
                </Typography>
                {/* <EditableField
                  confirmEdit={confirmEdit}
                  handleEdit={handleEdit}
                  cancelEdit={cancelEdit}
                  isEligible={true}
                  isEdit={isEdit}
                  error={error}
                  inputValue={perUnit}
                  inputName={'perUnit'}
                  tempInputValue={tempPerUnit}
                  tempInputName={'tempPerUnit'}
                  onChange={onChange}
                  placeholder={'Enter Price per Token'}
                /> */}
              </Box>
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="flex justify-center gap-4 mt-7">
                <Button
                  type="submit"
                  variant="outlined"
                  disabled={loading || selectedAsset.amount === Number(formData.quantity)}
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
                  onClick={endSale}
                  disabled={loading}
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
