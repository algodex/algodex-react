import React from 'react'
import renderer from 'react-test-renderer'
import Chart from '.'

it('Chart: default', () => {
  const component = renderer.create(< Chart />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
