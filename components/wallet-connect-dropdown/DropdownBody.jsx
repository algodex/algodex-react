import { mdiContentCopy, mdiOpenInNew } from '@mdi/js'
import Image from 'next/image'
import Icon from '@mdi/react'
// import PropTypes from 'prop-types'
import theme from '../../theme'

const DropdownBody = () => {
  const renderWalletOptionList = () => {
    return (
      <div
        className="text-xs text-white rounded p-2"
        style={{
          backgroundColor: theme.colors.gray['500']
        }}
      >
        <p className="font-semibold mb-2">CONNECT A WALLET</p>
        <div className="mt-4 ml-4">
          <div className="flex items-center mb-2">
            <Image
              src="/Official-Algo-Wallet-icon.svg"
              alt="Algorand Wallet"
              width={25}
              height={25}
            />
            <p className="ml-2 font-medium underline">Algorand Mobile Wallet</p>
          </div>
          <div className="flex items-center mb-2">
            <Image src="/My-Algo-Wallet-icon.svg" alt="Algorand Wallet" width={25} height={25} />
            <p className="ml-2 font-medium underline">My Algo Wallet</p>
          </div>
        </div>
      </div>
    )
  }
  const renderActiveWalletList = () => {
    return (
      <div>
        <p className="text-white font-medium mb-2 text-xs">ACTIVE WALLET</p>
        <div className="text-white">
          <div
            className="p-2 text-xs rounded shadow"
            style={{
              backgroundColor: 'rgba(113, 128, 150, 0.1)'
            }}
          >
            <div className="flex justify-between items-center">
              <div className="flex item-center border-solid border rounded justify-between w-4/5 p-1.5">
                <p>AH8TJX78TG2P....Q235FRTK90LP</p>
                <Icon
                  path={mdiContentCopy}
                  title="Copy Address"
                  size={0.8}
                  className="cursor-pointer"
                  color="#FFFFFF"
                />
              </div>
              <div
                className="rounded ml-2 p-2 font-semibold"
                style={{
                  background: theme.colors.gray['700']
                }}
              >
                DISCONNECT
              </div>
            </div>
            <div className="flex justify-end items-center text-white mr-10 mt-3 font-medium">
              <p>View on AlgoExplorer</p>
              <Icon
                path={mdiOpenInNew}
                title="Algo explorer link"
                size={0.8}
                className="cursor-pointer"
                color="#FFFFFF"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSwitchWalletAddress = () => {
    return (
      <div
        style={{
          backgroundColor: theme.colors.gray['700'],
          marginTop: '0.5rem',
          padding: '0.5rem',
          fontSize: '12px',
          borderRadius: '4px',
          color: 'white'
        }}
      >
        <div>
          <p
            style={{
              fontWeight: 'bold',
              fontSize: '14px',
              marginBottom: '0.3rem'
            }}
          >
            SWITCH WALLETS
          </p>
          <p>Click on address to switch active wallets</p>
        </div>
        <div>
          <div style={{ marginTop: '1rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: 'solid 1px',
                  padding: '0.3rem',
                  borderRadius: '4px',
                  width: '80%',
                  justifyContent: 'space-between'
                }}
              >
                <p>AH8TJX78TG2P....Q235FRTK90LP</p>
                <Icon
                  path={mdiContentCopy}
                  title="Copy Address"
                  size={0.8}
                  className="cursor-pointer"
                  color="#FFFFFF"
                />
              </div>
              <div
                style={{
                  borderRadius: '4px',
                  marginLeft: '0.5rem',
                  background: theme.colors.gray['700'],
                  padding: '0.5rem',
                  fontWeight: 'bold'
                }}
              >
                DISCONNECT
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                color: 'white',
                marginRight: '10%',
                marginTop: '2%'
              }}
            >
              <p>View on AlgoExplorer</p>
              <Icon
                path={mdiOpenInNew}
                title="Algo explorer link"
                size={0.8}
                className="cursor-pointer"
                color="#FFFFFF"
              />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: 'solid 1px',
                  padding: '0.3rem',
                  borderRadius: '4px',
                  width: '80%',
                  justifyContent: 'space-between'
                }}
              >
                <p>AH8TJX78TG2P....Q235FRTK90LP</p>
                <Icon
                  path={mdiContentCopy}
                  title="Copy Address"
                  size={0.8}
                  className="cursor-pointer"
                  color="#FFFFFF"
                />
              </div>
              <div
                style={{
                  borderRadius: '4px',
                  marginLeft: '0.5rem',
                  background: theme.colors.gray['700'],
                  padding: '0.5rem',
                  fontWeight: 'bold'
                }}
              >
                DISCONNECT
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                color: 'white',
                marginRight: '10%',
                marginTop: '2%'
              }}
            >
              <p>View on AlgoExplorer</p>
              <Icon
                path={mdiOpenInNew}
                title="Algo explorer link"
                size={0.8}
                className="cursor-pointer"
                color="#FFFFFF"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        backgroundColor: theme.colors.gray['600'],
        padding: '0.5rem'
      }}
    >
      {false && renderWalletOptionList()}
      {false && renderActiveWalletList()}
      {renderSwitchWalletAddress()}
      {false && (
        <div
          style={{
            backgroundColor: theme.colors.gray['700'],
            height: '2rem',
            display: 'flex',
            fontSize: '12px',
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '4px',
            marginTop: '0.5rem',
            color: 'white'
          }}
        >
          CONNECT ANOTHER WALLET
        </div>
      )}
    </div>
  )
}

export default DropdownBody
