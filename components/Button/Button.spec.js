import Button from './Button'
import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'

expect.extend(matchers)

describe.skip('Button', () => {
  it('Should show button as block', () => {
    const { queryByTestId } = render(
      <Button data-testid="button-element" block="primary">
        Example component
      </Button>
    )
    expect(queryByTestId('button-element')).toHaveStyleRule('display', 'block')
    expect(queryByTestId('button-element')).not.toHaveStyleRule('display', 'flex')
  })
})
