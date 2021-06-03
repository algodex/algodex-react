import React from 'react'
import renderer from 'react-test-renderer'
import OrderHistory from '.'

it('OrderHistory: default', () => {
  const component = renderer.create(< OrderHistory />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
