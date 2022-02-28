import Page from './Page'
import { matchers } from '@emotion/jest'
import { render } from '@/test/test-utils'
import { AssetData } from '../spec/Asset'
expect.extend(matchers)
jest.mock('next/dist/client/router', () => require('next-router-mock'))
describe('Page', () => {
  it('should render a page', () => {
    const { queryByTestId } = render(
      <Page title="Test" staticExplorerAsset={AssetData}>
        {() => <div>Testing</div>}
      </Page>
    )
    expect(queryByTestId('page-layout')).not.toBeNull()
  })
})
