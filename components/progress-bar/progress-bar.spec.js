import React from 'react'
import renderer from 'react-test-renderer'
import ProgressBar from '.'

it('ProgressBar: default', () => {
  const component = renderer.create(< ProgressBar />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
