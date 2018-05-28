import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { LecturePopup } from 'components'

storiesOf('LecturePopup', module)
  .add('default', () => (
    <LecturePopup>Hello</LecturePopup>
  ))
  .add('reverse', () => (
    <LecturePopup reverse>Hello</LecturePopup>
  ))
