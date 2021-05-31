import React from 'react'
import NavItem from '.'
import { storiesOf } from '@storybook/react'

storiesOf('NavItem', module).add('default', (args) => <NavItem {...args}>Home</NavItem>)
