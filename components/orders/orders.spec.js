import React from 'react'
import renderer from 'react-test-renderer'
import Orders from '.'

it('Orders: default', () => {
  const component = renderer.create(< Orders />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
