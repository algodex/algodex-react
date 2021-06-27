import React from 'react'
import renderer from 'react-test-renderer'
import MobileAsset from '.'

it('MobileAsset: default', () => {
  const component = renderer.create(< MobileAsset />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
