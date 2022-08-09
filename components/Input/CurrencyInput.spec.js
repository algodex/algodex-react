import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
import CurrencyInput from './CurrencyInput'

expect.extend(matchers)

describe('Currency Input', () => {
  it('Component should be visible when passed a label', () => {
    const { queryByTestId } = render(<CurrencyInput label="test" />)
    // expect(queryByTestId('Checkbox')).toHaveStyle('letter-spacing: 0.025rem')
    expect(queryByTestId('currency-input')).toBeVisible()

    // expect(queryByTestId('AssetName-element')).not.toHaveStyle('letter-spacing: 0')
  })
})
