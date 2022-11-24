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

/*eslint-disable no-useless-escape */

import axios from 'axios'

//Extract credentials into .env

const HUBSPOT_API_KEY = '3382e6ff-1c9c-43f1-a622-52f60c30cce3'
const HUBSPOT_FORM_GUID = 'f4023600-6995-433b-894a-2a1ab09dc2f6'
const HUBSPOT_PORTAL_ID = '20146426'

export default async (req, res) => {
  const { email, pageUri } = req.body
  if (typeof email !== 'string') {
    return res.status(400).json({ success: false })
  }

  try {
    const response = await axios({
      method: 'POST',
      url: `https://api.hsforms.com/submissions/v3/integration/secure/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}\?hapikey\=${HUBSPOT_API_KEY}`,
      data: {
        fields: [{ name: 'email', value: email }],
        context: { pageUri }
      },
      headers: { 'Content-Type': 'application/json' }
    })
    res.status(200).json(response.data)
  } catch (error) {
    return res.status(500).json({ success: false })
  }
}
