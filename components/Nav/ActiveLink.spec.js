import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
import NavActiveLink from './ActiveLink'

expect.extend(matchers)
jest.mock('next/dist/client/router', () => require('next-router-mock'))

describe('Activelink', () => {
  it('Should render active link', () => {
    const { queryByTestId } = render(
      <NavActiveLink href="/hello" matches={/^\/hello/}>
        <div data-testid="activelink-element">Hello</div>
      </NavActiveLink>
    )
    expect(queryByTestId('activelink-element').textContent).toContain('Hello')
  })
})
