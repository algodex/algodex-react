import React from 'react'
import renderer from 'react-test-renderer'
import MobileHistoricOrder from '.'

it('MobileHistoricOrder: default', () => {
  const component = renderer.create(< MobileHistoricOrder />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
