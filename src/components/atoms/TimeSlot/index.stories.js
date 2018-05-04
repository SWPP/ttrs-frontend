import React from 'react'
import { storiesOf } from '@kadira/storybook'
import TimeSlot from '.'

storiesOf('TimeSlot', module)
  .add('default', () => (
    <TimeSlot>Hello</TimeSlot>
  ))
  .add('reverse', () => (
    <TimeSlot reverse>Hello</TimeSlot>
  ))
