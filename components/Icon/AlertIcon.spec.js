import AlertIcon from './AlertIcon'
import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'

expect.extend(matchers)
describe('Icon Button', () => {
  it('Should render icon with the right props', () => {
    const { queryByTestId } = render(
      <AlertIcon data-testid="alert-icon" color="gray" flex={true} size={10} />
    )
    expect(queryByTestId('alert-icon')).toHaveStyleRule('width', '10rem')
    expect(queryByTestId('alert-icon')).toHaveStyleRule('height', '10rem')
    expect(queryByTestId('alert-icon')).toHaveStyleRule('margin', '0')
  })

  it('Should render icon diffently when flex is set to false', () => {
    const { queryByTestId } = render(
      <AlertIcon data-testid="alert-icon" color="gray" flex={false} size={10} />
    )
    expect(queryByTestId('alert-icon')).toHaveStyleRule('margin', '0 0.5rem 0 0')
  })
})
