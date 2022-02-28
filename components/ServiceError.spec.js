import ServiceError from './ServiceError'
import { render } from '@/test/test-utils'

it('Should render flex container', () => {
  const { queryByTestId } = render(<ServiceError flex size={10} message={'Something is up'} />)
  expect(queryByTestId('flex-service')).not.toBeNull()
  expect(queryByTestId('mssg-service')).toBeNull()
})

it('Should render message section', () => {
  const { queryByTestId } = render(<ServiceError size={10} message={'Something is up'} />)
  expect(queryByTestId('mssg-service')).not.toBeNull()
  expect(queryByTestId('flex-service')).toBeNull()
})

it('Should render component with appropriate component props', () => {
  const { queryByTestId } = render(
    <ServiceError size={1.5} color="gray.600" message={'Something is up'} />
  )
  expect(queryByTestId('mssg-service')).toHaveStyleRule('color', '#A1AEC0')
  expect(queryByTestId('mssg-service')).toHaveStyleRule('margin', '0 0 1rem 0')
})

it('Should render component with when color props is less than 300', () => {
  const { queryByTestId } = render(
    <ServiceError size={1.5} color="gray.400" message={'Something is up'} />
  )
  expect(queryByTestId('mssg-service')).toHaveStyleRule('color', '#E2E8F0')
})
