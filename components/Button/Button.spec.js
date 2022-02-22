import Button from './Button'
import { ThemeProvider } from '@mui/material/styles'
import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
import renderer from 'react-test-renderer'
import theme from '../../theme'

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
