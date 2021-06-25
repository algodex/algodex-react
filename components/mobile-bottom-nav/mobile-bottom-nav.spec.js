import React from 'react'
import renderer from 'react-test-renderer'
import MobileBottomNav from '.'

it('MobileBottomNav: default', () => {
  const component = renderer.create(< MobileBottomNav />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
