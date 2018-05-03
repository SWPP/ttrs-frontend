import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { TimeTable } from 'components'

storiesOf('TimeTable', module)
  .add('default', () => (
    <TimeTable>Hello</TimeTable>
  ))
  .add('reverse', () => (
    <TimeTable reverse>Hello</TimeTable>
  ))
