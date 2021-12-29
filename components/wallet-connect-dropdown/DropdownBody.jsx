import { mdiContentCopy, mdiOpenInNew } from '@mdi/js'

import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import theme from '../../theme'

const DropdownBody = () => {
  const renderWalletOptionList = () => {
    return (
      <div
        style={{
          padding: '0.5rem',
          fontSize: '12px',
          // backgroundColor: theme.colors.gray['500'],
          backgroundColor: 'rgba(113, 128, 150, 0.1)',
          borderRadius: '4px',
          boxShadow: '0 0 23px -15px #000000'
        }}
      >
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
          <div>
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
                  background: 'black',
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
          <div>CONNECT ANOTHER WALLET</div>
        </div>
      </div>
    )
  }

  const renderActiveWalletList = () => {
    return <div></div>
  }

  return (
    <div
      style={{
        backgroundColor: theme.colors.gray['600'],
        padding: '0.5rem'
      }}
    >
      {renderWalletOptionList()}
      {renderActiveWalletList()}
    </div>
  )
}

export default DropdownBody
