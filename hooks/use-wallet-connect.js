import { useState, useEffect, useRef } from 'react'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";

const ERROR = {
  FAILED_TO_INIT: 'MyAlgo Wallet failed to initialize.',
  FAILED_TO_CONNECT: 'MyAlgo Wallet failed to connect.'
}

export default function useWalletConnect() {
  const [walletConnectAddresses, setAddresses] = useState()
  const [walletConnection, setWalletConnection] = useState(null)




  const walletConnect = async () => {
    try {

      const bridge = "https://bridge.walletconnect.org";


      // create new connector
      const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
      // await this.setState({ connector });
      setWalletConnection({ connector })
      // check if already connected

      if (!connector.connected) {
        // create new session
        await connector.createSession();

      }

      // subscribe to events
      await subscribeToEvents({ connector });
    } catch (e) {
      console.error(ERROR.FAILED_TO_CONNECT, e)
    }
  }
  const subscribeToEvents = ({connector}) => {

    // const { connector } = walletConnection
    if (!connector) {
      return;
    }
    connector.on("session_update", async (error, payload) => {
      console.log(`connector.on("session_update")`);
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      onSessionUpdate(accounts, connector)
    });

    connector.on("connect", (error, payload) => {
      console.log(`connector.on("connect")`);

      if (error) {
        throw error;
      }
      onConnect(payload, connector)
    });

    connector.on("disconnect", (error, payload) => {
      console.log(`connector.on("disconnect")`);
      if (error) {
        throw error;
      }
      onDisconnect()
    });

    if (connector.connected) {

      const { accounts } = connector;
      const address = accounts[0];
      setWalletConnection({...walletConnection, connector
      })

      onSessionUpdate(accounts)
    }
    setWalletConnection({ ...walletConnection, connector })

   
  };

  const killSession = async () => {
    const { connector } = walletConnection;
    if (connector) {
      connector.killSession();
    }
    resetApp();
  };

  const onConnect = async (payload, connector) => {
    const { accounts } = payload.params[0];

    const address = accounts[0];
  
   setWalletConnection({...walletConnection, connector});

    setAddresses(accounts[0])
    // getAccountAssets();
  };

  const onDisconnect = async () => {

    resetApp();
  };
  const resetApp = async () => {
  setWalletConnection(null);
  };

  const onSessionUpdate = async (accounts, connector) => {

    const address = accounts[0];
    await setWalletConnection({...walletConnection, address })
   
  };

  return {
    walletConnect,
    walletConnection
  }
}