/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
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

import { Box } from '@mui/material'
import DropdownFooter from '@/components/Wallet/Connect/WalletDropdown/DropdownFooter'
import DropdownHeader from '@/components/Wallet/Connect/WalletDropdown/DropdownHeader'
import Modal from 'components/Modal'
import PropTypes from 'prop-types'
import WalletOptionsList from '@/components/Wallet/Connect/WalletDropdown/WalletOptionsList'
import styled from '@emotion/styled'

const ModalContainer = styled.div`
  transform: translate(-50%, -50%);
  @media (max-width: 992px) {
    width: 90%;
    transform: translate(-50%, -65%);
    overflow-y: auto;
    max-height: 100%;
  }
`

export function WalletOptionsMobile({ setIsConnectingWallet, isConnectingWallet }) {
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
          <WalletOptionsList
            isConnectingAddress={isConnectingWallet}
            setIsConnectingAddress={setIsConnectingWallet}
          />
        </Box>
        <DropdownFooter />
      </ModalContainer>
    </Modal>
  )
}

WalletOptionsMobile.propTypes = {
  setIsConnectingWallet: PropTypes.func,
  isConnectingWallet: PropTypes.bool
}

export default WalletOptionsMobile
