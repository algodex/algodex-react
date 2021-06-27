import React from 'react'
import renderer from 'react-test-renderer'
import MobileAssets from '.'

it('MobileAssets: default', () => {
  const component = renderer.create(< MobileAssets />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
