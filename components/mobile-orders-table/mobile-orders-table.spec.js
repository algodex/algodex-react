import React from 'react'
import renderer from 'react-test-renderer'
import MobileOrdersTable from '.'

it('MobileOrdersTable: default', () => {
  const component = renderer.create(< MobileOrdersTable />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
