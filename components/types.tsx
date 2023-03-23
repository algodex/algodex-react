export type assetParam = {
  clawback: string
  creator: string
  decimals: number
  'default-frozen': boolean
  freeze: string
  manager: string
  reserve: string
  name: string
  'name-b64': string
  total: number
  'unit-name': string
  'unit-name-b64': string
  assetMetadataHash: string
  assetURL: string
}
export type createdAssets = {
  'created-at-round': number
  deleted: boolean
  index: number
  params: assetParam
}

export type asset = {
  amount: 44
  'asset-id': number
  deleted: boolean
  'is-frozen': boolean
  'opted-in-at-round': number
}

export type activeWalletTypes = {
  address: string
  name: string
  type: string
  connector: {
    bridge: {
      options: {
        waitForReply: boolean
        timeout: number
      }
      bridge: {
        channelName: string
        _requests: object
        _nextId: number
        _defaultTimeout: number
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    signTransaction?: (arg: unknown) => { blob: Uint8Array | Uint8Array[] } | any
    timeout: number
    url: string
    currentConnectPopup: unknown
    currentSigntxPopup: unknown
    currentSignLogicSigPopup: unknown
    options: {
      waitForReply: boolean
      timeout: number
    }
    disableLedgerNano: boolean
    connected: boolean
  }
  peraWallet?: { signTransaction?: (arg: unknown) => Uint8Array | Uint8Array[] }
  amount: number
  'amount-without-pending-rewards': number
  assets: Array<asset>
  'created-assets': Array<createdAssets>
  'created-at-round': number
  deleted: false
  'pending-rewards': number
  'reward-base': number
  rewards: number
  round: number
  'sig-type': string
  status: string
  'total-apps-opted-in': number
  'total-assets-opted-in': number
  'total-box-bytes': number
  'total-boxes': number
  'total-created-apps': number
  'total-created-assets': number
}

export type selectedAsset = {
  assetId: number
  assetName: string
  'created-at-round': number
  deleted: boolean
  index: number
  params: assetParam
  totalQuantity?: number
  availableBalance?: number
  price?: number
  amount?: number
}
