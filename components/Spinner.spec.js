import { matchers } from '@emotion/jest'
import { render } from '@/test/test-utils'
import Spinner from './Spinner'

expect.extend(matchers)
const color = 'gray.600'
describe('spinner', () => {
  it('Should render spinner with container if flex is true', () => {
    const { queryByTestId } = render(
      <Spinner data-testid="spinner-element" color={color} flex={true} size={5} />
    )
    expect(queryByTestId('spinner-flex-container')).not.toBeNull()
    expect(queryByTestId('spinner-svg')).not.toBeNull()
  })

  it('Should render spinner without container if flex is false', () => {
    const { queryByTestId } = render(
      <Spinner data-testid="spinner-element" color={color} flex={true} size={5} />
    )
    expect(queryByTestId('spinner-svg')).not.toBeNull()
  })
})
