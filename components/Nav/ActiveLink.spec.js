import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
import NavActiveLink from './ActiveLink'

expect.extend(matchers)
jest.mock('next/dist/client/router', () => require('next-router-mock'))
// jest.mock('next/router', () => ({
//   useRouter() {
//     return {
//       route: '/',
//       pathname: '',
//       query: '',
//       asPath: '/hello'
//     }
//   }
// }))

const child = <div>Hello</div>

describe('Activelink', () => {
  it('Should render active link', () => {
    const { queryByTestId } = render(
      <NavActiveLink href="/hello" matches={/^\/hello/} children={child} />
    )
    expect(queryByTestId('activelink-element').textContent()).toInclude(child)
    //         expect(queryByTestId('activelink-element')).toHaveAttribute('href')
    //     expect(queryByTestId('activelink-element')).not.toBeNull()
  })
})
