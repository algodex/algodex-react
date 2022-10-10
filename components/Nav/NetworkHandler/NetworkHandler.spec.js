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

import { fireEvent, render } from 'test/test-utils'

import NetworkBanner from './NetworkBanner'
import NotificationModal from './NotificationModal'
import { matchers } from '@emotion/jest'
import useUserState from '@/store/use-user-state'

expect.extend(matchers)

describe.skip('Network Banner Component', () => {
  it('Should render Banner for Testnet', () => {
    function NetworkBannerTest() {
      const setHasTestnetRibbon = useUserState((state) => state.setHasTestnetRibbon)
      setHasTestnetRibbon(true)
      return <NetworkBanner />
    }
    const { queryByTestId } = render(<NetworkBannerTest />)
    expect(queryByTestId('banner-container')).not.toBeNull()
    fireEvent.click(queryByTestId('banner-close-btn'))
    expect(queryByTestId('banner-container')).toBeNull()
  })

  it('Should render Banner for Mainnet', () => {
    function NetworkBannerTest() {
      const setActiveNetwork = useUserState((state) => state.setActiveNetwork)
      const setHasMainnetRibbon = useUserState((state) => state.setHasMainnetRibbon)
      setHasMainnetRibbon(true)
      setActiveNetwork('mainnet')
      return <NetworkBanner />
    }
    const { queryByTestId } = render(<NetworkBannerTest />)
    expect(queryByTestId('banner-container')).not.toBeNull()
    fireEvent.click(queryByTestId('banner-close-btn'))
    expect(queryByTestId('banner-container')).toBeNull()
  })
})

describe('Notification Modal Component', () => {
  it('Should not render Network notification Modal', () => {
    const { queryByTestId } = render(
      <NotificationModal isModalActive={false} content={<div>Hello World</div>} />
    )
    expect(queryByTestId('notification-modal-wrapper')).toBeNull()
  })
  it.skip('Should render Network notification Modal', async () => {
    const { queryByTestId } = render(
      <NotificationModal
        isModalActive={true}
        content={{ linkAddressOne: 'https://google.com', linkAddressTwo: 'https://google.com' }}
      />
    )
    const result = queryByTestId('notification-modal-wrapper')
    expect(result).not.toBeNull()
  })
})
