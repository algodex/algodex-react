import React from 'react'
import renderer from 'react-test-renderer'
import MobileChart from '.'

it('MobileChart: default', () => {
  const component = renderer.create(< MobileChart />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
