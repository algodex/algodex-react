import React from 'react'
import renderer from 'react-test-renderer'
import MenuButton from '.'

it('MenuButton: default', () => {
  const component = renderer.create(< MenuButton />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
