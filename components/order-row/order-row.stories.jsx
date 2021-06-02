import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import OrderRow from '.'

storiesOf('OrderRow', module).add('default', () => <OrderRow />)