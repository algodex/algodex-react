import React from 'react'
import renderer from 'react-test-renderer'
import NavItem from '.'

it('NavItem: default', () => {
  const component = renderer.create(< NavItem />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
