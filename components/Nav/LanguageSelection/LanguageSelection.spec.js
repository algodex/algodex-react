import { fireEvent, render } from 'test/test-utils'

import LanguageSelection from './LanguageSelection'
import { matchers } from '@emotion/jest'

expect.extend(matchers)

jest.mock('next/dist/client/router', () => require('next-router-mock'))

describe('Language Selection Component', () => {
  it('Should render Language Selection dropdown on click for mobile', () => {
    const { queryByTestId } = render(<LanguageSelection isMobile={true} />)
    fireEvent.click(queryByTestId('dropdown-button-mobile'))
    expect(queryByTestId('dropdown-container-mobile')).not.toBeNull()
  })

  it('Should render Language Selection dropdown on click for Web', () => {
    const { queryByTestId } = render(<LanguageSelection isMobile={false} />)
    fireEvent.click(queryByTestId('dropdown-button-web'))
    expect(queryByTestId('dropdown-container-web')).not.toBeNull()
  })
})
