import PriceHeader from './PriceHeader'
import { matchers } from '@emotion/jest'
import { render } from '@/test/test-utils'

expect.extend(matchers)

describe('Price Header Component', () => {
  it('Should render Table Price Header', () => {
    const { queryByTestId } = render(<PriceHeader />)
    expect(queryByTestId('header-item')).not.toBeNull()
  })
})
