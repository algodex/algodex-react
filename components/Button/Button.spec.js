import Button from './Button'
import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'

expect.extend(matchers)

describe('Button', () => {
  it('Should show button as block', () => {
    const { queryByTestId } = render(
      <Button data-testid="button-element" block="primary">
        hello world
      </Button>
    )
    expect(queryByTestId('button-element')).toHaveStyleRule('display', 'block')
    expect(queryByTestId('button-element')).not.toHaveStyleRule('display', 'flex')
  })
})
