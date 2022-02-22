import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
import { AssetId } from './Typography'
import { AssetName } from './Typography'

expect.extend(matchers)

describe('AssetName', () => {
  it('Text should have accurate letter spacing', () => {
    const { queryByTestId } = render(
      <AssetName data-testid="AssetName-element">hello world</AssetName>
    )
    expect(queryByTestId('AssetName-element')).toHaveStyle('letter-spacing', '0.025rem')
    expect(queryByTestId('AssetName-element')).not.toHaveStyle('letter-spacing', '0')
  })
})

describe('AssetId', () => {
  it('Text should have a unique font size', () => {
    const { queryByTestId } = render(<AssetId data-testid="AssetId-element">#98848</AssetId>)
    expect(queryByTestId('AssetId-element')).toHaveStyle('font-size', '0.625rem')
  })
})
