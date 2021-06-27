import React from 'react'
import renderer from 'react-test-renderer'
import MobileAssetsTable from '.'

it('MobileAssetsTable: default', () => {
  const component = renderer.create(< MobileAssetsTable />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
