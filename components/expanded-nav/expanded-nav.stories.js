import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import ExtendedNav from '.'

storiesOf('ExtendedNav', module).add('default', () => <ExtendedNav />)
