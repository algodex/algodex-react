import React from 'react'
import renderer from 'react-test-renderer'
import MobileOrders from '.'

it('MobileOrders: default', () => {
  const component = renderer.create(< MobileOrders />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
