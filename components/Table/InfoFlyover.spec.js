import InfoFlyover from './InfoFlyover'
import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
expect.extend(matchers)

const itemInfo = {
  change: '42.86',
  fullName: 'LudoCoin',
  hasBeenOrdered: true,
  id: 33698417,
  liquidityAlgo: '22314.520143',
  liquidityAsa: '35927.387394',
  name: 'L',
  price: '1.0000',
  verified: false
}

describe('InfoFlyover Component', () => {
  it('Should render InfoFlyover Component', () => {
    const { getByText } = render(
      <InfoFlyover isActive={true} children="ExampleComp" row={itemInfo} /> // eslint-disable-line
    )
    expect(getByText(/ExampleComp/i)).toBeVisible()
  })

  it('Should not render InfoFlyover Component', () => {
    const { queryByText } = render(
      <InfoFlyover isActive={false} children="ExampleComp" row={itemInfo} /> // eslint-disable-line
    )
    expect(queryByText(/ExampleComp/i)).toBeNull()
  })

  it('Should render Nothing Found! when no data is provided', () => {
    const { queryByTestId } = render(<InfoFlyover isActive={false} />)
    expect(queryByTestId('empty-flyover')).not.toBeNull()
  })
})
