import { ANS } from '@algonameservice/sdk'
import algosdk from 'algosdk'

const Helper = {
  envObjs: null,
  getAlgodex: function () {
    if (!this.envObjs) {
      const environment = this.getEnvironment()
      const algodexEnvironment = this.getAlgodexEnvironment()
      // const algodClient = algodexImport.initAlgodClient(algodexEnvironment)
      // algodexImport.initIndexer(algodexEnvironment)
      // algodexApiImport.initAlgodClient(algodexEnvironment)
      // algodexApiImport.initIndexer(algodexEnvironment)
      const feeReceiverAddress =
        process.env.NEXT_PUBLIC_FEE_RECEIVER_ADDRESS ||
        'U5XMP23KCHXNWW77WV32JRYM5XHQMTDZ7JMODDIGSJDSHUR6RYHVRH62AY'
      const indexerServer =
        this.getEnvironment() === 'mainnet'
          ? 'https://algoindexer.algoexplorerapi.io'
          : 'https://algoindexer.testnet.algoexplorerapi.io'

      const purestakeIndexerServer =
        this.getEnvironment() === 'mainnet'
          ? 'https://mainnet-algorand.api.purestake.io/idx2'
          : 'https://testnet-algorand.api.purestake.io/idx2'

      const purestakeClientServer =
        this.getEnvironment() === 'mainnet'
          ? 'https://mainnet-algorand.api.purestake.io/ps2'
          : 'https://testnet-algorand.api.purestake.io/ps2'
      const indexerPort = ''
      const indexerToken = ''

      const purestakeIndexerToken = 'VELyABA1dGqGbAVktbew4oACvp0c0298gMgYtYIb'

      this.envObjs = {
        // algodClient,
        indexerServer,
        indexerPort,
        indexerToken,
        environment,
        algodexEnvironment,
        feeReceiverAddress,
        purestakeIndexerServer,
        purestakeIndexerToken,
        purestakeClientServer
      }
    }
    return this.envObjs
  },
  getAlgodexEnvironment: function () {
    return process.env.NEXT_PUBLIC_ALGODEX_ENVIRONMENT || 'public_test'
  },

  getEnvironment: function () {
    const algodexEnvironment = this.getAlgodexEnvironment()
    if (algodexEnvironment === 'production') {
      return 'mainnet'
    }
    return 'testnet'
  }
}

function useAlgoNameService() {
  const { purestakeIndexerServer, purestakeIndexerToken, purestakeClientServer } =
    Helper.getAlgodex()

  const client = new algosdk.Algodv2(
    {
      'X-API-KEY': purestakeIndexerToken
    },
    purestakeClientServer,
    ''
  )

  const indexer = new algosdk.Indexer(
    {
      'X-API-KEY': purestakeIndexerToken
    },
    purestakeIndexerServer,
    ''
  )

  //indexer and client must point to mainnet
  const sdk = new ANS(client, indexer)

  const options = {
    socials: false,
    metadata: false,
    limit: 1
  }

  sdk
    .address('RANDGVRRYGVKI3WSDG6OGTZQ7MHDLIN5RYKJBABL46K5RQVHUFV3NY5DUE')
    .getNames(options)
    .then((result) => {
      console.log('Wallet Naming: ', result)
    })
    .catch((err) => {
      console.log('Wallet Naming Error: ', err)
    })
}

export default useAlgoNameService
