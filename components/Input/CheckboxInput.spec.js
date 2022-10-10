import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
import CheckboxInput from './CheckboxInput'

expect.extend(matchers)

describe('Checkbox Input', () => {
  it('Component should be visible when checked', () => {
    const { queryByTestId } = render(<CheckboxInput isChecked={true} />)
    // expect(queryByTestId('Checkbox')).toHaveStyle('letter-spacing: 0.025rem')
    expect(queryByTestId('checkbox')).toBeVisible()

    // expect(queryByTestId('AssetName-element')).not.toHaveStyle('letter-spacing: 0')
  })
  it('Component should not visible when not checked', () => {
    const { queryByTestId } = render(<CheckboxInput isChecked={false} />)
    // expect(queryByTestId('Checkbox')).toHaveStyle('letter-spacing: 0.025rem')
    expect(queryByTestId('checkbox')).toBeVisible()

    // expect(queryByTestId('AssetName-element')).not.toHaveStyle('letter-spacing: 0')
  })
})
