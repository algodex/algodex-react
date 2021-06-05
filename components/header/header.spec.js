import React from 'react'
import { render, screen } from '../../test/test-utils'
import Header from './index'

it('Header: default', () => {
  const component = renderer.create(<Header />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
