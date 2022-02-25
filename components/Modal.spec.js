import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
import ModalWrapper from './Modal'

expect.extend(matchers)
const element = <div></div>
describe('ModalWrapper', () => {
  it('Should render modal with backdrop', () => {
    const { queryByTestId } = render(
      <ModalWrapper
        data-testid="ModalWrapper-element"
        hideBackdrop={false}
        isVisible={true}
        children={element}
      >
        <div data-testid="modal-element" style={{ backgroundColor: 'none' }}>
          Hello
        </div>
      </ModalWrapper>
    )
    expect(queryByTestId('modal-element')).not.toBeNull()
    expect(queryByTestId('modal-element')).toHaveAttribute('style', { backgroundColor: 'none' })
  })

  it('Should render modal without backdrop', () => {
    const { queryByTestId } = render(
      <ModalWrapper
        data-testid="ModalWrapper-element"
        hideBackdrop={true}
        isVisible={true}
        children={element}
      >
        <div data-testid="modal-element" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></div>
      </ModalWrapper>
    )
    expect(queryByTestId('modal-element')).toHaveAttribute('style', {
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
    })
  })
})
