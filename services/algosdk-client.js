import algosdk from 'algosdk'

const PURESTAKE_TOKEN = {
  'X-API-key': process.env.PURESTAKE_KEY
}

const PURESTAKE_URL = 'https://testnet-algorand.api.purestake.io/ps2'
const PURESTAKE_PORT = ''

export default new algosdk.Algodv2(PURESTAKE_TOKEN, PURESTAKE_URL, PURESTAKE_PORT)
