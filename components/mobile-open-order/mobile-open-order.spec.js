import React from 'react'
import renderer from 'react-test-renderer'
import MobileOpenOrder from '.'

it('MobileOpenOrder: default', () => {
  const component = renderer.create(< MobileOpenOrder />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
