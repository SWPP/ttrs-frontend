import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { SettingsTab } from 'components'

storiesOf('SettingsTab', module)
  .add('default', () => (
    <SettingsTab />
  ))
  .add('reverse', () => (
    <SettingsTab reverse />
  ))
