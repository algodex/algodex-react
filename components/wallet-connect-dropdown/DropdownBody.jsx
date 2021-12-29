import { mdiContentCopy, mdiOpenInNew } from '@mdi/js'

import Icon from '@mdi/react'
// import PropTypes from 'prop-types'
import theme from '../../theme'

const DropdownBody = () => {
  const renderWalletOptionList = () => {
    return (
      <div
        style={{
          fontSize: '12px',
          color: 'white',
          backgroundColor: theme.colors.gray['500'],
          borderRadius: '4px'
        }}
      >
        <p
          style={{
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}
        >
          CONNECT A WALLET
        </p>
        <div style={{ marginLeft: '1rem', marginTop: '1rem' }}>
          <div>
            <p
              style={{
                marginBottom: '0.5rem',
                fontWeight: '500',
                textDecoration: 'underline'
              }}
            >
              Algorand Mobile Wallet
            </p>
          </div>
          <div>
            <p
              style={{
                marginBottom: '0.5rem',
                fontWeight: '500',
                textDecoration: 'underline'
              }}
            >
              My Algo Wallet
            </p>
          </div>
        </div>
      </div>
    )
  }
  const renderActiveWalletList = () => {
    return (
      <div>
        <p
          style={{
            color: 'white',
            fontWeight: '500',
            marginBottom: '0.5rem',
            fontSize: '14px'
          }}
        >
          ACTIVE WALLET
        </p>
        <div style={{ color: 'white' }}>
          <div
            style={{
              padding: '0.5rem',
              fontSize: '12px',
              backgroundColor: 'rgba(113, 128, 150, 0.1)',
              borderRadius: '4px',
              boxShadow: '0 0 23px -15px #000000'
            }}
          >
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
      {renderWalletOptionList()}
      {false && renderActiveWalletList()}
      {false && renderSwitchWalletAddress()}
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
