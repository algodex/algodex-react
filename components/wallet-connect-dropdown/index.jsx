import {} from './wallet-connect.css'

import DropdownBody from './DropdownBody'
import DropdownFooter from './DropdownFooter'
import DropdownHeader from './DropdownHeader'

const WalletConnectDropdown = () => {
  return (
    <div className="flex flex-col justify-between">
      <DropdownHeader />
      <DropdownBody />
      <DropdownFooter />
    </div>
  )
}

export default WalletConnectDropdown
