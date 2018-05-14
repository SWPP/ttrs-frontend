import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Classroom from '.'

storiesOf('Classroom', module)
  .add('default', () => (
    <Classroom>Hello</Classroom>
  ))
  .add('reverse', () => (
    <Classroom reverse>Hello</Classroom>
  ))
