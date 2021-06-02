import React from 'react'
import renderer from 'react-test-renderer'
import TableHeader from '.'

it('TableHeader: default', () => {
  const component = renderer.create(< TableHeader />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
