import React from 'react'
import renderer from 'react-test-renderer'
import Nav from '.'

it('Nav: default', () => {
  const component = renderer.create(<Nav />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
