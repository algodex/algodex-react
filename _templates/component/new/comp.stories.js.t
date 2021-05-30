---
to: components/<%= name %>/<%= name %>.stories.jsx
---
<% const comp = h.inflection.undasherize(name) -%>
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import <%= comp %> from '.'

storiesOf('<%= comp %>', module).add('default', () => <<%= comp %> />)