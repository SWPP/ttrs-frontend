import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Notice from '.'

storiesOf('Notice', module)
  .add('default', () => (
    <Notice>Hello</Notice>
  ))
  .add('reverse', () => (
    <Notice reverse>Hello</Notice>
  ))
