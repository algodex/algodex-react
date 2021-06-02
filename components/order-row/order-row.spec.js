import React from 'react'
import renderer from 'react-test-renderer'
import OrderRow from '.'

it('OrderRow: default', () => {
  const component = renderer.create(< OrderRow />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
