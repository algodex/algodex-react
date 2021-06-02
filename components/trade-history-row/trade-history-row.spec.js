import React from 'react'
import renderer from 'react-test-renderer'
import TradeHistoryRow from '.'

it('TradeHistoryRow: default', () => {
  const component = renderer.create(< TradeHistoryRow />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
