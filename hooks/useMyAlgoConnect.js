import { useEffect, useRef } from 'react'
import algosdk from 'algosdk'
import { assignGroups, groupBy } from '@algodex/algodex-sdk/lib/functions/base'

const ERROR = {
  FAILED_TO_INIT: 'MyAlgo Wallet failed to initialize.',
  FAILED_TO_CONNECT: 'MyAlgo Wallet failed to connect.'
}

/**
 * useMyAlgoConnect
 * @return {WalletEffect}
 */
export default function useMyAlgoConnect(onConnect, onDisconnect) {
  // Instance reference
  const myAlgoWallet = useRef()
  /**
   * MyAlgoConnect Signer
   *
   * @todo move to SDK
   * @param outerTxns
   * @return {Promise<*>}
   */
  async function signer(outerTxns) {
    console.debug('inside signMyAlgoTransactions transactions')
    const groups = groupBy(outerTxns, 'groupNum')

    const numberOfGroups = Object.keys(groups)

    const groupedGroups = numberOfGroups.map((group) => {
      const allTxFormatted = groups[group].map((txn) => {
        return txn.unsignedTxn
      })
      assignGroups(allTxFormatted)
      return allTxFormatted
    })

    const flattenedGroups = groupedGroups.flat()

    const txnsForSig = []
    function isUserSigned(outerTxn) {
      return typeof outerTxn.lsig === 'undefined' && typeof outerTxn.senderAcct !== 'undefined'
    }
    for (let i = 0; i < outerTxns.length; i++) {
      outerTxns[i].unsignedTxn = flattenedGroups[i]
      if (isUserSigned(outerTxns[i])) {
        txnsForSig.push(flattenedGroups[i].toByte())
      }
    }

    const signedTxnsFromUser = await this.signTransaction(txnsForSig)

    if (Array.isArray(signedTxnsFromUser)) {
      let userSigIndex = 0
      for (let i = 0; i < outerTxns.length; i++) {
        if (isUserSigned(outerTxns[i])) {
          outerTxns[i].signedTxn = signedTxnsFromUser[userSigIndex].blob
          userSigIndex++
        }
      }
    } else {
      for (let i = 0; i < outerTxns.length; i++) {
        if (isUserSigned(outerTxns[i])) {
          outerTxns[i].signedTxn = signedTxnsFromUser.blob
          break
        }
      }
    }

    for (let i = 0; i < outerTxns.length; i++) {
      if (!isUserSigned(outerTxns[i])) {
        const signedLsig = algosdk.signLogicSigTransactionObject(
          outerTxns[i].unsignedTxn,
          outerTxns[i].lsig
        )
        outerTxns[i].signedTxn = signedLsig.blob
      }
    }
    return outerTxns.map((o) => o.signedTxn)
  }

  const connect = async () => {
    try {
      // Something went wrong!
      if (!myAlgoWallet.current) {
        console.error(ERROR.FAILED_TO_INIT)
        return
      }

      // Get Accounts from MyAlgo
      const accounts = await myAlgoWallet.current.connect()

      // Map the connector to the address list
      const _addresses = accounts.map((acct) => {
        acct.type = 'my-algo-wallet'
        acct.connector = myAlgoWallet.current
        acct.connector.connected = true
        return acct
      })
      console.debug('Setting Address form myAlgoConnect', _addresses)
      // Set Addresses
      onConnect(_addresses)
    } catch (e) {
      console.error(ERROR.FAILED_TO_CONNECT, e)
    }
  }

  const disconnect = () => {
    // setAddresses(
    //   algodex.addresses.filter((addr) => addr.type !== 'my-algo-wallet'),
    //   { merge: false, validate: false }
    // )
    // if (algodex.addresses.length) {
    //   setWallet(algodex.addresses[0], { validate: false, merge: true })
    // }
  }

  useEffect(() => {
    const initMyAlgoWallet = async () => {
      // '@randlabs/myalgo-connect' is imported dynamically
      // because it uses the window object
      const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
      MyAlgoConnect.prototype.sign = signer
      // TODO: get signer from SDK
      // MyAlgoConnect.prototype.sign = await import(
      //   '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
      // )
      myAlgoWallet.current = new MyAlgoConnect()
      myAlgoWallet.current.connected = false
    }

    initMyAlgoWallet()
  }, [])

  return { connect, disconnect, onDisconnect, connector: myAlgoWallet.current }
}
