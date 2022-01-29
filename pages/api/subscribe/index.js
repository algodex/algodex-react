import axios from 'axios'

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY // ALGODEX_HUBSPOT_API_KEY
const HUBSPOT_PORTAL_ID = '' // ALGODEX_HUBSPOT_PORTAL_ID
const HUBSPOT_FORM_GUID = '' // ALGODEX_HUBSPOT_FORM_GUID

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
  } catch (error) {
    return res.status(500).json({ success: false })
  }

  res.status(200).json({ success: true, email })
}
