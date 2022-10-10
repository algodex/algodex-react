import MenuButton from './index'
import React from 'react'
import renderer from 'react-test-renderer'

it.skip('MenuButton: default', () => {
  const component = renderer.create(<MenuButton />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
