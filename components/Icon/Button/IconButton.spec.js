import IconButton from './IconButton'
import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'

expect.extend(matchers)
describe('Icon Button', () => {
  it('Should render icon with the right props', () => {
    const { queryByTestId } = render(
      <IconButton color="gray" gradient={900} fillGradient={500} icon="Info" size="500" />
    )
    expect(queryByTestId('info-icon')).toHaveStyleRule('color', '#171923')
    expect(queryByTestId('info-icon')).not.toHaveStyleRule('color', '700')
    expect(queryByTestId('info-icon')).toHaveStyleRule('height', '500')
    expect(queryByTestId('info-icon')).toHaveStyleRule('width', '500')
  })

  it('Should render correct icon', () => {
    const { queryByTestId } = render(
      <IconButton color="red" gradient={900} fillGradient={500} icon="Info" size="500" />
    )
    expect(queryByTestId('info-icon')).toHaveStyleRule('height', '500')
    // expect(queryByTestId('info-icon')).toHaveStyleRule('width', '500')
  })
})
