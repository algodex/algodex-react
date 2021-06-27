import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import MobileOrderHistory from '.'

storiesOf('MobileOrderHistory', module).add('default', () => <MobileOrderHistory />)