import { useContext, useEffect, useState } from 'react'
import algosdk, { ABIContract } from 'algosdk'
import { useAlgodex } from '@/hooks'
import * as abiTwpOptionsContract from '../utils/VotingSmartContracts/twoOptionContract.json'
import * as abiThreeOptionsContract from '../utils/VotingSmartContracts/threeOptionContract.json'
//import * as abiFourOptionsContract from '../utils/VotingSmartContracts/fourOptionContract.json'
import { PeraWalletConnect } from '@perawallet/connect'
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider.js'
import { getActiveNetwork } from '@/services/environment'
const peraWallet = new PeraWalletConnect()
const deflyWallet = new DeflyWalletConnect()

function useVoteSubmit() {
  const { algodex } = useAlgodex()
  const { activeWallet } = useContext(WalletReducerContext)

  // contracts
  const twoVotesContract: ABIContract = new algosdk.ABIContract(abiTwpOptionsContract)
  const threeVotesContract: ABIContract = new algosdk.ABIContract(abiThreeOptionsContract)
  //  const fourVotesContract: ABIContract = new algosdk.ABIContract(abiFourOptionsContract)
  const [appError, setAppError] = useState<string | null>(null)
  const [assetBalance, setAssetBalance] = useState<number | null>(-1)
  const [assetId, setAssetId] = useState<number | null>(null)
  const [voted, setVoted] = useState<boolean | null>(null)
  const [decimals, setDecimals] = useState<number | null>(null)
  const [currentContract, setCurrentContract] = useState<ABIContract | null>(null)
  const [active, setActive] = useState<boolean>(false)
  const [globalState, setGlobalState] = useState<{ key: string; value: number | string }[]>([])
  const [totalHolders, setTotalHolders] = useState<number>(0)
  const [appsLocalState, setAppsLocalState] = useState<number | null>(null)
  const account1_mnemonic = process.env.NEXT_PUBLIC_PASSPHRASE
  if (!account1_mnemonic) {
    throw new Error('Environment variable "PUBLIC_PASSPHRASE" is not defined')
  }
  useEffect(() => {
    peraWallet.reconnectSession()
    deflyWallet.reconnectSession()
  }, [activeWallet])

  async function checkAssetBalance(myAddress: string, assetId: number) {
    try {
      const accAssetInfo = await algodex.algod.accountAssetInformation(myAddress, assetId).do()
      const AccAssetBalance: number = accAssetInfo['asset-holding'].amount
      setAssetBalance(AccAssetBalance)
      if (AccAssetBalance <= 0) {
        throw new Error('You don´t have any amount of the required token to vote')
      }
    } catch (error) {
      setAssetBalance(null)
      console.log(error)
    }
  }
  async function checkVote(myAddress: string, appId: number) {
    try {
      const accountTxns = await algodex.indexer
        .lookupAccountTransactions(myAddress)
        .txType('appl')
        .do()
      const userTransfers = accountTxns.transactions.some(
        (txn: any) => txn['application-transaction']['application-id'] === appId
      )
      if (userTransfers) {
        readLocalState(appId, myAddress)
      } else {
        setVoted(false)
      }
    } catch (error) {
      setVoted(false)
      console.log(error)
    }
  }

  async function readGlobalState(appId: number, myAddress: string) {
    try {
      let appInfo = await algodex.algod.getApplicationByID(appId).do()
      let param: [] | any = []
      for (let i = 0; i < appInfo.params['global-state'].length; i++) {
        param.push({
          key: Buffer.from(appInfo.params['global-state'][i].key, 'base64').toString(),
          value:
            appInfo.params['global-state'][i].value.bytes !== ''
              ? Buffer.from(appInfo.params['global-state'][i].value.bytes, 'base64').toString()
              : appInfo.params['global-state'][i].value.uint
        })
      }
      const asset: { key: string; value: number | string }[] = param.filter((e: any) => {
        return e.key === 'asa_id'
      })
      const contractOptions = param
        .filter((e: any) => e.key.includes('option') && !e.key.includes('votes'))
        .sort((a: any, b: any) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
      setCurrentContract(
        contractOptions.length === 2
          ? twoVotesContract
          : contractOptions.length === 3
          ? threeVotesContract
          : null
        // : contractOptions.length === 4 ? fourVotesContract : null
      )
      const foundAssetId: number = asset[0]?.value as number
      const assetInfo = await algodex.indexer.lookupAssetByID(foundAssetId).do()
      const assetDecimals = assetInfo?.asset?.params?.decimals
      const voteEnd = param.filter((e: any) => e.key === 'vote_end')
      const currentTime = new Date().getTime() / 1000.0
      setActive((currentTime as number) < voteEnd[0].value)
      setDecimals(assetDecimals)
      if (myAddress !== null && myAddress !== undefined) {
        checkAssetBalance(myAddress, foundAssetId)
        checkVote(myAddress, appId)
      }
      setAssetId(foundAssetId)
      setGlobalState(param)
      setAppError(null)
    } catch (error) {
      setGlobalState([])
      setAppError('Application not found')
      console.log('Application not found', error)
    }
  }
  async function readLocalState(appId: number, myAddress: string) {
    try {
      const accountAppInfo = await algodex.algod
        .accountApplicationInformation(myAddress, appId)
        .do()
      let param: [] | any = []
      for (let i = 0; i < accountAppInfo['app-local-state']['key-value'].length; i++) {
        param.push({
          key: Buffer.from(
            accountAppInfo['app-local-state']['key-value'][i].key,
            'base64'
          ).toString(),
          value:
            accountAppInfo['app-local-state']['key-value'][i].value.bytes !== ''
              ? Buffer.from(
                  accountAppInfo['app-local-state']['key-value'][i].value.bytes,
                  'base64'
                ).toString()
              : accountAppInfo['app-local-state']['key-value'][i].value.uint
        })
      }
      const hasVoted: { key: string; value: number | string }[] = param.filter((e: any) => {
        return e.key === 'has_voted'
      })
      hasVoted[0].value === 1 ? setVoted(true) : setVoted(false)
    } catch (error) {
      setVoted(false)
      console.log(error)
    }
  }
  async function signer(unsignedTxns: Array<algosdk.Transaction>): Promise<Uint8Array[]> {
    const txsToSign = unsignedTxns.map((txn) => ({
      txn
    }))
    console.log(txsToSign, 'Txns To sign')

    if (activeWallet.type === 'wallet-connect') {
      return await peraWallet.signTransaction([txsToSign])
    }
    if (activeWallet.type === 'wallet-connect-defly') {
      return await deflyWallet.signTransaction([txsToSign])
    }
  }
  async function checkAppsLocalState(myAddress: string) {
    try {
      if (myAddress === undefined) {
        throw new Error('No address provided')
      }
      let appIds: any = []
      const accountApplications = await algodex.indexer.lookupAccountAppLocalStates(myAddress).do()
      accountApplications['apps-local-states'].forEach((element: any) => appIds.push(element['id']))
      setAppsLocalState(appIds)
    } catch (error) {
      setAppsLocalState(null)
      console.log(error)
    }
  }
  async function optInAndSubmitVote(appId: number, myAddress: string, method: string) {
    try {
      if (active === false) {
        throw new Error('This voting has ended.')
      }
      if (assetBalance === null || assetBalance === 0) {
        throw new Error('You don´t have any amount of the required token to vote.')
      }
      if (currentContract === null) {
        throw new Error('There is an ABIContract error.')
      }
      const suggestedParams = await algodex.algod.getTransactionParams().do()
      const atc = new algosdk.AtomicTransactionComposer()
      const optInMethod = currentContract.methods.filter((e) => {
        return e.name === `opt_in_voter`
      })
      atc.addMethodCall({
        appID: appId,
        method: optInMethod[0],
        sender: myAddress,
        signer: signer,
        onComplete: 1,
        suggestedParams
      })
      const votingMethod = currentContract.methods.filter((e) => {
        return e.name === `vote_${method}`
      })
      atc.addMethodCall({
        appID: appId,
        method: votingMethod[0],
        methodArgs: [assetId],
        sender: myAddress,
        signer: signer,
        suggestedParams
      })
      const result = await atc.execute(algodex.algod, 4)
      setVoted(true)
      readGlobalState(appId, myAddress)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  async function getTotalHolders() {
    try {
      let assetId = getActiveNetwork() === 'testnet' ? 95999794 : 724480511
      const minBalance = 10000000000
      const assetBalances = await algodex.indexer
        .lookupAssetBalances(assetId)
        .currencyGreaterThan(minBalance)
        .limit(9999)
        .do()
      setTotalHolders(assetBalances.balances.length)
    } catch (error) {
      console.log(error)
    }
  }
  return {
    globalState,
    readGlobalState,
    checkAssetBalance,
    assetBalance,
    voted,
    decimals,
    active,
    assetId,
    getTotalHolders,
    totalHolders,
    readLocalState,
    optInAndSubmitVote,
    checkAppsLocalState,
    appsLocalState
  }
}
export default useVoteSubmit
