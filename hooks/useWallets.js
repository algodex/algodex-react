import {useMyAlgoConnect,useWalletConnect, useAlgodex} from '@algodex/algodex-hooks';
import {useCallback, useEffect, useState} from 'react';
import {isEqual} from 'lodash/lang';
import events from '@algodex/algodex-sdk/lib/events';
/**
 *
 * @param {Array<Wallet>} a
 * @param {Array<Wallet>} b
 * @return {Array<Wallet>}
 * @private
 */
function _mergeAddresses(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new TypeError('Must be an array of addresses!');
  }
  const map = new Map();
  a.forEach((wallet) => map.set(wallet.address, wallet));
  b.forEach((wallet) => map.set(wallet.address,
      {...map.get(wallet.address), ...wallet},
  ));
  return Array.from(map.values());
}

/**
 * Use Wallets Hooks
 * @param {Object} initialState Wallet Initial State
 * @return {*}
 */
function useWallets(initialState) {
  const [wallet, setWallet] = useState(initialState);
  const [activeWallet, setActiveWallet] = useState();
  const [addresses, setAddresses] = useState([]);
  const {http} = useAlgodex();

  const onEvents = useCallback(
      (props) => {
        const {type, wallet: _wallet} = props;
        if (type === 'change' && !isEqual(wallet, _wallet)) {
          setWallet(_wallet);
          setActiveWallet(_wallet.address);
        }
      },
      [setWallet, wallet],
  );
  useEffect(() => {
    events.on('wallet', onEvents);
    return () => {
      events.off('wallet', onEvents);
    };
  }, [onEvents]);


  const handleConnect = async (_addresses) => {
    const accounts = await http.indexer.fetchAccounts(_addresses);
    debugger;
    console.log(accounts);
    setAddresses(_mergeAddresses(_addresses, accounts));
  }
  // TODO: Account Info Query
  // Handle any Connection
  // const handleConnect = useCallback(
  //     async (_addresses) => {
  //       const accounts = await http.indexer.fetchAccounts(_addresses);
  //       debugger;
  //       console.log(accounts);
  //       setAddresses(_mergeAddresses(_addresses, accounts));
  //     },
  //     [addresses],
  // ); 
  //useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed.
  // If we are changing the dependency in the callback it will not call on first load.
  // It only triggers after the useEffect parses local storage.

  // Handle any Disconnect
  const handleDisconnect = useCallback((_addresses) => {
    console.error('Handle removing from storage', _addresses);
  }, []);

  // My Algo Connect/Disconnect
  const {
    connect: myAlgoConnect,
    disconnect: myAlgoDisconnect,
  } = useMyAlgoConnect(
      handleConnect,
      handleDisconnect,
  );
  // Pera Connect/Disconnect
  const {connect: peraConnect, disconnect: peraDisconnect} = useWalletConnect(
      handleConnect,
      handleDisconnect,
  );

  // Fetch active wallet from local storage
  useEffect(() => {
    const res = localStorage.getItem('activeWallet');
    if (res && res !== activeWallet) {
      setActiveWallet(localStorage.getItem('activeWallet'));
    }
  }, [setActiveWallet]);

  // Fetch all wallet addresses from local storage
  useEffect(() => {
    const res = localStorage.getItem('addresses');
    if (res) {
      setAddresses([JSON.parse(localStorage.getItem('addresses'))]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  return {
    wallet,
    setWallet,
    addresses,
    myAlgoConnect,
    peraConnect,
    peraDisconnect,
    myAlgoDisconnect,
  };
}

export default useWallets;
