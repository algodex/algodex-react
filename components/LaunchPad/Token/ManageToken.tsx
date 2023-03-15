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
import { styles } from '../styles.css'
import { Note } from '../note'
import { TokenSearchInput } from '../TokenSearchInput'
import useManageToken from '@/hooks/useManageToken'
import { EditableAddress } from './EditableAddress'

const Notice = () => {
  return (
    <Typography className="flex items-center mt-1" sx={styles.note}>
      <Icon icon="heroicons:exclaimation-circle" className="mr-1" width="14" />
      Field has been updated. You must click “Update Token” below to finalize this change.
    </Typography>
  )
}

export const ManageToken = () => {
  const {
    assetId,
    clawbackAddr,
    tempClawbackAddr,
    reserveAddr,
    tempReserveAddr,
    managerAddr,
    tempManagerAddr,
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
    handleEdit,
    isEdit,
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
                <Typography sx={styles.name}>Total Supply</Typography>
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

                <EditableAddress
                  confirmEdit={confirmEdit}
                  handleEdit={handleEdit}
                  cancelEdit={cancelEdit}
                  isEligible={isEligible}
                  isEdit={isEdit}
                  error={error}
                  inputValue={clawbackAddr}
                  inputName={'clawbackAddr'}
                  tempInputValue={tempClawbackAddr}
                  tempInputName={'tempClawbackAddr'}
                  onChange={onChange}
                  placeholder={'Update Clawback Address'}
                />
              </Box>
              {selectedAsset.params.clawback !== clawbackAddr && <Notice />}
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Reserve Address</Typography>

                <EditableAddress
                  confirmEdit={confirmEdit}
                  handleEdit={handleEdit}
                  cancelEdit={cancelEdit}
                  isEligible={isEligible}
                  isEdit={isEdit}
                  error={error}
                  inputValue={reserveAddr}
                  inputName={'reserveAddr'}
                  tempInputValue={tempReserveAddr}
                  tempInputName={'tempReserveAddr'}
                  onChange={onChange}
                  placeholder={'Update Reserve Address'}
                />
              </Box>
              {selectedAsset.params.reserve !== reserveAddr && <Notice />}
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Manager Address</Typography>

                <EditableAddress
                  confirmEdit={confirmEdit}
                  handleEdit={handleEdit}
                  cancelEdit={cancelEdit}
                  isEligible={isEligible}
                  isEdit={isEdit}
                  error={error}
                  inputValue={managerAddr}
                  inputName={'managerAddr'}
                  tempInputValue={tempManagerAddr}
                  tempInputName={'tempManagerAddr'}
                  onChange={onChange}
                  placeholder={'Update Manager Address'}
                />
              </Box>
              {selectedAsset.params.manager !== managerAddr && <Notice />}
              <Divider className="my-5 opacity-40" sx={styles.divider} />
              <Box className="md:flex gap-x-2">
                <Typography sx={styles.name}>Freeze Address</Typography>

                <EditableAddress
                  confirmEdit={confirmEdit}
                  handleEdit={handleEdit}
                  cancelEdit={cancelEdit}
                  isEligible={isEligible}
                  isEdit={isEdit}
                  error={error}
                  inputValue={freezeAddr}
                  inputName={'freezeAddr'}
                  tempInputValue={tempFreezeAddr}
                  tempInputName={'tempFreezeAddr'}
                  onChange={onChange}
                  placeholder={'Update Freeze Address'}
                />
              </Box>
              {selectedAsset.params.freeze !== freezeAddr && <Notice />}
            </Box>
          )}
        </Box>

        {selectedAsset && (
          <>
            <Note
              className="my-6"
              content="After editing the fields above, you must click the “Update Token” button below to submit the changes to the blockchain. It takes approximately 10 seconds to update your ASA after confirming."
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
