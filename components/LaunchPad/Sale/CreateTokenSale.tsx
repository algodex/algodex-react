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
import { Note } from '../note'

//MUI Components
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// Custom Styled Components
import OutlinedInput from '@/components/Input/OutlinedInput'
import { styles } from '../styles.css'

const initialValues = {
  assetId: '',
  quantity: '',
  perUnit: ''
}

export const CreateTokenSale = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(initialValues)
  const { assetId, quantity, perUnit } = formData

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
        Create a Token Sale
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
          Creator/Reserve Address:
        </Typography>
        <CreatorAddress />
      </Box>
      <Typography variant="body1" sx={{ ...styles.body1, marginBottom: '24px' }}>
        A sale must be started from either the Creator or the Reserve wallet of the ASA. Ensure the
        correct wallet is connected or you will not be able to start a sale.
      </Typography>
      <form onSubmit={onSubmit}>
        <Box className="mb-8">
          <Typography variant="subtitle2" sx={{ ...styles.subtitle2, mb: '13px' }}>
            Choose Asset:
          </Typography>
          <Box className="mb-4 px-4">
            <OutlinedInput
              type="text"
              placeholder="ASA Asset ID"
              name="assetId"
              value={assetId}
              onChange={(e) => onChange(e)}
              sx={styles.input}
            />
          </Box>
        </Box>

        <Box className="mb-10">
          <Typography variant="subtitle2" sx={{ ...styles.subtitle2, mb: '13px' }}>
            Set Quantity and Prices for Sale:
          </Typography>
          <Box className="mb-4 px-4">
            <OutlinedInput
              type="text"
              placeholder="Quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => onChange(e)}
              sx={styles.input}
            />
            <Typography
              className="my-5 text-center"
              sx={{ fontSize: '15px', color: 'white', fontStyle: 'italic' }}
            >
              Available Balance: XXX,XXX,XXX TEST UNIT
            </Typography>
          </Box>

          <Box className="mb-4 px-4" sx={{ color: 'white' }}>
            <OutlinedInput
              type="text"
              placeholder="Price per unit in ALGO"
              name="perUnit"
              value={perUnit}
              onChange={(e) => onChange(e)}
              sx={styles.input}
            />
            <Typography className="my-5 text-center" sx={{ fontSize: '15px', fontStyle: 'italic' }}>
              1 TEST UNIT = X ALGO
            </Typography>
            <Typography
              className="text-center opacity-70"
              sx={{ fontSize: '15px', fontStyle: 'italic' }}
            >
              1 ALGO = .56 USDC
            </Typography>
          </Box>
        </Box>

        <Note
          className="my-6"
          content="It takes approximately 10 seconds to create your ASA after confirming. The Tokens will automatically transfer to the creator wallet after the creation is successful. You are able to create a sale of your token on Algodex or use Mailbox to distribute."
        />
        <Box className="text-center">
          <Button type="submit" disabled={loading} sx={styles.submitBtn}>
            Confirm Sale
          </Button>
        </Box>
      </form>
    </>
  )
}
