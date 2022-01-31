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
  } catch (error) {
    return res.status(500).json({ success: false })
  }

  res.status(200).json({ success: true, email })
}
