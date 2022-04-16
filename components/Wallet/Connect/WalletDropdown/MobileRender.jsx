import { copyAddress, setExplorerLink, truncatedWalletAddress } from 'components/helpers'
import { mdiChevronDown, mdiChevronUp } from '@mdi/js'

import AccordionDetails from '@mui/material/AccordionDetails'
import Button from '@mui/material/Button'
import DropdownBody from './DropdownBody'
import Icon from 'components/Icon/Icon'
import MaterialIcon from '@mdi/react'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import PropTypes from 'prop-types'
import WalletOptionsList from './WalletOptionsList'
import styled from '@emotion/styled'
import theme from 'theme'
import { useAlgodex } from '@algodex/algodex-hooks'
import { useState } from 'react'

const Container = styled.div`
  width: 100%;
`

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: 'unset',
  position: 'unset',
  transition: 'margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  borderRadius: 0,
  color: 'white',
  padding: 'unset'
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  margin: 'unset',
  minHeight: 'unset',
  padding: 'unset',
  '& .MuiAccordionSummary-content': {
    margin: 'unset',
    minHeight: 'unset',
    padding: 'unset'
  }
}))

const MobileWalletRender = () => {
  const { addresses, wallet } = useAlgodex()
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const renderAssets = () => {}
  const renderWalletAddresses = () => {
    return addresses.map((addr, idx) => {
      return (
        <Accordion key={idx} expanded={expanded === idx} onChange={handleChange(idx)}>
          <AccordionSummary
            expandIcon={
              <MaterialIcon
                // onClick={() => copyAddress(address)}
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
          <AccordionDetails>{truncatedWalletAddress(addr.address, 4)}</AccordionDetails>
        </Accordion>
      )
      // return (
      //   <div
      //     key={idx}
      //     className={`${
      //       wallet.address !== addr.address && 'opacity-40'
      //     } font-medium flex justify-between my-2`}
      //   >
      //     <div className="flex items-center">
      //       <Icon
      //         color="gray"
      //         fillGradient="000"
      //         onClick={() => copyAddress(addr.address)}
      //         use="wallet"
      //         size={0.75}
      //       />
      //       &nbsp;
      //       <div className="text-sm text-white">{truncatedWalletAddress(addr.address, 4)}</div>
      //     </div>
      //     <div className="flex items-center">
      //       <div>{addr.amount}</div>&nbsp;
      //       <Icon color="gray" fillGradient="000" use="algoLogo" size={0.625} />
      //     </div>
      //   </div>
      // )
    })
  }
  return (
    <Container className="flex justify-between flex-col px-3">
      <div>
        <div>
          <div className="flex flex-col justify-between">
            <Button
              className="w-full flex text-xs font-bold justify-center items-center h-8 mt-2 text-white rounded"
              variant="contained"
              style={{
                backgroundColor: theme.colors.gray['700']
              }}
              //   onClick={() => setIsConnectingAddress(!isConnectingAddress)}
            >
              CONNECT WALLET
            </Button>
            <Button
              className="w-full flex text-xs font-bold justify-center items-center h-8 mt-2 text-white rounded"
              variant="contained"
              style={{
                backgroundColor: theme.colors.gray['700']
              }}
              //   onClick={() => setIsConnectingAddress(!isConnectingAddress)}
            >
              DISCONNECT A WALLET
            </Button>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mt-4">
            <p>WALLET NAME</p>
            <p>BALANCE</p>
          </div>
          {(!addresses || !addresses.length) && (
            <div>
              <p className="text-sm text-center mt-4">
                No wallets connected yet. <br />
                Connect a wallet with the button above.
              </p>
            </div>
          )}
          {addresses && addresses.length && renderWalletAddresses()}
        </div>
      </div>
      <div>
        <p className="text-sm text-center mb-4 px-4">
          Active wallet is in white. Tap on an additional wallet to switch it to active. Tap on
          arrow to expand list and see current holdings.
        </p>
      </div>
    </Container>
  )
}

MobileWalletRender.propTypes = {
  //   closeDropdown: PropTypes.func
}

export default MobileWalletRender
