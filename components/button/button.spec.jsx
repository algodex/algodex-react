import React from 'react'
import renderer from 'react-test-renderer'
import Button from '.'

it('Button: default', () => {
  const component = renderer.create(<Button />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
