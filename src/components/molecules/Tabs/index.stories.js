import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Tabs } from 'components'

storiesOf('Tabs', module)
  .add('default', () => (
    <Tabs>Hello</Tabs>
  ))
  .add('reverse', () => (
    <Tabs reverse>Hello</Tabs>
  ))
