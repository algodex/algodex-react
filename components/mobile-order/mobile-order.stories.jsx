import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import MobileHistoricOrder from '.'

storiesOf('MobileHistoricOrder', module).add('default', () => <MobileHistoricOrder />)