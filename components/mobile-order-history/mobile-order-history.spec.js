import React from 'react'
import renderer from 'react-test-renderer'
import MobileOrderHistory from '.'

it('MobileOrderHistory: default', () => {
  const component = renderer.create(< MobileOrderHistory />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
