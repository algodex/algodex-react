import { fireEvent, render } from 'test/test-utils'

import NetworkBanner from './NetworkBanner'
// import NetworkNotificationModal from './NetworkNotificationModal'
// import NotificationModal from './NotificationModal'
import { matchers } from '@emotion/jest'
import useUserState from '@/store/use-user-state'

expect.extend(matchers)
jest.mock('next-translate/useTranslation', () => require('next-translate'))

describe('Network Notification Modal Component', () => {
  it('Should render ', () => {})
})

describe('Network Banner Component', () => {
  it('Should render Banner', () => {
    function NetworkBannerTest() {
      const setHasTestnetRibbon = useUserState((state) => state.setHasTestnetRibbon)
      setHasTestnetRibbon(true)
      return <NetworkBanner />
    }
    const { queryByTestId } = render(<NetworkBannerTest />)
    expect(queryByTestId('banner-container')).not.toBeNull()
    fireEvent.click(queryByTestId('banner-close-btn'))
    // expect(queryByTestId('banner-container')).toBeNull()
  })
})
describe('Notification Modal Component', () => {
  it('Should render InfoFlyover Component', () => {})
})
