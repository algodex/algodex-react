import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import MobileAsset from '.'

storiesOf('MobileAsset', module).add('default', () => <MobileAsset />)