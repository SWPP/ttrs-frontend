import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { TTRenderer } from 'components'

storiesOf('TTRenderer', module)
  .add('default', () => (
    <TTRenderer>Hello</TTRenderer>
  ))
  .add('reverse', () => (
    <TTRenderer reverse>Hello</TTRenderer>
  ))
