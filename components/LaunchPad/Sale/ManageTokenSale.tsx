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
import { ConnectedAddress } from '../connectedAddress'

//MUI Components
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

// Custom Styled Components
import OutlinedInput from '@/components/Input/OutlinedInput'
import { styles } from '../styles.css'

const initialValues = {
  tokenName: ''
}

export const ManageTokenSale = () => {
  const [formData, setFormData] = useState(initialValues)
  const { tokenName } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
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
        <ConnectedAddress />
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

          <Box
            className="mb-10 p-4"
            sx={{
              border: '1px solid',
              borderColor: 'gray.250',
              borderRadius: '3px'
            }}
          >
            <Box className="md:flex gap-x-2">
              <Typography sx={styles.name}>Token Name</Typography>
              <Typography sx={styles.value}>The Goose Token (GOOSE)</Typography>
            </Box>
            <Divider className="my-5 opacity-40" sx={styles.divider} />
            <Box className="md:flex gap-x-2">
              <Typography sx={styles.name}>Token Sale Link</Typography>
              <Typography
                sx={{ ...styles.value, fontSize: '12px', display: 'flex', columnGap: '5px' }}
              >
                https://app.algodex.com/trade/793124631?cc=US
                <ContentCopyIcon sx={styles.copy} />
              </Typography>
            </Box>
            <Divider className="my-5 opacity-40" sx={styles.divider} />
            <Box className="md:flex gap-x-2">
              <Typography sx={styles.name}>Number of Tokens on Sale</Typography>
              <Typography sx={styles.value}>4600</Typography>
            </Box>
            <Divider className="my-5 opacity-40" sx={styles.divider} />
            <Box className="md:flex gap-x-2">
              <Typography sx={styles.name}>Price Per Token</Typography>
              <Typography sx={{ ...styles.value, fontSize: '12px' }}>.76 ALGO per GOOSE</Typography>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  )
}
