/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Box, Typography } from '@mui/material'
import { copyAddress, truncatedWalletAddress } from 'components/helpers'
import { filter, find } from 'lodash'
import { useContext, useMemo, useState } from 'react'

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
import { WalletsContext } from '@/hooks/useWallets'
import { mdiChevronDown } from '@mdi/js'
import styled from '@emotion/styled'
import { useAlgodex } from '@algodex/algodex-hooks'

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
  // const { addresses, wallet, signedIn } = useWalletMgmt()
  const { wallet, isConnected } = useAlgodex()
  const [addresses] = useContext(WalletsContext)
  // const { addresses, wallet } = useAlgodex()
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
          <Box className="px-2 py-4 bg-gray-600">
            <WalletOptionsList />
          </Box>
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
          <Box className="bg-gray-700">
            <DropdownBody
              activeWalletAddress={wallet?.address}
              sortedWalletsList={sortedWalletsList}
            />
          </Box>
          <DropdownFooter />
        </ModalContainer>
      </Modal>
    )
  }

  const renderAssets = (assets, address) => {
    return assets?.map((asset, idx) => {
      return (
        <Box
          key={idx}
          className={`${wallet.address !== address && 'opacity-40'} flex justify-between  my-2`}
        >
          <Typography>{asset['asset-id']}</Typography>
          <Typography>{asset.amount}</Typography>
        </Box>
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
            <Box
              key={idx}
              // className="font-medium w-full flex justify-between my-2"
              className={`${
                wallet.address !== addr.address && 'opacity-40'
              } font-medium w-full flex justify-between my-2`}
            >
              <Box className="flex items-center">
                <Icon
                  color="gray"
                  fillGradient="000"
                  onClick={() => copyAddress(addr.address)}
                  use="wallet"
                  size={0.75}
                />
                &nbsp;
                <Typography className="text-sm text-white">
                  {truncatedWalletAddress(addr.address, 4)}
                </Typography>
              </Box>
              <Box className="flex items-center">
                <Typography>{addr.amount}</Typography>&nbsp;
                <Icon color="gray" fillGradient="000" use="algoLogo" size={0.625} />
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                height: '7rem',
                overflowY: 'scroll'
              }}
            >
              {renderAssets(addr.assets, addr.address)}
            </Box>
            <Button
              className="w-full flex text-xs font-bold justify-center items-center h-8 mt-2 text-white"
              variant="outlined"
              sx={{ border: 'solid 1px' }}
              onClick={() => setIsDisconnectingWallet(true)}
            >
              DISCONNECT A WALLET
            </Button>
          </AccordionDetails>
        </Accordion>
      )
    })
  }

  return (
    <>
      {/* {signedIn && ( */}
      <Container>
        <Box style={{ height: '100%' }} className="flex justify-between flex-col px-3">
          <Box>
            <Box>
              <Box className="flex flex-col justify-between">
                <Button
                  className="w-full flex text-xs font-bold justify-center items-center bg-gray-700 h-8 mt-2 text-white rounded"
                  variant="contained"
                  onClick={() => setIsConnectingWallet(true)}
                >
                  CONNECT {isConnected && addresses && addresses.length > 0 && 'ANOTHER'} WALLET
                </Button>
              </Box>
            </Box>
            <Box>
              <Box className="flex justify-between text-sm mt-4">
                <Typography variant="label_regular" color="gray.500">
                  WALLET NAME
                </Typography>
                <Typography variant="label_regular" color="gray.500">
                  BALANCE
                </Typography>
              </Box>
              {(!addresses || !addresses.length > 0) && (
                <Box className="flex justify-center">
                  <Typography
                    variant="label_regular_bold"
                    color="gray.300"
                    className="text-center mt-8 w-9/12"
                  >
                    No wallets connected yet. <br />
                    Connect a wallet with the button above.
                  </Typography>
                </Box>
              )}
              {isConnected && addresses && addresses.length > 0 && renderWalletAddresses()}
            </Box>
          </Box>
          <Box className="flex">
            <Typography
              variant="body_small_medium"
              color="gray.100"
              className="text-center mb-4 px-4"
            >
              Active wallet is in white. Tap on an additional wallet to switch it to active. Tap on
              arrow to expand list and see current holdings.
            </Typography>
          </Box>
        </Box>
        {renderWalletOptionsList()}
        {renderAddressesList()}
      </Container>
      {/* )} */}
    </>
  )
}

MobileWalletRender.propTypes = {
  //   closeDropdown: PropTypes.func
}

export default MobileWalletRender
