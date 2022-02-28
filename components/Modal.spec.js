import { matchers } from '@emotion/jest'
import { render } from '@/test/test-utils'
import ModalWrapper from './Modal'

expect.extend(matchers)
describe('ModalWrapper', () => {
  it('Should render modal with backdrop', () => {
    const { queryByTestId } = render(
      <ModalWrapper data-testid="ModalWrapper-element" hideBackdrop={false} isVisible={true}>
        <div data-testid="modal-element" style={{ backgroundColor: 'none' }}>
          Hello
        </div>
      </ModalWrapper>
    )
    expect(queryByTestId('modal-element')).not.toBeNull()
    expect(queryByTestId('modal-element')).toHaveStyle({ 'background-color': 'none' })
  })

  it('Should render modal without backdrop', () => {
    const { queryByTestId } = render(
      <ModalWrapper data-testid="ModalWrapper-element" hideBackdrop={true} isVisible={true}>
        <div data-testid="modal-element" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></div>
      </ModalWrapper>
    )
    expect(queryByTestId('modal-element')).toHaveStyle({
      'background-color': 'rgba(0, 0, 0, 0.7)'
    })
  })
})
