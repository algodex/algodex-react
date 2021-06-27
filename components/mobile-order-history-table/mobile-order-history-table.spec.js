import React from 'react'
import renderer from 'react-test-renderer'
import MobileOrderHistoryTable from '.'

it('MobileOrderHistoryTable: default', () => {
  const component = renderer.create(< MobileOrderHistoryTable />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
