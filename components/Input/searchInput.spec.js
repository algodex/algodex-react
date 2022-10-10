import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
import SearchInput from './SearchInput'

expect.extend(matchers)

describe('Search Input', () => {
  it('Should be visible when passed initial text and an onchange', () => {
    const { queryByTestId } = render(
      <SearchInput
        initialText="test"
        isActive={true}
        onChange={() => {
          console.log('test')
        }}
      />
    )
    // expect(queryByTestId('Checkbox')).toHaveStyle('letter-spacing: 0.025rem')
    expect(queryByTestId('search-input')).toBeVisible()

    // expect(queryByTestId('AssetName-element')).not.toHaveStyle('letter-spacing: 0')
  })
})
