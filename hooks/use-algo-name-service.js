import { ANS } from '@algonameservice/sdk'
import algosdk from 'algosdk'
import { useState, useEffect } from 'react'

const purestakeIndexerToken =
  process.env.NEXT_PUBLIC_PURE_STAKE_INDEXER_TOKEN || 'VELyABA1dGqGbAVktbew4oACvp0c0298gMgYtYIb'

const purestakeIndexerServer =
  process.env.NEXT_PUBLIC_PURE_STAKE_INDEXER_API || 'https://mainnet-algorand.api.purestake.io/idx2'

const purestakeClientServer =
  process.env.NEXT_PUBLIC_PURE_STAKE_CLIENT_API || 'https://mainnet-algorand.api.purestake.io/ps2'

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

const options = {
  socials: false,
  metadata: false,
  limit: 1
}

const sdk = new ANS(client, indexer)

export const useAlgoNameService = (wallets) => {
  const [algoWallets, setAlgoWallets] = useState([])

  //indexer and client must point to mainnet

  useEffect(() => {
    const fetchName = async () => {
      const dump = [...wallets]
      for (let i = 0; i < wallets.length; i++) {
        const names = await sdk
          .address('RANDGVRRYGVKI3WSDG6OGTZQ7MHDLIN5RYKJBABL46K5RQVHUFV3NY5DUE')
          // .address(wallets[i].address)
          .getNames(options)

        if (names[0].name) {
          dump[i].name = names[0]?.name
        }
      }
      setAlgoWallets(dump)
    }
    if (wallets) {
      fetchName()
    }
  }, [wallets])

  return algoWallets
}
