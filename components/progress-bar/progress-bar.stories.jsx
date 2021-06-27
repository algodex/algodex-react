import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import ProgressBar from '.'

storiesOf('ProgressBar', module).add('default', () => <ProgressBar />)