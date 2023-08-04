import { useContext, useEffect, useState } from 'react'
import algosdk, { ABIContract } from 'algosdk'
import { useAlgodex } from '@/hooks'
import * as abiTwpOptionsContract from '../utils/VotingSmartContracts/twoOptionContract.json'
import * as abiThreeOptionsContract from '../utils/VotingSmartContracts/threeOptionContract.json'
//import * as abiFourOptionsContract from '../utils/VotingSmartContracts/fourOptionContract.json'
import { PeraWalletConnect } from '@perawallet/connect'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider.js'
import { getActiveNetwork } from '@/services/environment'
const peraWallet = new PeraWalletConnect()

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
  const account1_mnemonic = process.env.NEXT_PUBLIC_PASSPHRASE
  if (!account1_mnemonic) {
    throw new Error('Environment variable "PUBLIC_PASSPHRASE" is not defined')
  }
  useEffect(() => {
    peraWallet.reconnectSession()
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
  async function checkVote(myAddress: string, assetId: number, appId: number) {
    const appAddress = algosdk.getApplicationAddress(appId)
    const appAssetTransfers = await algodex.indexer
      .lookupAccountTransactions(appAddress)
      .assetID(assetId)
      .do()
    const userTransfers = appAssetTransfers.transactions.some(
      (txn: any) => txn['sender'] === myAddress
    )
    try {
      setVoted(userTransfers)
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
        checkVote(myAddress, foundAssetId, appId)
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
  async function peraSign(unsignedTxns: Array<algosdk.Transaction>): Promise<Uint8Array[]> {
    const txsToSign = unsignedTxns.map((txn) => ({
      txn
    }))
    console.log(txsToSign, 'Txns To sign')

    return await peraWallet.signTransaction([txsToSign])
  }
  async function voteSubmit(myAddress: string, appId: number, method: string) {
    const appAddress = algosdk.getApplicationAddress(appId)
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
      const txn1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: myAddress,
        to: appAddress,
        amount: assetBalance as number,
        assetIndex: assetId as number,
        suggestedParams
      })

      const atc = new algosdk.AtomicTransactionComposer()

      const selectedMethod = currentContract.methods.filter((e) => {
        return e.name === `vote_${method}`
      })

      atc.addMethodCall({
        appID: appId,
        method: selectedMethod[0],
        methodArgs: [{ txn: txn1, signer: peraSign }],
        sender: myAddress,
        signer: peraSign,
        suggestedParams
      })
      const result = await atc.execute(algodex.algod, 4)
      console.log(result)
      setVoted(true)
      readGlobalState(appId, myAddress)
    } catch (error) {
      console.log("Couldn't sign asset transfer txns", error)
    }
  }
  async function getTotalHolders() {
    let assetId = getActiveNetwork() === 'testnet' ? 95999794 : 724480511
    const minBalance = 10000000000
    const assetBalances = await algodex.indexer
      .lookupAssetBalances(assetId)
      .currencyGreaterThan(minBalance)
      .limit(9999)
      .do()
    setTotalHolders(assetBalances.balances.length)
  }
  return {
    globalState,
    readGlobalState,
    checkAssetBalance,
    assetBalance,
    voted,
    decimals,
    voteSubmit,
    active,
    assetId,
    getTotalHolders,
    totalHolders
  }
}
export default useVoteSubmit
