import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { ReceiveTab } from 'components'

storiesOf('ReceiveTab', module)
  .add('default', () => (
    <ReceiveTab />
  ))
  .add('reverse', () => (
    <ReceiveTab reverse />
  ))
