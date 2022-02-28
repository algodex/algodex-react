import Page from './Page'
import { withQueryClient } from '@/test/test-utils'
import { AssetData } from '../spec/Asset'
jest.mock('next/dist/client/router', () => require('next-router-mock'))

it('should render a page', async () => {
  const { queryByTestId } = withQueryClient(
    <Page title="Test" staticExplorerAsset={AssetData}>
      {() => <div>Testing</div>}
    </Page>
  )
  expect(await queryByTestId('page-layout')).not.toBeNull()
})
