import { Info } from 'react-feather'
import Tooltip from './Tooltip'
import { matchers } from '@emotion/jest'
import { render } from '@/test/test-utils'
import styled from '@emotion/styled'

const IconButton = styled.button`
  cursor: pointer;
  pointer-events: all;
  border: none;
  background: transparent;
  margin-left: 0.125rem;
  padding: 0;
  height: 15px;

  svg {
    height: 15px;
    fill: ${({ theme }) => theme.colors.gray[500]};
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`

expect.extend(matchers)
describe('Icon Button', () => {
  it('Should show a control render button', () => {
    const { queryByTestId } = render(
      <Tooltip
        hasRenderButton={true}
        renderButton={(setTriggerRef) => (
          <IconButton ref={setTriggerRef} type="button">
            <Info />
          </IconButton>
        )}
      >
        <div>Tooltip</div>
      </Tooltip>
    )
    expect(queryByTestId('tooltip-component')).toBeNull()
  })

  it('Should render tooltip if set to visible', () => {
    const { queryByTestId } = render(
      <Tooltip
        hasRenderButton={false}
        renderButton={(setTriggerRef) => (
          <IconButton data-testid="render-button" ref={setTriggerRef} type="button">
            <Info />
          </IconButton>
        )}
      >
        <div>Tooltip</div>
      </Tooltip>
    )
    expect(queryByTestId('tooltip-component')).toBeNull()
  })
})
