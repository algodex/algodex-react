import React from 'react'
import renderer from 'react-test-renderer'
import Assets from '.'

it('Assets: default', () => {
  const component = renderer.create(< Assets />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
