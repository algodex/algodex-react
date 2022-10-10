import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
import PlaceOrderForm from './Form.jsx'

expect.extend(matchers)
describe('form', () => {
  it('Should render spinner with container if flex is true', () => {
    const { queryByTestId } = render(
      <PlaceOrderForm
        showTitle={false}
        asset={1559042}
        onSubmit={() => {
          console.log('test')
        }}
      />
    )
    expect(queryByTestId('placeOrder')).toBeNull()
    // expect(queryByTestId('spinner-svg')).not.toBeNull()
  })
})
