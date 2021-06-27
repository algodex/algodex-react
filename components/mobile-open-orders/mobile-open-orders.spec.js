import React from 'react'
import renderer from 'react-test-renderer'
import MobileOpenOrders from '.'

it('MobileOpenOrders: default', () => {
  const component = renderer.create(< MobileOpenOrders />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
