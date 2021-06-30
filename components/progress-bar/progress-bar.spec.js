import React from 'react'
import { render } from '../../test/test-utils'
import ProgressBar from '.'

describe('Progress Bar', () => {
  it('should render a progress bar', () => {
    const { queryByTestId } = render(<ProgressBar value={10} max={100} type="BUY" />)
    expect(queryByTestId('progress-bar')).not.toBeNull()
  })
  it('should display the correct percentage', () => {
    const { queryByTestId } = render(<ProgressBar value={10} max={100} type="BUY" />)
    expect(queryByTestId('percent-text')).toHaveTextContent('10.00%')
  })
})
