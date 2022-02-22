import Button from './Button'
import { ThemeProvider } from '@mui/material/styles'
import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
import renderer from 'react-test-renderer'
import theme from '../../theme'

expect.extend(matchers)

describe('Button', () => {
  it('Should show button as block', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Button block="primary">hello world</Button>
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toHaveStyleRule('display', 'block')
  })
})
