import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { LectureList } from 'components'

storiesOf('LectureList', module)
  .add('default', () => (
    <LectureList>Hello</LectureList>
  ))
  .add('reverse', () => (
    <LectureList reverse>Hello</LectureList>
  ))
