import React from 'react'
import renderer from 'react-test-renderer'
import MobileTradeContainer from '.'

it('MobileTradeContainer: default', () => {
  const component = renderer.create(< MobileTradeContainer />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
