// import { Box, Button } from '@mui/material'
// import { useContext, useEffect, useMemo, useRef, useState } from 'react'
// import useWallets, { WalletsContext } from '@/hooks/useWallets'

// import DropdownFooter from '@/components/Wallet/Connect/WalletDropdown/DropdownFooter'
// import DropdownHeader from '@/components/Wallet/Connect/WalletDropdown/DropdownHeader'
// import Modal from 'components/Modal'
// import PropTypes from 'prop-types'
// import { Section } from '@/components/Layout/Section'
// import Typography from '@mui/material/Typography'
// import WalletOptionsList from '@/components/Wallet/Connect/WalletDropdown/WalletOptionsList'
// import WalletsList from './WalletConnect/WalletsList'
// // import { difference } from 'lodash'
// import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
// import styled from '@emotion/styled'
// import useAccountsInfo from '@/hooks/useAccountsInfo'
// import { useAlgodex } from '@algodex/algodex-hooks'
// import { useEventDispatch } from '@/hooks/useEvents'
// import useMobileDetect from '@/hooks/useMobileDetect'
// import useTranslation from 'next-translate/useTranslation'

// const Container = styled.div`
//   flex: 1 1 0%;
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
//   background-color: ${({ theme }) => theme.palette.background.dark};
//   padding: 0rem 0 1rem;
//   @media (max-width: 1024px) {
//     // height: 70vh;
//   }
// `

// const ModalContainer = styled.div`
//   transform: translate(-50%, -50%);
//   @media (max-width: 992px) {
//     width: 90%;
//     transform: translate(-50%, -65%);
//     overflow-y: auto;
//     max-height: 100%;
//   }
// `

// const EmptyState = styled.div`
//   position: relative;
//   flex: 1 1 0%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 1.25rem 1.125rem;
//   text-align: center;
// `

// const gridStyles = `
//   grid-template-columns: repeat(2, 1fr);
//   column-gap: 0.25rem;
// `

// const Header = styled.header`
//   flex-shrink: 0%;
//   display: grid;
//   ${gridStyles}
//   padding: 0 1.125rem 0.25rem;
//   margin-top: 1.5rem;
// `

// const Wallets = styled.div`
//   flex: 1 1 0%;
//   position: relative;
//   overflow-y: auto;
//   ::-webkit-scrollbar {
//     width: 5px;
//     height: 5px;
//   }
//   ::-webkit-scrollbar-track {
//     background: ${({ theme }) => theme.palette.gray[700]};
//   }
//   ::-webkit-scrollbar-thumb {
//     background: ${({ theme }) => theme.palette.gray[600]};
//     border-radius: 3px;
//   }
//   ::-webkit-scrollbar-thumb:hover {
//     background: ${({ theme }) => theme.palette.gray[500]};
//   }
//   ::-webkit-scrollbar-corner {
//     background: ${({ theme }) => theme.palette.gray[700]};
//   }
// `

// const WalletsWrapper = styled.div`
//   flex: 1 1 0%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
// `
// export function WalletView(props) {
//   const { activeWallet, signedIn, addresses, setActiveWallet, setAddresses } = props
//   const { t } = useTranslation('wallet')
//   const { wallet: initialState } = useAlgodex()
//   const context = useContext(WalletsContext)
//   const {
//     peraConnector,
//     // myAlgoConnector,
//     peraConnect,
//     peraDisconnect: _peraDisconnect,
//     myAlgoDisconnect: _myAlgoDisconnect
//   } = useWallets()
//   const myAlgoConnector = useRef(null)
//   const dispatcher = useEventDispatch()
//   const myAlgoDisconnect = (targetWallet) => {
//     _myAlgoDisconnect(targetWallet)
//   }

//   const peraDisconnect = (targetWallet) => {
//     _peraDisconnect(targetWallet)
//   }

//   // const myAlgoConnect = () => {
//   //   const mappedAddresses = addresses.map((addr) => {
//   //     if (addr.type === 'my-algo-wallet') {
//   //       return {
//   //         ...addr,
//   //         connector: myAlgoConnector.current
//   //       }
//   //     } else {
//   //       return addr
//   //     }
//   //   })
//   //   setAddresses(mappedAddresses)
//   //   dispatcher('signIn', { type: 'wallet' })
//   // }

//   // const walletReconnectorMap = {
//   //   'my-algo-wallet': () => myAlgoConnect(),
//   //   'wallet-connect': () => peraConnect()
//   // }

//   const walletDisconnectMap = {
//     'my-algo-wallet': (wallet) => {
//       myAlgoDisconnect(wallet)
//     },
//     'wallet-connect': (wallet) => peraDisconnect(wallet)
//   }

//   const isWalletActive = (addr) => {
//     return activeWallet?.address === addr
//   }

//   const isTabbable = (addr) => {
//     return isWalletActive(addr) ? -1 : 0
//   }

//   const handleWalletClick = async (addr) => {
//     const _addr = {
//       ...addr,
//       connector: addr.type === 'wallet-connect' ? peraConnector.current : myAlgoConnector.current
//     }
//     console.log(_addr, context, 'new address', peraConnector.current)
//     !isWalletActive(addr) && setActiveWallet(_addr)
//   }

//   const walletsQuery = useAccountsInfo(addresses)

//   // useEffect(() => {
//   //   if (walletsQuery.data) {
//   //     const mappedAddresses = addresses.map((wallet, idx) => {
//   //       return { ...wallet, ...walletsQuery.data[idx] }
//   //     })

//   //     setAddresses(mappedAddresses)
//   //     //Below is commented out because setting localstorage breaks with myAlgo Popup
//   //     // localStorage.setItem('addresses', JSON.stringify(mappedAddresses))
//   //   }
//   // }, [walletsQuery.data])

//   // const rehyrdateWallet =
//   //   typeof activeWallet !== 'undefined' && //activeWallet exists &
//   //   typeof activeWallet?.connector?.sign === 'undefined' // does not have a signing method

//   useEffect(() => {
//     const reConnectMyAlgoWallet = async () => {
//       // '@randlabs/myalgo-connect' is imported dynamically
//       // because it uses the window object
//       const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
//       MyAlgoConnect.prototype.sign = signer
//       myAlgoConnector.current = new MyAlgoConnect()
//       myAlgoConnector.current.connected = true
//     }
//     reConnectMyAlgoWallet()
//   }, [])

//   // useEffect(() => {
//   //   if (rehyrdateWallet) {
//   //     walletReconnectorMap[activeWallet.type]
//   //   }
//   // }, [activeWallet])

//   // useEffect(() => {
//   //   if (typeof activeWallet !== 'undefined' && addresses.length > 0) {
//   //     const targetWallet = addresses.filter((addr) => addr.address === activeWallet.address)[0]
//   //     if (typeof targetWallet?.connector?.sign !== 'undefined') {
//   //       setActiveWallet(targetWallet)
//   //     }
//   //   }
//   // }, [addresses])

//   const handleKeyDown = (e, addr) => {
//     if (e.key === 'Enter' || e.key === ' ') {
//       !isWalletActive(addr) && setActiveWallet(addr)
//     }
//   }

//   const getWalletLogo = (wallet) => {
//     if (typeof wallet === 'undefined' || typeof wallet.type === 'undefined') {
//       throw new TypeError('Must have a valid wallet!')
//     }
//     switch (wallet.type) {
//       case 'wallet-connect':
//         return '/Wallet-Connect-icon.svg'
//       case 'my-algo-wallet':
//         return '/My-Algo-Wallet-icon.svg'
//     }
//   }

//   return (
//     <Section area="topRight">
//       <Container>
//         {signedIn ? (
//           <>
//             <Header>
//               <Typography
//                 sx={{
//                   textTransform: 'uppercase'
//                 }}
//                 variant="body_tiny"
//                 color="gray.500"
//               >
//                 {t('wallet')}
//               </Typography>
//               <Typography
//                 sx={{
//                   textTransform: 'uppercase'
//                 }}
//                 variant="body_tiny"
//                 color="gray.500"
//                 textAlign="right"
//               >
//                 {t('balance')}
//               </Typography>
//             </Header>
//             <Wallets>
//               <WalletsWrapper>
//                 <WalletsList
//                   addresses={addresses}
//                   isTabbable={isTabbable}
//                   isWalletActive={isWalletActive}
//                   handleWalletClick={handleWalletClick}
//                   handleKeyDown={handleKeyDown}
//                   getWalletLogo={getWalletLogo}
//                   walletDisconnectMap={walletDisconnectMap}
//                 />
//               </WalletsWrapper>
//             </Wallets>
//           </>
//         ) : (
//           <EmptyState p={3}>
//             {/* <Arrow>
//               <SvgImage use="walletArrow" h={4} color="gray.600" />
//             </Arrow> */}
//             <Typography variant="h5" color="gray.100" m={0} mb={4} className="leading-6">
//               {t('start-by')}
//             </Typography>
//             <Typography variant="subtitle_small" color="gray.500" m={0}>
//               {t('once-connected')}
//             </Typography>
//           </EmptyState>
//         )}
//       </Container>
//     </Section>
//   )
// }

// WalletView.propTypes = {
//   addresses: PropTypes.array.isRequired,
//   setAddresses: PropTypes.func.isRequired,
//   activeWallet: PropTypes.object,
//   signedIn: PropTypes.bool,
//   setActiveWallet: PropTypes.func.isRequired,
//   area: PropTypes.string,
//   setIsConnectingWallet: PropTypes.func,
//   addressesRef: PropTypes.object
// }

// WalletView.defaultProps = {
//   signedIn: false
// }

// export function WalletOptionsListComp(props) {
//   const { setIsConnectingWallet, isConnectingWallet, addresses, setAddresses, addressesRef } = props
//   const { wallet: initialState, isConnected } = useAlgodex()
//   const { peraConnect, myAlgoConnect } = useWallets(initialState)

//   const WALLETS_CONNECT_MAP = {
//     'my-algo-wallet': myAlgoConnect,
//     'pera-connect': () => peraConnect()
//   }

//   const myAlgoOnClick = () => {
//     WALLETS_CONNECT_MAP['my-algo-wallet']()
//   }

//   const peraConnectOnClick = () => {
//     WALLETS_CONNECT_MAP['pera-connect']()
//   }

//   const isPeraConnected = useMemo(() => {
//     if (isConnected) {
//       const peraAddr = isConnected && addresses.filter((addr) => addr.type === 'wallet-connect')
//       return peraAddr.length > 0
//     }
//     return false
//   }, [isConnected, addresses])

//   // useEffect(() => {
//   //   if (!addressesRef.current) {
//   //     // Initialize the ref after first checking to see what is in localStorage
//   //     const storedAddrs = JSON.parse(localStorage.getItem('addresses'))
//   //     if (Array.isArray(storedAddrs) && storedAddrs.length > 0) {
//   //       setAddresses(storedAddrs)
//   //     }
//   //     addressesRef.current = addresses
//   //   }

//   //   const localStorageExists =
//   //     JSON.parse(localStorage.getItem('addresses')) !== null &&
//   //     JSON.parse(localStorage.getItem('addresses')).length > 0

//   //   const addressesExist = typeof addresses !== 'undefined' && addresses.length > 0

//   //   /**
//   //    * I will need more explanation on what this does
//   //    * We are setting addresses that already exists.
//   //    */
//   //   if (localStorageExists && addressesExist) {
//   //     localStorage.setItem('addresses', JSON.stringify(addresses))
//   //   }
//   //   const walletDifference = difference(
//   //     addresses.map((addr) => addr.address),
//   //     addressesRef.current.map((addr) => addr.address)
//   //   )
//   //   if (walletDifference.length > 0) {
//   //     localStorage.setItem('addresses', JSON.stringify(addresses))
//   //     addressesRef.current = addresses
//   //     // closeFn()
//   //   }
//   //   // **Note** Can't put closeFn() in the onClicks because it will closeOut
//   //   // modal before wallet-connect finishes connecting leading to stale state.
//   //   // Creating a ref that persists between renders gives us a way to automatically close out
//   //   // modals only when a new address is added to the addresses array.
//   // }, [addresses, addressesRef, setAddresses])

//   return (
//     <>
//       {isConnectingWallet ? (
//         <Modal
//           onClick={() => {
//             setIsConnectingWallet(false)
//           }}
//           data-testid="notification-modal-wrapper"
//           isVisible={isConnectingWallet}
//         >
//           <ModalContainer
//             className="absolute top-2/4 left-2/4 bg-gray-700 text-white rounded-sm"
//             style={{ transform: 'translate(-50%, -50%)' }}
//           >
//             <DropdownHeader closeFn={() => setIsConnectingWallet(false)} />
//             <Box className="px-2 py-4 bg-gray-600">
//               {/* <WalletOptionsList /> */}
//               <WalletOptionsList
//                 isConnectingAddress={isConnectingWallet}
//                 setIsConnectingAddress={setIsConnectingWallet}
//                 addresses={addresses}
//                 myAlgoOnClick={myAlgoOnClick}
//                 peraConnectOnClick={() => peraConnectOnClick()}
//                 isPeraConnected={isPeraConnected}
//               />
//             </Box>
//             <DropdownFooter />
//           </ModalContainer>
//         </Modal>
//       ) : (
//         <></>
//       )}
//     </>
//   )
// }

// WalletOptionsListComp.propTypes = {
//   setIsConnectingWallet: PropTypes.func,
//   isConnectingWallet: PropTypes.bool,
//   addresses: PropTypes.array,
//   setAddresses: PropTypes.func,
//   addressesRef: PropTypes.object
// }

// /**
//  * @todo Merge WalletView into WalletConnect
//  * @param props
//  * @returns {JSX.Element}
//  * @constructor
//  */
// function WalletConnect() {
//   const { wallet: initialState, setWallet, isConnected } = useAlgodex()
//   const { wallet, addresses: _addresses } = useWallets(initialState)
//   const [addresses, setAddresses] = useContext(WalletsContext)
//   const [signedIn, setSignedIn] = useState(isConnected)
//   const [isConnectingWallet, setIsConnectingWallet] = useState(false)
//   const isMobile = useMobileDetect()
//   const addressesRef = useRef(null)
//   console.log(isConnected, addresses, setAddresses, 'both')
//   useEffect(() => {
//     setSignedIn(isConnected)
//   }, [_addresses, isConnected])

//   return (
//     <Box className="flex flex-col justify-center" width="100%">
//       {isMobile && (
//         <>
//           <WalletOptionsListComp
//             setIsConnectingWallet={setIsConnectingWallet}
//             isConnectingWallet={isConnectingWallet}
//             addresses={addresses}
//             setAddresses={setAddresses}
//             closeFn={() => setIsConnectingWallet(false)}
//             addressesRef={addressesRef}
//           />

//           <Box mx={2}>
//             <Button
//               className="w-full flex text-xs font-bold justify-center items-center bg-gray-700 h-8 mt-2 text-white rounded"
//               variant="contained"
//               sx={{ minHeight: '2.5rem' }}
//               onClick={() => setIsConnectingWallet(true)}
//             >
//               CONNECT {signedIn && addresses && addresses.length > 0 && 'ANOTHER'} WALLET
//             </Button>
//           </Box>
//         </>
//       )}
//       <WalletView
//         addresses={addresses}
//         setAddresses={setAddresses}
//         activeWallet={wallet}
//         signedIn={signedIn}
//         setSignedIn={setSignedIn}
//         setActiveWallet={setWallet}
//         setIsConnectingWallet={setIsConnectingWallet}
//         addressesRef={addressesRef}
//       />
//     </Box>
//   )
// }

// export default WalletConnect

// // import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// // import PropTypes from 'prop-types'
// // import events from '@algodex/algodex-sdk/lib/events'
// // import { isEqual } from 'lodash/lang'
// // import { logInfo } from 'services/logRemote'
// // import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
// // import { useAlgodex } from '@algodex/algodex-hooks'
// // import { useEventDispatch } from './useEvents'
// // import useMyAlgoConnect from './useMyAlgoConnect'
// // import usePeraConnection from './usePeraConnection'
// // import useWalletConnect from './useWalletConnect'

// // /**
// //  *
// //  * @param {Array<Wallet>} a
// //  * @param {Array<Wallet>} b
// //  * @return {Array<Wallet>}
// //  * @private
// //  */
// // function _mergeAddresses(a, b) {
// //   console.log(a, b, 'first')
// //   if (!Array.isArray(a) || !Array.isArray(b)) {
// //     throw new TypeError('Must be an array of addresses!')
// //   }
// //   const map = new Map()
// //   a.forEach((wallet) => map.set(wallet.address, wallet))
// //   b.forEach((wallet) => map.set(wallet.address, { ...map.get(wallet.address), ...wallet }))
// //   return Array.from(map.values())
// // }
// // export const WalletsContext = createContext()
// // export function WalletsProvider({ children }) {
// //   const [addresses, setAddresses] = useState([])
// //   const { connector: walletConnect } = useWalletConnect()
// //   return (
// //     <WalletsContext.Provider value={[addresses, setAddresses, walletConnect]}>
// //       {children}
// //     </WalletsContext.Provider>
// //   )
// // }
// // WalletsProvider.propTypes = {
// //   children: PropTypes.node
// // }
// // /**
// //  * Use Wallets Hooks
// //  * @param {Object} initialState Wallet Initial State
// //  * @return {*}
// //  */
// // function useWallets(initialState) {
// //   const dispatcher = useEventDispatch()
// //   const { connector: walletConnect } = useWalletConnect()
// //   const { connector: myAlgoConnector } = useMyAlgoConnect()
// //   const context = useContext(WalletsContext)
// //   if (context === undefined) {
// //     throw new Error('Must be inside of a Wallets Provider')
// //   }
// //   const [wallet, setWallet] = useState(initialState)
// //   const walletConnection = useMemo(() => context[2], [context])
// //   // console.log(walletConnection, walletConnect, 'asdfkpasdfplija;lkdfa;lksdf;lkasdf;lnk')
// //   // const [activeWallet, setActiveWallet] = useState()
// //   const [addresses, setAddresses] = context

// //   const { http, wallet: _wallet, setWallet: setAlgodexWallet } = useAlgodex()
// //   // console.log(wallet, context, 'wallet here')
// //   const [_mappedAddresses, setMappedAddresses] = useState([])
// //   const onEvents = useCallback(
// //     (props) => {
// //       const { type, wallet: _wallet } = props
// //       if (type === 'change' && !isEqual(wallet, _wallet)) {
// //         setWallet(_wallet)
// //         // setActiveWallet(_wallet.address)
// //       }
// //     },
// //     [setWallet, wallet]
// //   )
// //   useEffect(() => {
// //     events.on('wallet', onEvents)
// //     return () => {
// //       events.off('wallet', onEvents)
// //     }
// //   }, [onEvents])

// //   // Fetch all wallet addresses from local storage
// //   useEffect(() => {
// //     const res = localStorage.getItem('addresses')
// //     if (res) {
// //       // const _addresses = _mergeAddresses(JSON.parse(localStorage.getItem('addresses')), addresses)
// //       if (initialState !== undefined) {
// //         console.log(initialState, 'iitialState')
// //         setAlgodexWallet(initialState)
// //       }
// //       // setAddresses(_addresses)
// //     }
// //   }, [])

// //   /**
// //    * Get Hydrated Addresses
// //    * Ensures addresses are properly Hydrated at all times
// //    */
// //   useEffect(() => {
// //     const res = localStorage.getItem('addresses')
// //     // Check if addresses exist in local storage
// //     if (res && res.length) {
// //       const _reHydratedWallet = async () => {
// //         // '@randlabs/myalgo-connect' is imported dynamically
// //         // because it uses the window object
// //         const myAlgoConnector = {}
// //         const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
// //         MyAlgoConnect.prototype.sign = signer
// //         myAlgoConnector.current = new MyAlgoConnect()
// //         myAlgoConnector.current.connected = true
// //         const mappedAddresses = JSON.parse(res).map((addr) => {
// //           if (addr.type === 'my-algo-wallet') {
// //             return {
// //               ...addr,
// //               connector: myAlgoConnector.current
// //             }
// //           } else {
// //             return {
// //               ...addr,
// //               connector: walletConnection.current
// //             }
// //           }
// //         })
// //         console.log(mappedAddresses, 'mapped addresses')
// //         localStorage.setItem('addresses', JSON.stringify(mappedAddresses))
// //         setAddresses(mappedAddresses)
// //       }
// //       _reHydratedWallet()
// //     } else {
// //       localStorage.setItem('addresses', JSON.stringify([]))
// //       setAddresses([])
// //     }
// //   }, [walletConnection])

// //   /**
// //    * Update Addresses from local storage
// //    * Update Addresses when rehydration happes
// //    */
// //   useEffect(() => {
// //     console.log(addresses, 'addresses updated')
// //   }, [addresses])

// //   /**
// //    * Update wallet or active wallet
// //    * Ensure rehydration is active on wallet
// //    */
// //   const updateActiveWallet = useCallback(() => {}, [wallet])

// //   /**
// //    * Remove wallet from addresses list
// //    * Ensure rehydration is not lost
// //    */
// //   const removeWallet = useCallback(() => {}, [])

// //   // useEffect(() => {
// //   //   // Fetch Addresses from local storage
// //   //   const res = localStorage.getItem('addresses')
// //   //   // Check if addresses exist in local storage
// //   //   if (res && res.length) {
// //   //     const _reHydratedWallet = async () => {
// //   //       // '@randlabs/myalgo-connect' is imported dynamically
// //   //       // because it uses the window object
// //   //       const myAlgoConnector = {}
// //   //       const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
// //   //       MyAlgoConnect.prototype.sign = signer
// //   //       myAlgoConnector.current = new MyAlgoConnect()
// //   //       myAlgoConnector.current.connected = true
// //   //       const mappedAddresses = JSON.parse(res).map((addr) => {
// //   //         if (addr.type === 'my-algo-wallet') {
// //   //           return {
// //   //             ...addr,
// //   //             connector: myAlgoConnector.current
// //   //           }
// //   //         } else {
// //   //           return {
// //   //             ...addr,
// //   //             connector: walletConnect.current
// //   //           }
// //   //         }
// //   //       })
// //   //       console.log(mappedAddresses, 'mapped addresses')
// //   //       localStorage.setItem('addresses', JSON.stringify(mappedAddresses))
// //   //       setAddresses(mappedAddresses)
// //   //     }
// //   //     _reHydratedWallet()
// //   //   } else {
// //   //     localStorage.setItem('addresses', JSON.stringify([]))
// //   //     setAddresses([])
// //   //   }
// //   // }, [myAlgoConnector, walletConnect.current])

// //   useEffect(() => {
// //     if (addresses.length > 0) {
// //       let _activeWallet = { ...addresses[0] }

// //       const _reHydratedWallet = async () => {
// //         const myAlgoConnector = {}
// //         const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
// //         MyAlgoConnect.prototype.sign = signer
// //         myAlgoConnector.current = new MyAlgoConnect()
// //         myAlgoConnector.current.connected = true
// //         const mappedAddresses = [_activeWallet].map((addr) => {
// //           if (addr.type === 'my-algo-wallet') {
// //             return {
// //               ...addr,
// //               connector: myAlgoConnector.current
// //             }
// //           } else {
// //             return {
// //               ...addr,
// //               connector: walletConnect.current
// //             }
// //           }
// //         })
// //         if (typeof wallet === 'undefined') {
// //           if (
// //             _activeWallet.type === 'wallet-connect' &&
// //             _activeWallet?.connector?.connected === false
// //           ) {
// //             console.log(_wallet, walletConnect, 'ew to set')
// //             setAlgodexWallet(mappedAddresses[0])
// //           }
// //           if (
// //             _activeWallet.type === 'my-algo-wallet' &&
// //             _activeWallet?.connector?.connected === false
// //           ) {
// //             setAlgodexWallet(mappedAddresses[0])
// //           }
// //         }
// //       }
// //       _reHydratedWallet()
// //     }
// //   }, [addresses, walletConnect])

// //   // TODO: Account Info Query
// //   // Handle any Connection
// //   const handleConnect = useCallback(
// //     async (_addresses) => {
// //       if (_addresses.length > 0) {
// //         console.log(_addresses, 'new address')
// //         logInfo('Handling Connect')
// //         const sameWalletClient = addresses.filter((wallet) => wallet.type === _addresses[0].type)
// //         const otherWalletClients =
// //           addresses.filter((wallet) => wallet.type !== _addresses[0].type) || []

// //         const accounts = await http.indexer.fetchAccounts(_addresses)
// //         const mergedPrivateAddresses = _mergeAddresses(_addresses, accounts)
// //         console.log(accounts, mergedPrivateAddresses, 'alls direasses')
// //         // Get data to populate
// //         // Merge to existing data
// //         // Update local storage
// //         // Update addresses list
// //         if (sameWalletClient.length > _addresses.length) {
// //           // disconnect even occured for atleast one address
// //           console.log(
// //             _mergeAddresses(otherWalletClients, mergedPrivateAddresses),
// //             'furst kubj nerged'
// //           )
// //           setAddresses(_mergeAddresses(otherWalletClients, mergedPrivateAddresses))
// //           localStorage.setItem(
// //             'addresses',
// //             JSON.stringify(_mergeAddresses(otherWalletClients, mergedPrivateAddresses))
// //           )
// //           const _allAddresses = _mergeAddresses(otherWalletClients, mergedPrivateAddresses)
// //           if (_allAddresses.length > 0) {
// //             setAlgodexWallet(_allAddresses[0])
// //           }
// //         } else {
// //           const allAddresses = _mergeAddresses(addresses, _mergeAddresses(_addresses, accounts))
// //           const _otherAddresses = JSON.parse(localStorage.getItem('addresses'))
// //           const _allAddresses = _mergeAddresses(_otherAddresses || [], allAddresses)
// //           // const _allAddresses = _mergeAddresses(_otherAddresses || [], allAddresses).map(
// //           //   (wallet) => {
// //           //     if (wallet.type === 'wallet-connect' && walletConnect.current.connected) {
// //           //       console.log(wallet, _addresses, walletConnect, 'wallet connect ooo')
// //           //       return {
// //           //         ...wallet,
// //           //         connector: _addresses.connector
// //           //       }
// //           //     }
// //           //     return wallet
// //           //   }
// //           // )
// //           if (_allAddresses.length > 0) {
// //             setAlgodexWallet(_allAddresses[0])
// //           }
// //           console.log(
// //             _mergeAddresses(otherWalletClients, mergedPrivateAddresses),
// //             _allAddresses,
// //             'second slintt kubj nerged'
// //           )
// //           setAddresses(_allAddresses)
// //           localStorage.setItem('addresses', JSON.stringify(_allAddresses))
// //         }
// //         dispatcher('signIn', { type: 'wallet' })
// //       }
// //     },
// //     [setAddresses]
// //   )

// //   // Handle any Disconnect
// //   const handleDisconnect = useCallback(
// //     (_addresses) => {
// //       const remainingAddresses =
// //         JSON.parse(localStorage.getItem('addresses')).filter((wallet) => {
// //           if (_addresses && _addresses[0]) {
// //             return wallet.address !== _addresses[0]
// //           }
// //         }) || []
// //       let _remainingAddresses = [...remainingAddresses]
// //       if (_remainingAddresses.length > 0) {
// //         _remainingAddresses = _remainingAddresses.map((wallet) => {
// //           console.log(wallet, 'wallet ooo hsdfsse')
// //           if (wallet.type === 'wallet-connect') {
// //             return {
// //               ...wallet,
// //               connector: {
// //                 ...walletConnect.current,
// //                 ...wallet.connector,
// //                 _accounts: wallet.connector._accounts,
// //                 _connected: wallet.connector._connected,
// //                 connected: wallet.connector._connected
// //               }
// //             }
// //           }
// //           return wallet
// //         })
// //         console.log(_remainingAddresses[0], 'okay thak you ooo')
// //         // setAlgo dexWallet(_remainingAddresses[0])
// //       } else {
// //         console.log(wallet, 'wallet udpate oo', 'disconnectedActiveWallet sdfs')
// //         if (typeof wallet !== 'undefined') {
// //           let disconnectedActiveWallet = {}
// //           if (wallet.type === 'wallet-connect') {
// //             disconnectedActiveWallet = {
// //               ...wallet,
// //               connector: {
// //                 ...walletConnect.current,
// //                 _connected: false,
// //                 connected: false
// //               }
// //             }
// //           } else {
// //             disconnectedActiveWallet = {
// //               ...wallet,
// //               connector: {
// //                 ...wallet.connector,
// //                 connected: false
// //               }
// //             }
// //           }
// //           console.log(disconnectedActiveWallet, 'disconnectedActiveWallet sdfs')
// //           // setAlgodexWallet(disconnectedActiveWallet)
// //         }
// //       }

// //       logInfo(
// //         `Disconnected Successfully with : ${_addresses} removed and ${_remainingAddresses.length} remaining`
// //       )
// //       console.log(_remainingAddresses, 'again end')
// //       localStorage.setItem('addresses', JSON.stringify(_remainingAddresses))
// //       setAddresses(_remainingAddresses)
// //       dispatcher('signOut', { type: 'wallet' })
// //       console.error('Handle removing from storage', _addresses)
// //     },
// //     [setAddresses]
// //   )

// //   const sessionUpdate = useCallback(
// //     (addresses) => {
// //       const _updatedAddresses = addresses.map((wallet) => {
// //         return {
// //           ...wallet,
// //           connector: {
// //             connected: true
// //           }
// //         }
// //       })
// //       console.log('addresses after session update', addresses)
// //     },
// //     [setAddresses]
// //   )

// //   // My Algo Connect/Disconnect
// //   const { connect: myAlgoConnect, disconnect: myAlgoDisconnect } = useMyAlgoConnect(
// //     handleConnect,
// //     handleDisconnect
// //   )
// //   // My Algo/Disconnect
// //   const {
// //     connect: peraConnect,
// //     disconnect: peraDisconnect,
// //     connector: _peraConnector
// //   } = useWalletConnect(handleConnect, handleDisconnect, sessionUpdate)
// //   // Pera Connect/Disconnect

// //   const { connect: peraConnectOriginal, disconnect: peraDisconnectOriginal } = usePeraConnection(
// //     handleConnect,
// //     handleDisconnect,
// //     sessionUpdate
// //   )

// //   return {
// //     wallet: _wallet,
// //     setWallet: setAlgodexWallet,
// //     addresses,
// //     myAlgoConnect,
// //     peraConnect: peraConnectOriginal,
// //     peraDisconnect: peraDisconnectOriginal,
// //     // peraConnect,
// //     // peraDisconnect,
// //     myAlgoDisconnect,
// //     myAlgoConnector,
// //     peraConnector: _peraConnector
// //   }
// // }

// // export default useWallets

// // // Handle any Disconnect
// // const handleDisconnect = useCallback(
// //   (_addresses) => {
// //     console.log(_addresses, 'address to disconnect')
// //     const remainingAddresses =
// //       JSON.parse(localStorage.getItem('addresses')).filter((wallet) => {
// //         if (_addresses && _addresses[0]) {
// //           return wallet.address !== _addresses[0]
// //         }
// //       }) || []
// //     console.log(remainingAddresses, 'remainingAddresses')
// //     if (typeof wallet !== 'undefined') {
// //       let disconnectedActiveWallet = {}
// //       disconnectedActiveWallet = {
// //         ...wallet,
// //         connector: {
// //           ...wallet.connector,
// //           connected: false
// //         }
// //       }
// //       console.log(disconnectedActiveWallet, 'disconnectedActiveWallet sdfs')
// //       setAddresses([])
// //       localStorage.setItem('addresses', JSON.stringify([]))
// //       setAlgodexWallet(disconnectedActiveWallet)
// //       return
// //     }
// //     // }

// //     logInfo(
// //       `Disconnected Successfully with : ${_addresses} removed and ${remainingAddresses.length} remaining`
// //     )
// //     console.log(remainingAddresses, 'again end')
// //     localStorage.setItem('addresses', JSON.stringify(remainingAddresses))
// //     setAddresses(remainingAddresses)
// //     dispatcher('signOut', { type: 'wallet' })
// //     console.error('Handle removing from storage', _addresses)
// //   },
// //   [setAddresses]
// // )

// import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// import PropTypes from 'prop-types'
// import events from '@algodex/algodex-sdk/lib/events'
// import { isEqual } from 'lodash/lang'
// import { logInfo } from 'services/logRemote'
// import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
// import { useAlgodex } from '@algodex/algodex-hooks'
// import { useEventDispatch } from './useEvents'
// import useMyAlgoConnect from './useMyAlgoConnect'
// import usePeraConnection from './usePeraConnection'
// import useWalletConnect from './useWalletConnect'

// /**
//  *
//  * @param {Array<Wallet>} a
//  * @param {Array<Wallet>} b
//  * @return {Array<Wallet>}
//  * @private
//  */
// function _mergeAddresses(a, b) {
//   console.log(a, b, 'first')
//   if (!Array.isArray(a) || !Array.isArray(b)) {
//     throw new TypeError('Must be an array of addresses!')
//   }
//   const map = new Map()
//   a.forEach((wallet) => map.set(wallet.address, wallet))
//   b.forEach((wallet) => map.set(wallet.address, { ...map.get(wallet.address), ...wallet }))
//   return Array.from(map.values())
// }
// export const WalletsContext = createContext()
// export function WalletsProvider({ children }) {
//   const [addresses, setAddresses] = useState([])
//   const { connector: walletConnect } = useWalletConnect()
//   return (
//     <WalletsContext.Provider value={[addresses, setAddresses, walletConnect]}>
//       {children}
//     </WalletsContext.Provider>
//   )
// }
// WalletsProvider.propTypes = {
//   children: PropTypes.node
// }
// /**
//  * Use Wallets Hooks
//  * @param {Object} initialState Wallet Initial State
//  * @return {*}
//  */
// function useWallets(initialState) {
//   const dispatcher = useEventDispatch()
//   const { connector: myAlgoConnector } = useMyAlgoConnect()
//   const context = useContext(WalletsContext)
//   const { peraWalletConnector } = usePeraConnection()
//   if (context === undefined) {
//     throw new Error('Must be inside of a Wallets Provider')
//   }
//   const [wallet, setWallet] = useState(initialState)
//   const [addresses, setAddresses] = context

//   const { http, wallet: _wallet, setWallet: setAlgodexWallet } = useAlgodex()

//   const onEvents = useCallback(
//     (props) => {
//       const { type, wallet: _wallet } = props
//       if (type === 'change' && !isEqual(wallet, _wallet)) {
//         setWallet(_wallet)
//         // setActiveWallet(_wallet.address)
//       }
//     },
//     [setWallet, wallet]
//   )
//   useEffect(() => {
//     events.on('wallet', onEvents)
//     return () => {
//       events.off('wallet', onEvents)
//     }
//   }, [onEvents])

//   // Fetch all wallet addresses from local storage
//   useEffect(() => {
//     const res = localStorage.getItem('addresses')
//     if (res) {
//       // const _addresses = _mergeAddresses(JSON.parse(localStorage.getItem('addresses')), addresses)
//       if (initialState !== undefined) {
//         console.log(initialState, 'iitialState')
//         setAlgodexWallet(initialState)
//       }
//       // setAddresses(_addresses)
//     }
//   }, [])

//   /**
//    * Get Hydrated Addresses
//    * Ensures addresses are properly Hydrated at all times
//    */
//   useEffect(() => {
//     const res = localStorage.getItem('addresses')
//     // Check if addresses exist in local storage
//     if (res && res.length) {
//       const _reHydratedWallet = async () => {
//         // '@randlabs/myalgo-connect' is imported dynamically
//         // because it uses the window object
//         const myAlgoConnector = {}
//         const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
//         MyAlgoConnect.prototype.sign = signer
//         myAlgoConnector.current = new MyAlgoConnect()
//         myAlgoConnector.current.connected = true
//         const mappedAddresses = JSON.parse(res).map((addr) => {
//           if (addr.type === 'my-algo-wallet') {
//             return {
//               ...addr,
//               connector: myAlgoConnector.current
//             }
//           } else {
//             return addr
//           }
//         })
//         console.log(mappedAddresses, 'mapped addresses')
//         localStorage.setItem('addresses', JSON.stringify(mappedAddresses))
//         setAddresses(mappedAddresses)
//       }
//       _reHydratedWallet()
//     }
//     //  else {
//     //   localStorage.setItem('addresses', JSON.stringify([]))
//     //   setAddresses([])
//     // }
//   }, [])

//   /**
//    * Update Addresses from local storage
//    * Update Addresses when rehydration happes
//    */
//   useEffect(() => {
//     console.log(addresses, 'addresses updated')
//   }, [addresses])

//   useEffect(() => {
//     if (addresses.length > 0) {
//       let _activeWallet = { ...addresses[0] }

//       const _reHydratedWallet = async () => {
//         const myAlgoConnector = {}
//         const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
//         MyAlgoConnect.prototype.sign = signer
//         myAlgoConnector.current = new MyAlgoConnect()
//         myAlgoConnector.current.connected = true
//         const mappedAddresses = [_activeWallet].map((addr) => {
//           if (addr.type === 'my-algo-wallet') {
//             return {
//               ...addr,
//               connector: myAlgoConnector.current
//             }
//           }
//         })
//         if (typeof wallet === 'undefined') {
//           setAlgodexWallet(mappedAddresses[0])
//           // if (
//           //   _activeWallet.type === 'wallet-connect'
//           // ) {
//           //   setAlgodexWallet(mappedAddresses[0])
//           // }
//           // if (
//           //   _activeWallet.type === 'my-algo-wallet' &&
//           //   _activeWallet?.connector?.connected === false
//           // ) {
//           //   setAlgodexWallet(mappedAddresses[0])
//           // }
//         }
//       }
//       _reHydratedWallet()
//     }
//   }, [addresses])

//   // TODO: Account Info Query
//   // Handle any Connection
//   const handleConnect = useCallback(
//     async (_addresses) => {
//       if (_addresses.length > 0) {
//         console.log(_addresses, 'new address')
//         logInfo('Handling Connect')
//         const sameWalletClient = addresses.filter((wallet) => wallet.type === _addresses[0].type)
//         const otherWalletClients =
//           addresses.filter((wallet) => wallet.type !== _addresses[0].type) || []

//         const accounts = await http.indexer.fetchAccounts(_addresses)
//         const mergedPrivateAddresses = _mergeAddresses(_addresses, accounts)
//         console.log(accounts, mergedPrivateAddresses, 'alls direasses')
//         // Get data to populate
//         // Merge to existing data
//         // Update local storage
//         // Update addresses list
//         if (sameWalletClient.length > _addresses.length) {
//           // disconnect even occured for atleast one address
//           console.log(
//             _mergeAddresses(otherWalletClients, mergedPrivateAddresses),
//             'furst kubj nerged'
//           )
//           setAddresses(_mergeAddresses(otherWalletClients, mergedPrivateAddresses))
//           localStorage.setItem(
//             'addresses',
//             JSON.stringify(_mergeAddresses(otherWalletClients, mergedPrivateAddresses))
//           )
//           const _allAddresses = _mergeAddresses(otherWalletClients, mergedPrivateAddresses)
//           if (_allAddresses.length > 0) {
//             setAlgodexWallet(_allAddresses[0])
//           }
//         } else {
//           const allAddresses = _mergeAddresses(addresses, _mergeAddresses(_addresses, accounts))
//           const _otherAddresses = JSON.parse(localStorage.getItem('addresses'))
//           // const _allAddresses = _mergeAddresses(_otherAddresses || [], allAddresses)
//           const _allAddresses = _mergeAddresses(_otherAddresses || [], allAddresses).map(
//             (wallet) => {
//               if (wallet.type === 'wallet-connect') {
//                 console.log(wallet, _addresses, 'wallet connect ooo')
//                 return {
//                   ...wallet,
//                   connector: peraWalletConnector.connector
//                 }
//               }
//               return wallet
//             }
//           )
//           if (_allAddresses.length > 0) {
//             setAlgodexWallet(_allAddresses[0])
//           }
//           console.log(
//             _mergeAddresses(otherWalletClients, mergedPrivateAddresses),
//             _allAddresses,
//             'second slintt kubj nerged'
//           )
//           setAddresses(_allAddresses)
//           localStorage.setItem('addresses', JSON.stringify(_allAddresses))
//         }
//         dispatcher('signIn', { type: 'wallet' })
//       }
//     },
//     [setAddresses, peraWalletConnector]
//   )

//   // Handle any Disconnect
//   const handleDisconnect = useCallback(
//     (_addresses) => {
//       const locStorageAddr = JSON.parse(localStorage.getItem('addresses'))
//       const addressesList = locStorageAddr.length > 0 ? locStorageAddr : addresses || []
//       console.log(addressesList, _addresses, 'addressesList')
//       const remainingAddresses =
//         addressesList.filter((wallet) => {
//           console.log(wallet, 'wallet outside')
//           if (_addresses && _addresses[0]) {
//             console.log(
//               wallet.address,
//               _addresses[0],
//               wallet.address !== _addresses[0],
//               'wallet inside'
//             )
//             // if (wallet.address !== _addresses[0]) {
//             //   return wallet
//             // }
//             return wallet.address !== _addresses[0]
//           }
//         }) || []
//       let _remainingAddresses = [...remainingAddresses]
//       console.log(_remainingAddresses, remainingAddresses, '_remainingAddresses')
//       if (_remainingAddresses.length > 0) {
//         _remainingAddresses = _remainingAddresses.map((wallet) => {
//           console.log(wallet, 'wallet ooo hsdfsse')
//           if (wallet.type === 'wallet-connect') {
//             return {
//               ...wallet,
//               connector: {
//                 ...wallet.connector,
//                 _accounts: wallet.connector._accounts,
//                 _connected: wallet.connector._connected,
//                 connected: wallet.connector._connected
//               }
//             }
//           }
//           return wallet
//         })
//         console.log(_remainingAddresses[0], 'okay thak you ooo')
//         setAlgodexWallet(_remainingAddresses[0])
//       } else {
//         const _wallet = addressesList[0]
//         console.log(
//           wallet,
//           addressesList,
//           _remainingAddresses,
//           'wallet udpate oo',
//           'disconnectedActiveWallet sdfs'
//         )
//         // if (typeof wallet !== 'undefined') {
//         let disconnectedActiveWallet = {}
//         if (wallet.type === 'wallet-connect') {
//           disconnectedActiveWallet = {
//             ..._wallet,
//             connector: null
//           }
//         } else {
//           disconnectedActiveWallet = {
//             ..._wallet,
//             connector: null
//           }
//         }
//         console.log(disconnectedActiveWallet, 'new to discover sdfs')
//         setAlgodexWallet(disconnectedActiveWallet)
//         // } else {
//         //   console.log(wallet, 'unndefied wallet')
//         //   // setAlgodexWallet()
//         // }
//       }

//       logInfo(
//         `Disconnected Successfully with : ${_addresses} removed and ${_remainingAddresses.length} remaining`
//       )
//       console.log(_remainingAddresses, 'again end')
//       localStorage.setItem('addresses', JSON.stringify(_remainingAddresses))
//       setAddresses(_remainingAddresses)
//       dispatcher('signOut', { type: 'wallet' })
//       console.error('Handle removing from storage', _addresses)
//     },
//     [setAddresses]
//   )

//   const sessionUpdate = useCallback(
//     (addresses) => {
//       const _updatedAddresses = addresses.map((wallet) => {
//         return {
//           ...wallet,
//           connector: {
//             connected: true
//           }
//         }
//       })
//       console.log('addresses after session update', addresses)
//     },
//     [setAddresses]
//   )

//   // My Algo Connect/Disconnect
//   const { connect: myAlgoConnect, disconnect: myAlgoDisconnect } = useMyAlgoConnect(
//     handleConnect,
//     handleDisconnect
//   )
//   // My Algo/Disconnect
//   const {
//     connect: peraConnect,
//     disconnect: peraDisconnect,
//     connector: _peraConnector
//   } = useWalletConnect(handleConnect, handleDisconnect, sessionUpdate)
//   // Pera Connect/Disconnect

//   const { connect: peraConnectOriginal, disconnect: peraDisconnectOriginal } = usePeraConnection(
//     handleConnect,
//     handleDisconnect,
//     sessionUpdate
//   )

//   return {
//     wallet: _wallet,
//     setWallet: setAlgodexWallet,
//     addresses,
//     myAlgoConnect,
//     peraConnect: peraConnectOriginal,
//     peraDisconnect: peraDisconnectOriginal,
//     // peraConnect,
//     // peraDisconnect,
//     myAlgoDisconnect,
//     myAlgoConnector,
//     peraConnector: _peraConnector
//   }
// }

// export default useWallets
