import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AddMemo } from 'components'

storiesOf('AddMemo', module)
  .add('default', () => (
    <AddMemo>Hello</AddMemo>
  ))
  .add('reverse', () => (
    <AddMemo reverse>Hello</AddMemo>
  ))
