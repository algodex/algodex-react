import React from 'react'
import renderer from 'react-test-renderer'
import ExtendedNav from '.'

it('ExtendedNav: default', () => {
  const component = renderer.create(< ExtendedNav />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
