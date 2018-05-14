import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Course from '.'

storiesOf('Course', module)
  .add('default', () => (
    <Course>Hello</Course>
  ))
  .add('reverse', () => (
    <Course reverse>Hello</Course>
  ))
