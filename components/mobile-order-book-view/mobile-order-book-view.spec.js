import React from 'react'
import renderer from 'react-test-renderer'
import MobileOrderBook from '.'

it('MobileOrderBook: default', () => {
  const component = renderer.create(< MobileOrderBook />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
