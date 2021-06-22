import algosdk from 'algosdk'

const ALGOD_SERVER = 'https://testnet.algoexplorerapi.io/'
const ALGOD_TOKEN = ''
const ALGOD_PORT = ''

export default new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)
