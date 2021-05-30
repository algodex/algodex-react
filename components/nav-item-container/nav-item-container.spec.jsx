import React from 'react'
import renderer from 'react-test-renderer'
import NavItemContainer from '.'

it('NavItemContainer: default', () => {
  const component = renderer.create(< NavItemContainer />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
