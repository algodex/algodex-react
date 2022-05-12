import { copyAddress, truncatedWalletAddress } from 'components/helpers'
import { filter, find } from 'lodash'
import { useMemo, useState } from 'react'
import AccordionDetails from '@mui/material/AccordionDetails'
import Button from '@mui/material/Button'
import DropdownBody from './DropdownBody'
import DropdownFooter from './DropdownFooter'
import DropdownHeader from './DropdownHeader'
import Icon from 'components/Icon/Icon'
import MaterialIcon from '@mdi/react'
import Modal from 'components/Modal'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
// import PropTypes from 'prop-types'
import WalletOptionsList from './WalletOptionsList'
import { mdiChevronDown } from '@mdi/js'
import styled from '@emotion/styled'
import { useAlgodex } from '@algodex/algodex-hooks'
import { Typography } from '@mui/material'

const Container = styled.div`
  width: 100%;
`

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  backgroundColor: 'unset',
  position: 'unset',
  transition: 'margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  borderRadius: 0,
  color: 'white',
  padding: 'unset'
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary disableGutters elevation={0} square {...props} />
))(() => ({
  margin: 'unset',
  minHeight: 'unset',
  padding: 'unset',
  '& .MuiAccordionSummary-content': {
    margin: 'unset',
    minHeight: 'unset',
    padding: 'unset'
  }
}))

const ModalContainer = styled.div`
  transform: translate(-50%, -50%);
  @media (max-width: 992px) {
    width: 90%;
    transform: translate(-50%, -65%);
    overflow-y: auto;
    max-height: 100%;
  }
`

const MobileWalletRender = () => {
  const { addresses, wallet } = useAlgodex()
  const [expanded, setExpanded] = useState(false)
  const [isConnectingWallet, setIsConnectingWallet] = useState(false)
  const [isDisconnectingWallet, setIsDisconnectingWallet] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const sortedWalletsList = useMemo(() => {
    if (addresses) {
      const activeWallet = find(addresses, (o) => o.address === wallet?.address)
      const inactiveWallet = filter(addresses, (o) => o.address !== wallet?.address)
      return {
        activeWallet,
        inactiveWallet
      }
    }
  }, [addresses, wallet])

  const renderWalletOptionsList = () => {
    return (
      <Modal
        onClick={() => {
          setIsConnectingWallet(false)
        }}
        data-testid="notification-modal-wrapper"
        isVisible={isConnectingWallet}
      >
        <ModalContainer
          className="absolute top-2/4 left-2/4 bg-gray-700 text-white rounded-sm"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <DropdownHeader closeFn={() => setIsConnectingWallet(false)} />
          <div className="px-2 py-4 bg-gray-600">
            <WalletOptionsList />
          </div>
          <DropdownFooter />
        </ModalContainer>
      </Modal>
    )
  }

  const renderAddressesList = () => {
    return (
      <Modal
        onClick={() => {
          setIsDisconnectingWallet(false)
        }}
        data-testid="notification-modal-wrapper"
        isVisible={isDisconnectingWallet}
      >
        <ModalContainer
          className="absolute top-2/4 left-2/4 text-white bg-gray-700 rounded-lg"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <DropdownHeader closeFn={() => setIsDisconnectingWallet(false)} />
          <div className="bg-gray-700">
            <DropdownBody
              activeWalletAddress={wallet?.address}
              sortedWalletsList={sortedWalletsList}
            />
          </div>
          <DropdownFooter />
        </ModalContainer>
      </Modal>
    )
  }

  const renderAssets = (assets, address) => {
    return assets?.map((asset, idx) => {
      return (
        <div
          key={idx}
          className={`${wallet.address !== address && 'opacity-40'} flex justify-between  my-2`}
        >
          <div>{asset['asset-id']}</div>
          <div>{asset.amount}</div>
        </div>
      )
    })
  }
  const renderWalletAddresses = () => {
    return addresses.map((addr, idx) => {
      return (
        <Accordion key={idx} expanded={expanded === idx} onChange={handleChange(idx)}>
          <AccordionSummary
            expandIcon={
              <MaterialIcon
                path={mdiChevronDown}
                title="Copy Address"
                size={0.8}
                className="cursor-pointer"
                color="#FFFFFF"
              />
            }
            aria-controls={addr.address}
            id={idx}
          >
            <div
              key={idx}
              className={`${
                wallet.address !== addr.address && 'opacity-40'
              } font-medium w-full flex justify-between my-2`}
            >
              <div className="flex items-center">
                <Icon
                  color="gray"
                  fillGradient="000"
                  onClick={() => copyAddress(addr.address)}
                  use="wallet"
                  size={0.75}
                />
                &nbsp;
                <div className="text-sm text-white">{truncatedWalletAddress(addr.address, 4)}</div>
              </div>
              <div className="flex items-center">
                <div>{addr.amount}</div>&nbsp;
                <Icon color="gray" fillGradient="000" use="algoLogo" size={0.625} />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>{renderAssets(addr.assets, addr.address)}</AccordionDetails>
        </Accordion>
      )
    })
  }

  return (
    <Container>
      <div style={{ height: '100%' }} className="flex justify-between flex-col px-3">
        <div>
          <div>
            <div className="flex flex-col justify-between">
              <Button
                className="w-full flex text-xs font-bold justify-center items-center bg-gray-700 h-8 mt-2 text-white rounded"
                variant="contained"
                onClick={() => setIsConnectingWallet(true)}
              >
                CONNECT {addresses && addresses.length > 0 && 'ANOTHER'} WALLET
              </Button>
              {addresses && addresses.length > 0 && (
                <Button
                  className="w-full flex text-xs font-bold justify-center items-center bg-gray-700 h-8 mt-2 text-white rounded"
                  variant="contained"
                  onClick={() => setIsDisconnectingWallet(true)}
                >
                  DISCONNECT A WALLET
                </Button>
              )}
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mt-4">
              <p>WALLET NAME</p>
              <p>BALANCE</p>
            </div>
            {(!addresses || !addresses.length > 0) && (
              <div>
                <p className="text-sm text-center mt-8 font-medium text-white">
                  No wallets connected yet. <br />
                  Connect a wallet with the button above.
                </p>
              </div>
            )}
            {addresses && addresses.length > 0 && renderWalletAddresses()}
          </div>
        </div>
        <div>
          <p className="text-sm text-center mb-4 px-4">
            Active wallet is in white. Tap on an additional wallet to switch it to active. Tap on
            arrow to expand list and see current holdings.
          </p>
        </div>
      </div>
      {renderWalletOptionsList()}
      {renderAddressesList()}
    </Container>
  )
}

MobileWalletRender.propTypes = {
  //   closeDropdown: PropTypes.func
}

export default MobileWalletRender
