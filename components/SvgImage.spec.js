import SvgImage from './SvgImage'
import { matchers } from '@emotion/jest'
import { render } from '@/test/test-utils'

expect.extend(matchers)
describe('Icon Button', () => {
  it('Should render an SVG Image if the type is provided', () => {
    const { queryByTestId } = render(<SvgImage use="verified" data-testid="svg-image-icon" />)
    expect(queryByTestId('svg-image-icon')).not.toBeNull()
  })

  it('Should not SVG Image when a wrong type is provided', () => {
    const { queryByTestId } = render(<SvgImage use="verify" data-testid="svg-image-icon" />)
    expect(queryByTestId('svg-image-icon')).toBeNull()
  })

  it('Should render SVG Images using the right props', () => {
    const { queryByTestId } = render(
      <SvgImage color="gray.600" use="verified" w={3} h={2} data-testid="svg-image-icon" />
    )
    expect(queryByTestId('svg-image-icon')).toHaveStyleRule('height', '2rem')
    expect(queryByTestId('svg-image-icon')).toHaveStyleRule('width', '3rem')
    expect(queryByTestId('svg-image-icon')).toHaveStyleRule('color', '#4A5568')
  })
})
