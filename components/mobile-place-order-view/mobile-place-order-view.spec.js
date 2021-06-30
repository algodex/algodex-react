import React from 'react'
import renderer from 'react-test-renderer'
import MobilePlaceOrder from '.'

it('MobilePlaceOrder: default', () => {
  const component = renderer.create(< MobilePlaceOrder />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
